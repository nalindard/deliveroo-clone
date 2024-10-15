import expess from 'express'
import Basketcontroller from '../controllers/basket.controller'
import inputValidator from '../middlewares/input_validator.middleware'
import ValidationSchemas from '../schemas'

const router = expess.Router()
const basketController = new Basketcontroller()

// post one basket,
/**
 * @openapi
 * '/api/basket':
 *  post:
 *      tags:
 *      - Basket
 *      summary: Create new basket
 *      description: Create new basket
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/', inputValidator(ValidationSchemas.newBasketSchema), basketController.createBasket)

// get basket by id,
/**
 * @openapi
 * '/api/basket/:id':
 *  get:
 *      tags:
 *      - Basket
 *      summary: Get basket by id
 *      description: Get basket by id
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id', basketController.getBasketById)

// get filterd basket,
/**
 * @openapi
 * '/api/basket':
 *  get:
 *      tags:
 *      - Basket
 *      summary: Get filterd basket
 *      description: Get filterd basket
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/', basketController.getBaskets)

// add one basket item,
/**
 * @openapi
 * '/api/basket/:id/items':
 *  post:
 *      tags:
 *      - Basket
 *      summary: Add new basket item
 *      description: Add new basket item
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/:id/items', basketController.addBasketItemById)

// remove one basket item,
/**
 * @openapi
 * '/api/basket/:id/items/:itemId':
 *  delete:
 *      tags:
 *      - Basket
 *      summary: Remove basket item
 *      description: Remove basket item
 *      responses:
 *        200:
 *          description: Success
 */
router.delete('/:id/items/:itemId', basketController.removeBasketItem)

// update one basket item,
/**
 * @openapi
 * '/api/basket/:id/items/:itemId':
 *  patch:
 *      tags:
 *      - Basket
 *      summary: Update basket item
 *      description: Update basket item
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/:id/items/:itemId', basketController.updateBasketItem)

// delete one basket
/**
 * @openapi
 * '/api/basket/:id':
 *  delete:
 *      tags:
 *      - Basket
 *      summary: Delete basket
 *      description: Delete basket
 *      responses:
 *        200:
 *          description: Success
 */
router.delete('/:id', basketController.deleteBasketById)

export default router