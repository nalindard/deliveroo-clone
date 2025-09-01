import { NextFunction } from 'express'
import { Express, Request, Response, ErrorRequestHandler } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { version } from '../../package.json'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Docs',
            version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/**/*.ts', './src/schema/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)

export function swaggerDocsJson(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(swaggerSpec)

}
