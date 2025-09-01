import bcrypt from 'bcrypt'
import defaultConfig from '../../configs/default.config'
import RefreshToken from '../models/refresh_token.model'
import User, { UserRegisterAttributes } from '../models/user.model'
import { createToken } from '../utils/tokens.util'
import { hashPassword } from '../utils/hash.util'
import { ServiceResponse } from '../types/service.types'

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
    }: UserRegisterAttributes): Promise<ServiceResponse<{ refreshToken: string; accessToken: string }>> {
        try {
            const { passwordHash, passwordSalt } = await hashPassword(password)

            const newUser = await User.create({ 
                email, 
                name, 
                passwordHash, 
                passwordSalt, 
                isOAuthUser: false, 
                role: 'customer', 
                emailVerified: false 
            })

            const userData = {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            }

            const { refreshToken, accessToken } = await createAndStoreTokens(userData)

            return { 
                success: true, 
                data: { refreshToken, accessToken } 
            }
        } catch (error) {
            return { 
                success: false, 
                message: 'Failed to register user', 
                error 
            }
        }
    }

    async registerUserByOAuth({
        oauthProvider,
        name,
        email,
        oauthId,
        picture,
    }: {
        oauthProvider: string
        name: string
        email: string
        oauthId: string
        picture: string
    }): Promise<ServiceResponse<{ user?: any; newUser?: any; refreshToken: string; accessToken: string }>> {
        try {
            const existingUser = await User.findOne({
                where: { oauthProvider, oauthId },
            })

            if (existingUser) {
                const userData = {
                    id: existingUser.id,
                    email: existingUser.email,
                    role: existingUser.role,
                }

                const { refreshToken, accessToken } = await createAndStoreTokens(userData)

                return {
                    success: true,
                    data: {
                        user: existingUser,
                        refreshToken,
                        accessToken,
                    }
                }
            }

            const newUser = await User.create({
                name,
                email,
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

            const { refreshToken, accessToken } = await createAndStoreTokens(userData)

            return { 
                success: true, 
                data: { newUser, refreshToken, accessToken } 
            }
        } catch (error) {
            return { 
                success: false, 
                message: 'Failed to register user', 
                error 
            }
        }
    }

    async loginUser(email: string, password: string): Promise<ServiceResponse<{ user: any; refreshToken: string; accessToken: string }>> {
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return { success: false, message: 'User not found' }
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash ?? '')
            if (!isPasswordValid) {
                return { success: false, message: 'Invalid password' }
            }

            const sessionCount = await RefreshToken.count({
                where: { userId: user.id },
            })
            if (sessionCount >= defaultConfig.maximum_number_of_sessions) {
                return { success: false, message: 'Maximum number of sessions reached' }
            }

            const userData = { id: user.id, email: user.email, role: user.role }
            const refreshToken = createToken(userData, defaultConfig.refresh_token_expire_time)
            const accessToken = createToken(userData, defaultConfig.access_token_expire_time)

            await RefreshToken.create({
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            })

            return { 
                success: true, 
                data: { user, refreshToken, accessToken } 
            }
        } catch (error) {
            return { 
                success: false, 
                message: 'Failed to login', 
                error 
            }
        }
    }

    async getNewRefreshToken(oldRefreshToken: string): Promise<ServiceResponse<{ newRefreshToken: string; newAccessToken: string }>> {
        try {
            const token = await RefreshToken.findOne({
                where: { token: oldRefreshToken },
                include: [User],
            })

            if (!token) {
                return { success: false, message: 'Refresh token not found' }
            }

            const user = token.User as any
            const { id, email, role } = user.dataValues

            await token.destroy()

            const newRefreshToken = createToken({ id, email, role }, defaultConfig.refresh_token_expire_time)
            const newAccessToken = createToken({ id, email, role }, defaultConfig.access_token_expire_time)

            await RefreshToken.create({
                token: newRefreshToken,
                userId: id,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            })

            return { 
                success: true, 
                data: { newRefreshToken, newAccessToken } 
            }
        } catch (error) {
            return { 
                success: false, 
                message: 'Failed to refresh token', 
                error 
            }
        }
    }

    async logoutUser(refreshToken: string): Promise<ServiceResponse> {
        try {
            const token = await RefreshToken.findOne({
                where: { token: refreshToken },
            })
            
            if (!token) {
                return { success: false, message: 'Refresh token not found' }
            }

            await token.destroy()
            return { success: true, message: 'Logged out successfully' }
        } catch (error) {
            return { success: false, message: 'Failed to logout', error }
        }
    }

    async deleteUser(id: string): Promise<ServiceResponse> {
        try {
            const deletedUser = await User.destroy({ where: { id } })
            if (!deletedUser) {
                return { success: false, message: 'User not found' }
            }
            return { success: true, message: 'User deleted successfully' }
        } catch (error) {
            return { success: false, message: 'Failed to delete user', error }
        }
    }

    async getUser(id: string): Promise<ServiceResponse<{ user: any }>> {
        try {
            const user = await User.findByPk(id)
            if (!user) {
                return { success: false, message: 'User not found' }
            }
            
            const userData = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
            
            return { success: true, data: { user: userData } }
        } catch (error) {
            return { success: false, message: 'Failed to get user', error }
        }
    }
}
