import DishReview from '../models/dish_review.model'
import sequelize from '../../configs/sequelize.config'
import { ServiceResponse } from '../types/service.types'

export default class MenuReviewService {
    async addNewReview(reviewData: {
        userId: string
        dishId: string
        rating: number
        comment: string
    }): Promise<ServiceResponse<any>> {
        try {
            const newReview = await DishReview.create(reviewData)
            return { success: true, data: newReview }
        } catch (error) {
            return { success: false, message: 'Error adding review', error }
        }
    }

    async deleteReview(dishId: string, reviewId: string): Promise<ServiceResponse> {
        try {
            const review = await DishReview.findOne({
                where: { id: reviewId, dishId },
            })
            
            if (!review) {
                return { success: false, message: 'Review not found' }
            }
            
            await review.destroy()
            return { success: true, message: 'Review deleted successfully' }
        } catch (error) {
            return { success: false, message: 'Error deleting review', error }
        }
    }

    async getAverageRating(dishId: string): Promise<ServiceResponse<{ averageRating: number }>> {
        try {
            const reviews = await DishReview.findAll({
                where: { dishId },
                attributes: [
                    [
                        sequelize.fn('AVG', sequelize.col('rating')),
                        'averageRating',
                    ],
                ],
            })

            const averageRating = reviews[0]?.get('averageRating') || 0
            return { success: true, data: { averageRating } }
        } catch (error) {
            return {
                success: false,
                message: 'Error fetching average rating',
                error,
            }
        }
    }

    async getAllReviewsForDish(dishId: string): Promise<ServiceResponse<any[]>> {
        try {
            const reviews = await DishReview.findAll({ where: { dishId } })
            return { success: true, data: reviews }
        } catch (error) {
            return { success: false, message: 'Error fetching reviews', error }
        }
    }
}
