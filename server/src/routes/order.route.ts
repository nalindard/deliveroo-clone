import expess from 'express'
import OrderController from '../controllers/order.controller'
import inputValidator from '../middlewares/input_validator.middleware'
import ValidationSchemas from '../schemas'
import authenticateToken from '../middlewares/token_verify.middleware'

const router = expess.Router()
const orderController = new OrderController()

// post one orders,
/**
 * @openapi
 * '/api/orders':
 *  post:
 *      tags:
 *      - Orders
 *      summary: Create new order
 *      description: Create new order
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/', inputValidator(ValidationSchemas.NewOrderSchema), authenticateToken, orderController.addOrder)

// get one order by id,
/**
 * @openapi
 * '/api/orders/:id':
 *  get:
 *      tags:
 *      - Orders
 *      summary: Get one order
 *      description: Get one order
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id', orderController.getOrderById)

// get filterd orders,
/**
 * @openapi
 * '/api/orders':
 *  get:
 *      tags:
 *      - Orders
 *      summary: Get all orders
 *      description: Get all orders
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/', orderController.getOrders)

// update one order,
/**
 * @openapi
 * '/api/orders/:id':
 *  patch:
 *      tags:
 *      - Orders
 *      summary: Update order
 *      description: Update order
 *      responses:
 *        200:
 *          description: Success
 */
router.patch('/:id', inputValidator(ValidationSchemas.UpdateOrderSchema), orderController.updateOrderById)

// delete one order
/**
 * @openapi
 * '/api/orders/:id':
 *  delete:
 *      tags:
 *      - Orders
 *      summary: Delete order
 *      description: Delete order
 *      responses:
 *        204:
 *          description: Success
 */
router.delete('/:id', orderController.deleteOrderById)

export default router
