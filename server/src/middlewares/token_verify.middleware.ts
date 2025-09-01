import { CustomRequest, TokenUser } from './../../types/custom.d'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'
import defaultConfig from '../../configs/default.config'

export default function authenticateToken(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) {


    const authHeader = req.headers.authorization ?? null
    const token = authHeader && authHeader.split(' ')[1]


    if (token === null) return res.sendStatus(401)

    jwt.verify(token, defaultConfig.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('err--->', err.message);

            return res.sendStatus(403)
        }
        else req.user = user as TokenUser
        next()
    })
}
