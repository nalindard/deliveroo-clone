import Basket from '../models/basket.model'
import Dish from '../models/dish.model'
import BasketItem from '../models/order_item.model'
import { ServiceResponse } from '../types/service.types'

export default class BasketService {
    async createBasket({
        userId,
        restaurantId,
    }: {
        userId: string
        restaurantId: string
    }): Promise<ServiceResponse<any>> {
        try {
            const basket = await Basket.create({ userId, restaurantId })
            return {
                success: true,
                data: {
                    id: basket.id,
                    userId: basket.userId,
                    restaurantId: basket.restaurantId,
                },
            }
        } catch (error: any) {
            return {
                success: false,
                message: 'Failed to create basket',
                error: error.errors?.[0]?.message || error.message,
            }
        }
    }

    async getBasketById(id: string): Promise<ServiceResponse<any>> {
        try {
            const basket = await Basket.findByPk(id, {
                attributes: ['id', 'userId'],
                include: [
                    {
                        model: BasketItem,
                        include: [
                            {
                                model: Dish,
                                required: true,
                                attributes: [
                                    'id',
                                    'name',
                                    'description',
                                    'priceInCents',
                                ],
                            },
                        ],
                    },
                ],
            })

            if (!basket) {
                return { success: false, message: 'Basket not found' }
            }

            return { success: true, data: basket }
        } catch (error) {
            return { success: false, message: 'Error fetching basket', error }
        }
    }

    async getBaskets({
        userId,
        restaurantId,
    }: {
        userId?: string
        restaurantId?: string
    }): Promise<ServiceResponse<any[]>> {
        try {
            const whereClause: { [key: string]: string } = userId ? { userId } : {}
            if (restaurantId) {
                whereClause['restaurantId'] = restaurantId
            }

            const baskets = await Basket.findAll({
                where: whereClause,
                include: [
                    {
                        model: BasketItem,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: Dish,
                                required: true,
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt'],
                                },
                            },
                        ],
                    },
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })

            return { success: true, data: baskets }
        } catch (error) {
            return { success: false, message: 'Error fetching baskets', error }
        }
    }

    async deleteBasketById(id: string): Promise<ServiceResponse> {
        try {
            const basket = await Basket.findByPk(id)
            if (!basket) {
                return { success: false, message: 'Basket not found' }
            }

            await basket.destroy()
            return { success: true, message: 'Basket deleted successfully' }
        } catch (error) {
            return { success: false, message: 'Failed to delete basket', error }
        }
    }

    async addBasketItemById(
        basketId: string,
        {
            dishId,
            amount,
            orderId,
        }: { dishId: string; amount: number; orderId: string }
    ): Promise<ServiceResponse<any>> {
        try {
            const basket = await Basket.findByPk(basketId)
            if (!basket) {
                return { success: false, message: 'Basket not found' }
            }

            const basketItem = await BasketItem.create({ basketId, dishId, amount, orderId })

            return {
                success: true,
                data: {
                    id: basketItem.id,
                    dishId: basketItem.dishId,
                    basketId: basketItem.basketId,
                    amount: basketItem.amount,
                    orderId: basketItem.orderId,
                },
            }
        } catch (error: any) {
            return { 
                success: false, 
                message: 'Failed to add item to basket', 
                error: error.errors?.[0]?.message || error.message 
            }
        }
    }

    async removeBasketItem(basketId: string, id: string): Promise<ServiceResponse> {
        try {
            const basketItem = await BasketItem.findOne({
                where: { basketId, id },
            })
            
            if (!basketItem) {
                return { success: false, message: 'Item not found in basket' }
            }

            await basketItem.destroy()
            return { success: true, message: 'Item removed successfully' }
        } catch (error) {
            return { success: false, message: 'Failed to remove item from basket', error }
        }
    }

    async updateBasketItem(basketId: string, id: string, amount: number): Promise<ServiceResponse> {
        try {
            const basketItem = await BasketItem.findOne({ where: { basketId, id } })
            
            if (!basketItem) {
                return { success: false, message: 'Item not found in basket' }
            }

            await basketItem.update({ amount })
            return { success: true, message: 'Item updated successfully' }
        } catch (error) {
            return { success: false, message: 'Failed to update item in basket', error }
        }
    }
}
