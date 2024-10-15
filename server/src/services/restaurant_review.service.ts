import RestaurentReview from '../models/restaurent_review.model'
import sequelize from '../../configs/sequelize.config'

export default class RestaurantReviewService {
    async addNewReview(reviewData: {
        userId: string
        restaurantId: string
        rating: number
        comment: string
    }) {
        try {
            const newReview = await RestaurentReview.create(reviewData)
            return { success: true, data: newReview }
        } catch (error) {
            return { success: false, message: 'Error adding review', error }
        }
    }

    async deleteReview(restaurantId: string, reviewId: string) {
        try {
            // const review = await RestaurentReview.findByPk(reviewId);
            const review = await RestaurentReview.findOne({
                where: { id: reviewId, restaurantId },
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

    async getAverageRating(restaurantId: string) {
        try {
            const reviews = await RestaurentReview.findAll({
                where: { restaurantId },
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

    async getAllReviewsForRestaurant(restaurantId: string) {
        try {
            const reviews = await RestaurentReview.findAll({
                where: { restaurantId },
            })
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
//     getAllReviewsForRestaurant,
// };

// export default new RestaurantReviewService()
