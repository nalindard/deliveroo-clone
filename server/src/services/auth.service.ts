import bcrypt from 'bcrypt'
import defaultConfig from '../../configs/default.config'
import RefreshToken from '../models/refresh_token.model'
import User, { UserRegisterAttributes } from '../models/user.model'
import { createToken } from '../utils/tokens.util'
import { hashPassword } from '../utils/hash.util'

// async function hashPassword(password: string): Promise<{ passwordHash: string; passwordSalt: string }> {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return { passwordHash: hash, passwordSalt: salt };
// }

// Helper function to create and store tokens
async function createAndStoreTokens(user: {
    id: string
    email: string
    role: 'customer' | 'admin' | 'restaurant'
}) {
    // Create access and refresh tokens
    const refreshToken = createToken( user, defaultConfig.refresh_token_expire_time )
    const accessToken = createToken( user, defaultConfig.access_token_expire_time )

    // Store refresh token with expiration
    await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
    })

    return { refreshToken, accessToken }
}

export default class AuthService {
    async registerUserByPassword({
        email,
        name,
        password,
    }: UserRegisterAttributes) {
        try {
            // Hash the password before storing
            const { passwordHash, passwordSalt } = await hashPassword(password)

            const newUser = await User.create({ email, name, passwordHash, passwordSalt, isOAuthUser: false, role: 'customer', emailVerified: false, })

            const userData = {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            }

            // Create access and refresh tokens
            const refreshToken = createToken(userData, defaultConfig.refresh_token_expire_time);
            const accessToken = createToken(userData, defaultConfig.access_token_expire_time);

            // Store refresh token with expiration
            await RefreshToken.create({
                token: refreshToken,
                userId: newUser.id,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
            });

            // const { refreshToken, accessToken } = await createAndStoreTokens(
            //     userData
            // )

            return { success: true, refreshToken, accessToken }
        } catch (error) {
            // console.error('Error registering user:', error)
            // throw new Error(
            //     (error as any)?.errors[0]?.message || 'Failed to register user'
            // )
            return { success: false, message: 'Failed to register user', error }
        }
    }

    async registerUserByOAuth({oauthProvider,name,email,oauthId,picture,}: {oauthProvider: string,name: string,email: string,oauthId: string,picture: string,}) {
        try {
            // Check user already exists
            const existingUser = await User.findOne({
                where: { oauthProvider, oauthId },
            })

            if (existingUser) {
                const userData = {
                    id: existingUser.id,
                    email: existingUser.email,
                    role: existingUser.role,
                }
                // const refreshToken = createToken(userData, defaultConfig.refresh_token_expire_time);
                // const accessToken = createToken(userData, defaultConfig.access_token_expire_time);

                // Store refresh token with expiration
                // await RefreshToken.create({
                //     token: refreshToken,
                //     userId: existingUser.id,
                //     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
                // });

                const { refreshToken, accessToken } =
                    await createAndStoreTokens(userData)

                return {
                    success: true,
                    user: existingUser,
                    refreshToken,
                    accessToken,
                }
            }

            const newUser = await User.create({
                name: name,
                email: email,
                isOAuthUser: true,
                oauthProvider,
                oauthId,
                role: 'customer',
                emailVerified: true,
            })

            const userData = {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            }

            // Create access and refresh tokens
            // const refreshToken = createToken(userData, defaultConfig.refresh_token_expire_time);
            // const accessToken = createToken(userData, defaultConfig.access_token_expire_time);

            // Store refresh token with expiration
            // await RefreshToken.create({
            //     token: refreshToken,
            //     userId: newUser.id,
            //     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
            // });

            const { refreshToken, accessToken } = await createAndStoreTokens(
                userData
            )

            return { success: true, newUser, refreshToken, accessToken }
        } catch (error) {
            // throw error
            // throw new Error(
            //     (error as any)?.errors[0]?.message || 'Failed to register user'
            // )
            return { success: false, message: 'Failed to register user', error }
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) throw new Error('User not found')

            const isPasswordValid = await bcrypt.compare(password,user.passwordHash ?? '')
            if (!isPasswordValid) throw new Error('Invalid password')

            const sessionCount = await RefreshToken.count({
                where: { userId: user.id },
            })
            if (sessionCount >= defaultConfig.maximum_number_of_sessions)
                throw new Error('Maximum number of sessions reached')

            const userData = { id: user.id, email: user.email, role: user.role }
            const refreshToken = createToken( userData, defaultConfig.refresh_token_expire_time )
            const accessToken = createToken( userData, defaultConfig.access_token_expire_time )

            await RefreshToken.create({
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            })

            return { success: true, user, refreshToken, accessToken }
        } catch (error) {
            // console.error('Error logging in user:', error)
            // throw new Error((error as any).message || 'Failed to login')
            return { success: false, message: 'Failed to login', error }
        }
    }

    async getNewRefreshToken(oldRefreshToken: string) {
        try {
            const token = await RefreshToken.findOne({
                where: { token: oldRefreshToken },
                include: [User],
            })

            if (!token) throw new Error('Refresh token not found')

            // @ts-expect-error the user property exist here allways
            const { id, email, role } = token.User.dataValues

            await token.destroy() // Invalidate old token

            const newRefreshToken = createToken({ id, email, role }, defaultConfig.refresh_token_expire_time)
            const newAccessToken = createToken({ id, email, role }, defaultConfig.access_token_expire_time)

            await RefreshToken.create({
                token: newRefreshToken,
                userId: id,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            })

            return { success: true, newRefreshToken, newAccessToken }
        } catch (error) {
            // console.error('Error refreshing token:', error)
            // throw new Error('Failed to refresh token')
            return { success: false, message: 'Failed to refresh token', error }
        }
    }

    async logoutUser(refreshToken: string) {
        try {
            const token = await RefreshToken.findOne({
                where: { token: refreshToken },
            })
            if (!token) throw new Error('Refresh token not found')

            await token.destroy()
            return { success: true, message: 'Logged out successfully' }
        } catch (error) {
            // console.error('Error logging out user:', error)
            // throw new Error('Failed to logout')
            return { success: false, message: 'Failed to logout', error }
        }
    }

    async deleteUser(id: string) {
        try {
            const deletedUser = await User.destroy({ where: { id } })
            if (!deletedUser) throw new Error('User not found')
            return { success: true, message: 'User deleted successfully' }
        } catch (error) {
            // console.error('Error deleting user:', error)
            // throw new Error('Failed to delete user')
            return { success: false, message: 'Failed to delete user', error }
        }
    }

    async getUser(id: string) {
        try {
            const user = await User.findByPk(id)
            if (!user) throw new Error('User not found')
            const _user = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
            return { success: true, user: _user }
        } catch (error) {
            // console.error('Error getting user:', error)
            // throw new Error('Failed to get user')
            return { success: false, message: 'Failed to get user', error }
        }
    }
}

// export default {
//     loginUser,
//     registerUserByPassword,
//     registerUserByOAuth,
//     getNewRefreshToken,
//     logoutUser,
//     deleteUser,
//     getUser,
// };

// export default new AuthService()
