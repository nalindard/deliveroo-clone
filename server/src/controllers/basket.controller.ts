import { Request, Response, NextFunction } from 'express'
import BasketService from '../services/basket.service'

const basketService = new BasketService()

export default class BasketController {
    async createBasket(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, restaurantId } = req.body
            const result = await basketService.createBasket({
                userId,
                restaurantId,
            })

            if (result.success) {
                return res.status(201).json({
                    message: 'Basket created successfully',
                    data: result.data,
                })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.error })
            }
        } catch (error) {
            console.error('Error in createBasket controller:', error)
            next(error)
        }
    }

    async getBasketById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await basketService.getBasketById(id)

            if (result.success) {
                return res.status(200).json({ data: result.data })
            } else {
                return res.status(404).json({ message: result.message })
            }
        } catch (error) {
            console.error('Error in getBasketById controller:', error)
            next(error)
        }
    }

    async getBaskets(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, restaurantId } = req.query
            // console.log('userId, restaurantId: ', userId, restaurantId)

            const result = await basketService.getBaskets({
                userId: userId as string,
                restaurantId: restaurantId as string,
            })

            if (result.success) {
                return res.status(200).json({ data: result.data })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.error })
            }
        } catch (error) {
            console.error('Error in getBaskets controller:', error)
            next(error)
        }
    }

    async deleteBasketById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await basketService.deleteBasketById(id)

            if (result.success) {
                return res
                    .status(200)
                    .json({ message: 'Basket deleted successfully' })
            } else {
                return res.status(404).json({ message: result.message })
            }
        } catch (error) {
            console.error('Error in deleteBasketById controller:', error)
            next(error)
        }
    }

    async addBasketItemById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: basketId } = req.params
            // const { dishId, amount, orderId, priceInCents } = req.body
            const { dishId, amount, orderId } = req.body
            const result = await basketService.addBasketItemById(basketId, {
                // dishId, amount, orderId, priceInCents
                dishId,
                amount,
                orderId,
            })

            if (result.success) {
                // console.log(result)
                return res.status(200).json({
                    message: 'Item added to basket successfully',
                    data: result.data,
                })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.message })
            }
        } catch (error) {
            console.error('Error in addBasketItemById controller:', error)
            next(error)
        }
    }

    async removeBasketItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: basketId, itemId } = req.params
            // const { id } = req.body
            // console.log('basketId, itemId: ', basketId, itemId)

            const result = await basketService.removeBasketItem(
                basketId,
                itemId
            )

            if (result.success) {
                return res
                    .status(200)
                    .json({ message: 'Item removed from basket successfully' })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.message })
            }
        } catch (error) {
            console.error('Error in removeBasketItem controller:', error)
            next(error)
        }
    }

    async updateBasketItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { itemId } = req.params
            const { id: basketId, amount } = req.body
            const result = await basketService.updateBasketItem(
                basketId,
                itemId,
                amount
            )

            if (result.success) {
                return res
                    .status(200)
                    .json({ message: 'Item updated in basket successfully' })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.message })
            }
        } catch (error) {
            console.error('Error in updateBasketItem controller:', error)
            next(error)
        }
    }
}

// export default {
//     createBasket,
//     getBasketById,
//     getBaskets,
//     addBasketItemById,
//     removeBasketItem,
//     deleteBasketById,
// }

// export default new BasketController()
