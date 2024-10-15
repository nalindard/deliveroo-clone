import expess from 'express'
import ProductController from '../../controllers/delete/product.controller'

const router = expess.Router()

/**
 * @openapi
 * '/api/products':
 *  get:
 *      tags:
 *      - Products
 *      description: Get all products
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.post('', ProductController.addProduct)
router.patch('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

export default router
