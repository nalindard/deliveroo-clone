import sequelize from '../../configs/sequelize.config'
import Category from '../models/category.model'
import Dish from '../models/dish.model'
import Restaurant, { RestaurantCreationAttributes } from '../models/restaurant.model'
import RestaurentReview from '../models/restaurent_review.model'
import { ServiceResponse, PaginationOptions } from '../types/service.types'

export default class RestaurantService {
    async getAllRestaurants({
        limit,
        offset,
        orderBy = 'createdAt',
        sortInvert = false,
    }: PaginationOptions): Promise<ServiceResponse<any[]>> {
        try {
            const restaurants = await Restaurant.findAll({
                limit,
                offset,
                order: [[orderBy, sortInvert ? 'DESC' : 'ASC']],
            })
            
            return { success: true, data: restaurants }
        } catch (error) {
            return {
                success: false,
                message: 'Error fetching restaurants',
                error,
            }
        }
    }

    async getRestaurantById(restaurantId: string): Promise<ServiceResponse<any>> {
        try {
            const avgRating = await RestaurentReview.findOne({
                attributes: [
                    [
                        sequelize.fn('AVG', sequelize.col('rating')),
                        'averageRating',
                    ],
                ],
                where: { restaurantId },
                raw: true,
            })

            const restaurant = await Restaurant.findOne({
                where: { id: restaurantId },
                // filter timestamps
                include: [
                    {
                        model: Category,
                        include: [
                            {
                                model: Dish,
                                attributes: {
                                    exclude: [
                                        'restaurantId',
                                        'DishCategories',
                                        'createdAt',
                                        'updatedAt',
                                    ],
                                },
                                                through: { attributes: [] },
                            },
                        ],
                        attributes: ['name'],
                    },
                ],
                attributes: {
                    exclude: ['locationCordinates', 'createdAt', 'updatedAt'],
                    include: [
                        [
                            sequelize.literal(`(${(avgRating as any)?.averageRating})`),
                            'averageRating',
                        ],
                    ],
                },
            })
            const reviews = await RestaurentReview.findAll({
                where: { restaurantId },
                attributes: [
                    [
                        sequelize.fn('AVG', sequelize.col('rating')),
                        'averageRating',
                    ],
                    [
                        sequelize.fn('COUNT', sequelize.col('id')),
                        'totalReviews',
                    ],
                ],
            })

            const averageRating = reviews[0]?.get('averageRating') || 0
            const totalReviews = reviews[0]?.get('totalReviews') || 0

            if (!restaurant) {
                return { success: false, message: 'Restaurant not found' }
            }

            return {
                success: true,
                data: {
                    ...restaurant.toJSON(),
                    RestaurentReviews: { averageRating, totalReviews },
                },
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error fetching restaurant',
                error,
            }
        }
    }

    async addRestaurant(restaurantData: RestaurantCreationAttributes): Promise<ServiceResponse<any>> {
        try {
            const newRestaurant = await Restaurant.create(restaurantData)
            return { success: true, data: newRestaurant }
        } catch (error) {
            return { success: false, message: 'Error adding restaurant', error }
        }
    }

    async updateRestaurantById(
        restaurantId: string,
        updateData: RestaurantCreationAttributes
    ): Promise<ServiceResponse> {
        try {
            const [affectedRows] = await Restaurant.update(updateData, {
                where: { id: restaurantId },
            })
            
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'Restaurant not found or no changes',
                }
            }
            
            return { success: true, message: 'Restaurant updated successfully' }
        } catch (error) {
            return {
                success: false,
                message: 'Error updating restaurant',
                error,
            }
        }
    }

    async deleteRestaurantById(restaurantId: string): Promise<ServiceResponse> {
        try {
            const deletedRows = await Restaurant.destroy({
                where: { id: restaurantId },
            })
            
            if (deletedRows === 0) {
                return { success: false, message: 'Restaurant not found' }
            }
            
            return { success: true, message: 'Restaurant deleted successfully' }
        } catch (error) {
            return {
                success: false,
                message: 'Error deleting restaurant',
                error,
            }
        }
    }
}
