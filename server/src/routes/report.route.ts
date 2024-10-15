import expess from 'express'
import ReportController from '../controllers/report.controller'

const router = expess.Router()
const reportController = new ReportController()

// sales,
// total sales for a given time period (e.g., daily, weekly, monthly).
/**
 * @openapi
 * '/api/report/sales':
 *  get:
 *      tags:
 *      - Report
 *      summary: Get total sales
 *      description: Get total sales
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/sales', reportController.getSales)

// top-selling
// top-selling menu items based on the number of orders or total revenue.
/**
 * @openapi
 * '/api/report/top-seles':
 *  get:
 *      tags:
 *      - Report
 *      summary: Get top selling
 *      description: Get top selling
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/top-seles', reportController.getTopItems)

// avg-order-value
// average order value for a given time period.
/**
 * @openapi
 * '/api/report/avg-order-value':
 *  get:
 *      tags:
 *      - Report
 *      summary: Get average order value
 *      description: Get average order value
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/avg-order-value', reportController.getAvgOrderValue)

export default router

// filtering orders based on status,sorting orders by priority, or retrieving orders within a specific date range.
// (More suitable for orders route, Handled their own in order.route.ts)