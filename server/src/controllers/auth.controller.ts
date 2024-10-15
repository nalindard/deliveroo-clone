import { Request, Response, NextFunction } from 'express'
import type { CustomRequest } from '../../types/custom.d'
import AuthService from '../services/auth.service'
import {
    varifyGoogleTokenAndGetDataByAccessToken,
} from '../utils/oauth_validate.util'

const authService = new AuthService()

export default class AuthController {
    async registerUserByPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, email, password } = req.body
            const result = await authService.registerUserByPassword({
                email,
                name,
                password,
            })
            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async registerUserByOAuth(req: Request, res: Response, next: NextFunction) {
        const providers = {
            google: 'google',
            facebook: 'facebook',
            github: 'github',
        }

        try {
            const { oauthProvider } = req.params
            if (!providers[oauthProvider as keyof typeof providers]) {
                return res
                    .status(400)
                    .json({ message: 'Invalid oauth provider' })
            }
            const { access_token } = req.body

            switch (oauthProvider) {
                case providers.google:
                    // const {googleId, name, email, picture,} = await  varifyGoogleTokenAndGetData(access_token)
                    const { googleId, name, email, picture } =
                        await varifyGoogleTokenAndGetDataByAccessToken(
                            access_token
                        )

                    console.log(
                        '🔵 googleId--->',
                        googleId,
                        name,
                        email,
                        picture
                    )

                    // oauthProvider: string, name: string, email: string, oauthId: string, picture: string
                    const result = await authService.registerUserByOAuth({
                        oauthProvider,
                        name,
                        email,
                        oauthId: googleId,
                        picture,
                    })
                    if (!result.success) {
                        return res.status(400).json({ message: result.message })
                    }
                    return res.status(201).json(result)
                    break
                default:
                    throw new Error('Unsupported oauth provider')
                    break
            }

            // const result = await AuthService.registerUserByOAuth(token, providers[oauthProvider as keyof typeof providers]);
            // const result = await AuthService.registerUserByOAuth(token, providers[oauthProvider as keyof typeof providers]);
            // return res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const result = await authService.loginUser(email, password)
            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.body
            // console.log('Made to refresh token: token--->', token)

            const result = await authService.getNewRefreshToken(token)
            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.body
            const result = await authService.logoutUser(token)
            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }
            return res.status(204).json(result)
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body
            const result = await authService.deleteUser(id)
            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }
            return res.status(204).json(result)
        } catch (error) {
            next(error)
        }
    }

    async demoProtected(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            // req.user
            // console.log('Made to the protected route:', req?.user)

            res.status(200).json('You can access this route')
        } catch (error) {
            next(error)
        }
    }

    async getUser(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            // req.user
            if (req?.user?.id) {
                // console.log('Made to the getUser route:', req?.user)
                const user = await authService.getUser(req?.user?.id)

                res.status(200).json(user)
            } else {
                // Handle the case where req.user.id is undefined
                res.status(401).json({ message: 'User not found' })
            }
        } catch (error) {
            next(error)
        }
    }
}

// export default {
//     registerUserByPassword,
//     registerUserByOAuth,
//     loginUser,
//     getRefreshToken,
//     logoutUser,
//     deleteUser,
//     demoProtected,
//     getUser,
// };

// export default new AuthController()
