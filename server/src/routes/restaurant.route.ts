import expess from 'express'
import RestaurantController from '../controllers/restaurant.controller'
import MenuController from '../controllers/menu.controller'
import CategoryController from '../controllers/category.controller'
import RestaurantReviewController from '../controllers/restaurant_review.controller'
import inputValidator from '../middlewares/input_validator.middleware'
import ValidationSchemas from '../schemas'

const router = expess.Router()
const menuController = new MenuController()
const restaurantController = new RestaurantController()
const categoryController = new CategoryController()
const restaurantReviewController = new RestaurantReviewController()

// get all restaurants
/**
 * @openapi
 * '/api/restaurants':
 *  get:
 *      tags:
 *      - Restaurants
 *      summary: Get all restaurants
 *      description: Get all restaurants
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/', restaurantController.getAllRestaurants)

// get one restaurants
/**
 * @openapi
 * '/api/restaurants/:id':
 *  get:
 *      tags:
 *      - Restaurants
 *      summary: Get one restaurant
 *      description: Get one restaurant
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id', restaurantController.getOneRestaurant)

// post one restaurants
/**
 * @openapi
 * '/api/restaurants':
 *  post:
 *      tags:
 *      - Restaurants
 *      summary: Create new restaurant
 *      description: Create new restaurant
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/', inputValidator(ValidationSchemas.NewRestaurantSchema), restaurantController.addOneRestaurant)

// patch one restaurants
/**
 * @openapi
 * '/api/restaurants/:id':
 *  patch:
 *      tags:
 *      - Restaurants
 *      summary: Update restaurant
 *      description: Update restaurant
 *      responses:
 *        200:
 *          description: Success
 */
router.patch('/:id', inputValidator(ValidationSchemas.UpdateRestaurantSchema), restaurantController.updateOneRestaurant)

// delete one restaurants
/**
 * @openapi
 * '/api/restaurants/:id':
 *  delete:
 *      tags:
 *      - Restaurants
 *      summary: Delete restaurant
 *      description: Delete restaurant
 *      responses:
 *        204:
 *          description: Success
 */
router.delete('/:id', restaurantController.deleteOneRestaurant)

// ------------------------------------------------------------

// get all restaurants menu,
/**
 * @openapi
 * '/api/restaurants/:id/menu':
 *  get:
 *      tags:
 *      - Menus
 *      summary: Get all menus
 *      description: Get all menus
 *      responses:
 *        200:
 *          description: Success
 *        404:
 *          description: Not found
 */
router.get('/:id/menu', menuController.getAllMenusById)

// get one restaurants menu,
// router.get('/:id/menu/:menuId', MenuController.getMenuById)

// add one restaurants menu,
/**
 * @openapi
 * '/api/restaurants/:id/menu':
 *  post:
 *      tags:
 *      - Menus
 *      summary: Add new menu
 *      description: Add new menu
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/:id/menu', inputValidator(ValidationSchemas.NewDishSchema), menuController.addMenu)

// ------------------------------------------------------------

// add new category
/**
 * @openapi
 * '/api/restaurants/:id/category':
 *  post:
 *      tags:
 *      - Categories
 *      summary: Add new category
 *      description: Add new category
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/:id/category', inputValidator(ValidationSchemas.NewCategorySchema),  categoryController.addNewCategory)

// get all categories
// router.get("/category", CategoryController.getAllCategories)

// get all categories for restaurant
/**
 * @openapi
 * '/api/restaurants/:id/category':
 *  get:
 *      tags:
 *      - Categories
 *      summary: Get all categories
 *      description: Get all categories
 *      responses:
 *        200:
 *          description: Success
 */
router.get('/:id/category', categoryController.getAllCategoriesByRestaurant)

// ------------------------------------------------------------

// post a new review
/**
 * @openapi
 * '/api/restaurants/:id/review':
 *  post:
 *      tags:
 *      - Menu Reviews
 *      summary: Add new review
 *      description: Add new review
 *      responses:
 *        200:
 *          description: Success
 */
router.post("/:id/review", inputValidator(ValidationSchemas.NewRestaurentReviewSchema),  restaurantReviewController.addNewReview)

// delete a review
/**
 * @openapi
 * '/api/restaurants/:id/review/:reviewId':
 *  delete:
 *      tags:
 *      - Menu Reviews
 *      summary: Delete review
 *      description: Delete review
 *      responses:
 *        204:
 *          description: Success
 */
router.delete("/:id/review/:reviewId", restaurantReviewController.deleteReview)

// get average rating
/**
 * @openapi
 * '/api/restaurants/:id/review/average':
 *  get:
 *      tags:
 *      - Menu Reviews
 *      summary: Get average rating
 *      description: Get average rating
 *      responses:
 *        200:
 *          description: Success
 */
router.get("/:id/review/average", restaurantReviewController.getAverageRating)

// get all reviews for restaurant
/**
 * @openapi
 * '/api/restaurants/:id/review':
 *  get:
 *      tags:
 *      - Menu Reviews
 *      summary: Get all reviews
 *      description: Get all reviews
 *      responses:
 *        200:
 *          description: Success
 */
router.get("/:id/review", restaurantReviewController.getAllReviewsForRestaurant)

export default router
