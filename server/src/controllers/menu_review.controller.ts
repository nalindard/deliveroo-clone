import { Request, Response, NextFunction } from 'express'
import MenuReviewService from '../services/menu_review.service'

const menuReviewService = new MenuReviewService()

export default class MenuReviewController {
    async addNewReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: dishId } = req.params
            const reviewData = {
                userId: req.body.userId,
                dishId,
                rating: req.body.rating,
                comment: req.body.comment,
            }

            const { success, data, message } =
                await menuReviewService.addNewReview(reviewData)
            if (!success) {
                return res.status(500).json({ message })
            }

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        const { id: dishId, reviewId } = req.params
        try {
            const { success, message } = await menuReviewService.deleteReview(
                dishId,
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
        const { id: dishId } = req.params
        try {
            const { success, averageRating, message } =
                await menuReviewService.getAverageRating(dishId)
            if (!success) {
                return res.status(500).json({ message })
            }

            res.status(200).json({ averageRating })
        } catch (error) {
            next(error)
        }
    }

    async getAllReviewsForDish(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id: dishId } = req.params
        try {
            const { success, data, message } =
                await menuReviewService.getAllReviewsForDish(dishId)
            if (!success) {
                return res.status(500).json({ message })
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}
