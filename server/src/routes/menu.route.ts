import expess from 'express'
import MenuController from '../controllers/menu.controller'
import MenuReviewController from '../controllers/menu_review.controller'

const router = expess.Router()
const menuController = new MenuController()
const menuReviewController = new MenuReviewController()

// get all menus
/**
 * @openapi
 * '/api/menus':
 *  get:
 *      tags:
 *      - Menus
 *      summary: Get all menus
 *      description: Get all menus
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/', menuController.getAllMenus)

// get one menu
/**
 * @openapi
 * '/api/menus/:id':
 *  get:
 *      tags:
 *      - Menus
 *      summary: Get one menu
 *      description: Get one menu
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id', menuController.getMenuById)

// update one menu,
/**
 * @openapi
 * '/api/menus/:id':
 *  patch:
 *      tags:
 *      - Menus
 *      summary: Update menu
 *      description: Update menu
 *      responses:
 *        200:
 *          description: Success
 */
router.patch('/:id', menuController.updateMenuById)

// delete one menu
/**
 * @openapi
 * '/api/menus/:id':
 *  delete:
 *      tags:
 *      - Menus
 *      summary: Delete menu
 *      description: Delete menu
 *      responses:
 *        204:
 *          description: Success
 */
router.delete('/:id', menuController.deleteMenuById)

// ------------------------------------------------------------

// post a new review
/**
 * @openapi
 * '/api/menus/:id/review':
 *  post:
 *      tags:
 *      - Menu Reviews
 *      summary: Add new review
 *      description: Add new review
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/:id/review', menuReviewController.addNewReview)

// delete a review
/**
 * @openapi
 * '/api/menus/:id/review/:reviewId':
 *  delete:
 *      tags:
 *      - Menu Reviews
 *      summary: Delete review
 *      description: Delete review
 *      responses:
 *        204:
 *          description: Success
 */
router.delete('/:id/review/:reviewId', menuReviewController.deleteReview)

// get average rating
/**
 * @openapi
 * '/api/menus/:id/review/average':
 *  get:
 *      tags:
 *      - Menu Reviews
 *      summary: Get average rating
 *      description: Get average rating
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id/review/average', menuReviewController.getAverageRating)

// get all reviews for menu
/**
 * @openapi
 * '/api/menus/:id/review':
 *  get:
 *      tags:
 *      - Menu Reviews
 *      summary: Get all reviews
 *      description: Get all reviews
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id/review', menuReviewController.getAllReviewsForDish)

export default router
