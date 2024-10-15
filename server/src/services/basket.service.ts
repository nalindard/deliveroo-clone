import Basket from '../models/basket.model'
import Dish from '../models/dish.model'
import BasketItem from '../models/order_item.model'

export default class BasketService {
    async createBasket({
        userId,
        restaurantId,
    }: {
        userId: string
        restaurantId: string
    }) {
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
            console.error('Error creating basket:', error)
            return {
                success: false,
                message: 'Failed to create basket',
                error: error.errors[0].message,
            }
            // throw new Error(`Failed to create basket: ${error.errors[0].message}`)
        }
    }

    async getBasketById(id: string) {
        try {
            // const basket = await Basket.findByPk(id, {
            //     include: [BasketItem] // assuming basket has related items
            // })

            const basket = await Basket.findByPk(id, {
                attributes: ['id', 'userId'],
                include: [
                    {
                        model: BasketItem,
                        include: [
                            {
                                model: Dish, // Include the Dish model
                                required: true, // Ensures that only BasketItems with Dishes are fetched
                                attributes: [
                                    'id',
                                    'name',
                                    'description',
                                    'priceInCents',
                                ],
                            },
                        ],
                    },
                ], // assuming basket has related items
            })

            if (!basket) return { success: false, message: 'Basket not found' }

            return { success: true, data: basket }
        } catch (error) {
            console.error('Error fetching basket:', error)
            return { success: false, message: 'Error fetching basket', error }
            // throw new Error(`Failed to fetch basket: ${(error as any).errors[0].message}`)
        }
    }

    async getBaskets({
        userId,
        restaurantId,
    }: {
        userId?: string
        restaurantId?: string
    }) {
        try {
            const whereClause: { [key: string]: string } = userId
                ? { userId }
                : {}
            restaurantId && (whereClause['restaurantId'] = restaurantId)
            // console.log(whereClause)

            // const baskets = await Basket.findAll({ where: whereClause, include: [BasketItem]})
            const baskets = await Basket.findAll({
                where: whereClause,
                include: [
                    {
                        model: BasketItem,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: Dish, // Include the Dish model
                                required: true, // Ensures that only BasketItems with Dishes are fetched
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt'],
                                },
                            },
                        ],
                    },
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
            // console.log(baskets)

            return { success: true, data: baskets }
        } catch (error) {
            console.error('Error fetching baskets:', error)
            return { success: false, message: 'Error fetching baskets', error }
            // throw new Error(`Failed to fetch baskets: ${(error as any).errors[0].message}`)
        }
    }

    async deleteBasketById(id: string) {
        try {
            const basket = await Basket.findByPk(id)
            if (!basket) return { success: false, message: 'Basket not found' }

            await basket.destroy()
            return { success: true }
        } catch (error) {
            console.error('Error deleting basket:', error)
            return { success: false, message: 'Failed to delete basket', error }
            // throw new Error(
            //     `Failed to delete basket: ${(error as any).errors[0].message}`
            // )
        }
    }

    async addBasketItemById(
        basketId: string,
        {
            dishId,
            amount,
            orderId,
        }: { dishId: string; amount: number; orderId: string }
    ) {
        try {
            const basket = await Basket.findByPk(basketId)
            if (!basket) return { success: false, message: 'Basket not found' }

            const basketItem = await BasketItem.create(
                { basketId, dishId, amount, orderId },
                {
                    include: [
                        {
                            model: Dish,
                            required: true,
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        },
                    ],
                }
            )

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
            console.error(
                'Error adding item to basket:',
                error.errors[0].message
            )
            return { success: false, message: 'Failed to add item to basket', error: error.errors[0].message }
            // throw new Error(
            //     `Failed to add item to basket: ${error.errors[0].message}`
            // )
        }
    }

    async removeBasketItem(basketId: string, id: string) {
        try {
            const basketItem = await BasketItem.findOne({
                where: { basketId, id },
            })
            if (!basketItem)
                return { success: false, message: 'Item not found in basket' }

            await basketItem.destroy()
            return { success: true }
        } catch (error) {
            console.error('Error removing item from basket:', error)
            return { success: false, message: 'Failed to remove item from basket', error }
            // throw new Error(
            //     `Failed to remove item from basket: ${
            //         (error as any).errors[0].message
            //     }`
            // )
        }
    }

    async updateBasketItem(basketId: string, id: string, amount: number) {
        try {
            const basketItem = await BasketItem.findOne({ where: { basketId, id } })
            if (!basketItem) return { success: false, message: 'Item not found in basket' }

            await basketItem.update({ amount })
            return { success: true }
        } catch (error) {
            console.error('Error updating item in basket:', error)
            return { success: false, message: 'Failed to update item in basket', error }
            // throw new Error(
            //     `Failed to update item in basket: ${(error as any).errors[0].message}`
            // )
        }
    }
}
// export default {
//     createBasket,
//     getBasketById,
//     getBaskets,
//     deleteBasketById,
//     addBasketItemById,
//     removeBasketItem,
// }

// export default new BasketService()
