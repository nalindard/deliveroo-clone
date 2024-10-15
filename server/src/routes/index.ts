import { Express, Request, Response } from 'express'
import ProductRouter from './delete/product.route'
import AuthRouter from './auth.route'
import OrderRouter from './order.route'
import BasketRouter from './basket.route'
import ReportRouter from './report.route'
import RestaurantRouter from './restaurant.route'
import MenuRouter from './menu.route'
import { swaggerDocsJson, swaggerSpec } from '../utils/swagger.util'
import swaggerUi from 'swagger-ui-express'

export default function router(app: Express) {
    // Health check,
    /**
     * @openapi
     * /health-check:
     *   get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get('/health-check', (req, res) => res.status(200).send('OK'))

    // Routes,
    app.use('/api/products', ProductRouter)
    app.use('/api/auth', AuthRouter)
    app.use('/api/orders', OrderRouter)
    app.use('/api/basket', BasketRouter)
    app.use('/api/reports', ReportRouter)
    app.use('/api/restaurants', RestaurantRouter)
    app.use('/api/menus', MenuRouter)

    // Documentation,
    /**
     * @openapi
     * /docs:
     *   get:
     *      tags:
     *      - Documentation
     *      description: Get API documentation
     *      responses:
     *        200:
     *          description: Get API documentation
     *          content:
     *            text/html:
     *              schema:
     *                type: string
     *                example: "<html><body><p>Hello, world!</p></body></html>"
     *
     */
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // app.get('/docs.json', (req, res) => {
    //     res.setHeader('Content-Type', 'application/json')
    //     res.status(200).send(swaggerSpec)
    // })

    /**
     * @openapi
     * /docs.json:
     *   get:
     *      tags:
     *      - Documentation
     *      description: Get API documentation in JSON format
     *      responses:
     *        200:
     *          description: Get API documentation in JSON format
     */
    app.get('/docs.json', swaggerDocsJson)

    // Unhandled routes,
    app.use('*', (req: Request, res: Response) => {
        res.status(404).send('Not Found')
    })
}
