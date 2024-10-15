import { Request, Response, NextFunction } from 'express'
import RestaurantReviewService from '../services/restaurant_review.service'

const restaurantReviewService = new RestaurantReviewService()

export default class RestaurantReviewController {
    async addNewReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: restaurantId } = req.params
            const reviewData = {
                userId: req.body.userId,
                // restaurantId: req.body.restaurantId,
                restaurantId,
                rating: req.body.rating,
                comment: req.body.comment,
            }

            const { success, data, message } =
                await restaurantReviewService.addNewReview(reviewData)
            if (!success) {
                return res.status(500).json({ message })
            }

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        const { id: restaurantId, reviewId } = req.params
        try {
            const { success, message } =
                await restaurantReviewService.deleteReview(
                    restaurantId,
                    reviewId
                )
            if (!success) {
                return res.status(404).json({ message })
            }

            res.sendStatus(204)
        } catch (error) {
            next(error)
        }
    }

    async getAverageRating(req: Request, res: Response, next: NextFunction) {
        const { id: restaurantId } = req.params
        try {
            const { success, averageRating, message } =
                await restaurantReviewService.getAverageRating(restaurantId)
            if (!success) {
                return res.status(500).json({ message })
            }

            res.status(200).json({ averageRating })
        } catch (error) {
            next(error)
        }
    }

    async getAllReviewsForRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id: restaurantId } = req.params
        try {
            const { success, data, message } =
                await restaurantReviewService.getAllReviewsForRestaurant(
                    restaurantId
                )
            if (!success) {
                return res.status(500).json({ message })
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

// export default {
//     addNewReview,
//     deleteReview,
//     getAverageRating,
//     getAllReviewsForRestaurant
// };

// export default new RestaurantReviewController()
