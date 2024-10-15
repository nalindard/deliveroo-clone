import defaultConfig from '../../configs/default.config'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

export function createToken(
    userData: {
        id: string
        email: string
        role: 'customer' | 'admin' | 'restaurant'
    },
    expiresIn: string
) {
    const data = { ...userData, _rid: crypto.randomBytes(16).toString('hex') }
    return jwt.sign(data, defaultConfig.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: expiresIn,
    })
}
