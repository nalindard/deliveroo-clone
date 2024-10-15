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

// function swaggerDocs(app: Express, port: number) {
//     // Swagger page,
//     app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//     // Swagger JSON,
//     app.get('/docs.json', (req, res) => {
//         res.setHeader('Content-Type', 'application/json')
//         res.status(200).send(swaggerSpec)
//     })
// }

// export default swaggerDocs

export function swaggerDocsJson(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(swaggerSpec)

    // next()
}
