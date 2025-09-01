import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

export default async function errors(
    err: ErrorRequestHandler | any,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    console.log('🔴 ---------------------------------------------------------')
    console.error('Error from middleware parameters:', err)
    console.log('🔴 ---------------------------------------------------------')
    if (err) res.json(String(err)).status(500)
    else res.json("Something went wrong, It's not you, it's us").status(500)
    next()
}
