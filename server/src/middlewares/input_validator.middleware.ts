import Ajv, { JSONSchemaType } from 'ajv'
import { NextFunction, Request, Response } from 'express'


export default function inputValidator<T>(schem: JSONSchemaType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ allErrors: true })

        const validate = ajv.compile(schem)
        const valid = validate(req.body)

        if (valid) {
            next()
        } else {
            console.error(validate.errors)
            res.status(400).json(validate.errors?.[0].message)
        }
    }
}
