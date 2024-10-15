import DishReview from '../models/dish_review.model'
import sequelize from '../../configs/sequelize.config'

export default class MenuReviewService {
    async addNewReview(reviewData: {
        userId: string
        dishId: string
        rating: number
        comment: string
    }) {
        try {
            const newReview = await DishReview.create(reviewData)
            return { success: true, data: newReview }
        } catch (error) {
            return { success: false, message: 'Error adding review', error }
        }
    }

    async deleteReview(dishId: string, reviewId: string) {
        try {
            // const review = await DishReview.findByPk(reviewId);
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

    async getAverageRating(dishId: string) {
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
            return { success: true, averageRating }
        } catch (error) {
            return {
                success: false,
                message: 'Error fetching average rating',
                error,
            }
        }
    }

    async getAllReviewsForDish(dishId: string) {
        try {
            const reviews = await DishReview.findAll({ where: { dishId } })
            return { success: true, data: reviews }
        } catch (error) {
            return { success: false, message: 'Error fetching reviews', error }
        }
    }
}

// export default {
//     addNewReview,
//     deleteReview,
//     getAverageRating,
//     getAllReviewsForDish,
// }

// export default new MenuReviewService()
