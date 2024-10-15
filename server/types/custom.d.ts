import { Express, Request } from 'express'

declare global {
    namespace Express {
        interface Request {
            error?: string | null // Add a custom error property (optional type)
            user?: TokenUser
        }
    }
}
export interface CustomRequest extends Request {
    user?: TokenUser
}

export type TokenUser = {
    id: string
    email: string
    role: 'customer' | 'admin' | 'restaurant'
    _rid: string
    iat: number
    exp: number
}

export type OrderStatus =
    | 'pending'
    | 'preparing'
    | 'out-for-delivery'
    | 'delivered'
    | 'canceled'
    | 'rejected'
