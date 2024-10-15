import express from 'express'
import AuthController from '../controllers/auth.controller'
import authenticateToken from '../middlewares/token_verify.middleware'
import ValidationSchemas from '../schemas'
import inputValidator from '../middlewares/input_validator.middleware'

const router = express.Router()
const authController = new AuthController()

// register password,
/**
 * @openapi
 * '/api/auth':
 *  post:
 *      tags:
 *      - Auth
 *      summary: Register user by email and password
 *      description: Register user by email and password
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        name:
 *                            type: string
 *                            minLength: 3
 *                            maxLength: 128
 *                        email:
 *                            type: string
 *                            minLength: 3
 *                            maxLength: 128
 *                        password:
 *                            type: string
 *                            minLength: 3
 *                            maxLength: 128
 *                    required:
 *                        - name
 *                        - email
 *                        - password
 *      responses:
 *          '201':
 *              description: User registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                          example: 'a1b2c3d4-e5f6-7890-gh12-ijklmnop3456'
 *                                      name:
 *                                          type: string
 *                                          example: 'John Doe'
 *                                      email:
 *                                          type: string
 *                                          example: 'john.doe@example.com'
 *          '400':
 *              description: Bad request - Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: false
 *                              error:
 *                                  type: string
 *                                  example: 'Invalid input data'
 */

router.post('/', inputValidator(ValidationSchemas.NewUserShema), authController.registerUserByPassword)

// register oauth,
/**
 * @openapi
 * '/api/auth/oauth':
 *  post:
 *      tags:
 *      - Auth
 *      summary: Register user by oauth
 *      description: Register user by oauth (Google)
 *      responses:
 *        200:
 *          description: Success
 */
router.post('/oauth/:oauthProvider', inputValidator(ValidationSchemas.NewOAuthUserSchema), authController.registerUserByOAuth)

// login,
/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *      tags:
 *      - Auth
 *      summary: Login user by email and password
 *      description: Login user by email and password
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        email:
 *                            type: string
 *                            minLength: 3
 *                            maxLength: 128
 *                        password:
 *                            type: string
 *                            minLength: 3
 *                            maxLength: 128
 *                    required:
 *                        - email
 *                        - password
 *      responses:
 *          '200':
 *              description: User logged in successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 * 
 */
router.post('/login', authController.loginUser)

// refresh,
/**
 * @openapi
 * '/api/auth/refresh':
 *  post:
 *      tags:
 *      - Auth
 *      summary: Refresh token
 */
router.post('/token', authController.getRefreshToken)

// logout,
/**
 * @openapi
 * '/api/auth/logout':
 *  delete:
 *      tags:
 *      - Auth
 *      summary: Logout user
 */
router.delete('/logout', authController.logoutUser)

// delete user
/**
 * @openapi
 * '/api/auth':
 *  delete:
 *      tags:
 *      - Auth
 *      summary: Delete user
 */
router.delete('/', authController.deleteUser)

// check protected route
/**
 * @openapi
 * '/api/auth/protected':
 *  get:
 *      tags:
 *      - Auth
 *      summary: For testing Protected route Middleware
 */
router.get('/protected', authenticateToken, authController.demoProtected)

// get user
/**
 * @openapi
 * '/api/user':
 *  get:
 *      tags:
 *      - Auth
 *      summary: Get user registration info
 */
router.get('/', authenticateToken, authController.getUser)

export default router
