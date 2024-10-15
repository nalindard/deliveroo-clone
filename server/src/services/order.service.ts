import { col, fn, Op, or } from 'sequelize'
import Order from '../models/order.model'
import OrderItem from '../models/order_item.model'
import Basket from '../models/basket.model'
import { OrderStatus } from '../../types/custom'
import Dish from '../models/dish.model'


export default class OrderService {
    async addOrder(orderData: {
        basketId: string
        userId: string
        status: OrderStatus
        // totalValueInCents: number
    }) {
        try {
            const basket = await Basket.findByPk(orderData.basketId, {
                include: [
                    {
                        model: OrderItem,
                        required: true,
                        include: [
                            {
                                model: Dish,
                                required: true,
                            },
                        ],
                        // attributes: [[fn('SUM', col('priceInCents')), 'priceInCents'],]
                    },
                ],
            })

            if (!basket) return { success: false, message: 'Basket not found' }
            if (basket.userId !== orderData.userId)
                return {
                    success: false,
                    message: 'Basket does not belong to user',
                }

            // console.log('basket', basket);

            // const basketItems = basket.OrderItems;
            // console.log('basket items', basketItems);

            // @ts-expect-error
            const orderItemsNotAvalible = basket.OrderItems.map((orderItem) => {
                return orderItem.Dish.isAvaliable
            }).includes(false)
            // console.log('Order items Not avalible', orderItemsNotAvalible)

            if (orderItemsNotAvalible)
                return { success: false, message: 'Dish not avalible' }

            // @ts-expect-erro
            const orderValue: number = basket.OrderItems.map(
                (orderItem: OrderItem) => {
                    return orderItem.amount * orderItem.Dish.priceInCents
                }
            ).reduce(
                (accumulator: number, currentValue: number) =>
                    accumulator + currentValue,
                0
            )

            // console.log( 'Order items avalible', orderItemsNotAvalible, 'orderValue', orderValue )

            const order = await Order.create({
                ...orderData,
                restaurantId: basket.restaurantId,
                totalValueInCents: orderValue,
                status: 'pending',
                userId: orderData.userId,
            })

            const orderItems = await OrderItem.update(
                { orderId: order.id },
                {
                    where: {
                        basketId: orderData.basketId,
                    },
                }
            )

            // console.log('Order items updated', orderItems)

            await basket.destroy()
            // console.log('Basket deleted')

            const data = {
                orderId: order.id,
                restaurantId: order.restaurantId,
                userId: order.userId,
                status: order.status,
                totalValueInCents: order.totalValueInCents,
            }

            // await Basket.destroy({ where: { id: orderData.basketId } })

            // const order = await Order.create(orderData)
            return { success: true, data: data }
        } catch (error) {
            console.error('Error adding order:', error)
            return { success: false, message: 'Failed to add order', error }
        }
    }


    async getOrders(filters: {
        userId?: string
        restaurantId?: string
        status?: OrderStatus
        startDate?: string
        endDate?: string
        shortField?: 'value' | 'created' | 'updated'
        sortBy?: 'ASC' | 'DESC'
        filterBy?: 'time' | 'restaurant' | 'user' | 'status'
    }) {
        try {
            const dbFieldsMap = {
                value: 'totalValueInCents',
                created: 'createdAt',
                updated: 'updatedAt',
            }

            // Dynamic whereCondition,
            const whereConditions: any = {}

            if (filters.filterBy === 'time') {
                if (!filters.startDate || !filters.endDate) {
                    return {
                        success: false,
                        message:
                            'Missing startDate or endDate for time filtering',
                    }
                }
                whereConditions.createdAt = {
                    [Op.between]: [filters.startDate, filters.endDate],
                }
            } else if (
                filters.filterBy === 'restaurant' &&
                filters.restaurantId
            ) {
                whereConditions.restaurantId = filters.restaurantId
            } else if (filters.filterBy === 'user' && filters.userId) {
                whereConditions.userId = filters.userId
            } else if (filters.filterBy === 'status' && filters.status) {
                whereConditions.status = filters.status
                // console.log(whereConditions)
            } else {
                return { success: false, message: 'Invalid filterBy' }
            }

            // console.log('whereConditions', whereConditions);

            const sortField = dbFieldsMap[filters.shortField || 'created']
            const sortOrder = filters.sortBy || 'DESC'

            const orders = await Order.findAll({
                where: whereConditions,
                order: [[sortField, sortOrder]],
                // include: {
                //     model: OrderItem,
                //     attributes: {
                //         exclude: ['createdAt', 'updatedAt'],
                //     },
                // },
                // include: [OrderItem],

                // attributes: ['id', 'status', 'totalValueInCents',],
                attributes: {
                    exclude: [
                        'userId',
                        'restaurantId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            })

            return { success: true, data: orders }
        } catch (error) {
            console.error('Error fetching orders:', error)
            return { success: false, message: 'Failed to fetch orders', error }
        }
    }

    async getOrderById(id: string) {
        try {
            const order = await Order.findByPk(id, {
                include: { model: OrderItem, include: [Dish] },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                }
            })

            if (!order) {
                return {
                    success: false,
                    message: `Order with ID ${id} not found`,
                }
            }

            return { success: true, data: order }
        } catch (error) {
            console.error(`Error fetching order with ID ${id}:`, error)
            return { success: false, message: 'Failed to fetch order', error }
        }
    }

    async updateOrderById(
        id: string,
        updateData: {
            status?: OrderStatus
            restaurantId?: string
            userId?: string
        }
    ) {
        try {
            const order = await Order.findByPk(id)

            if (!order) {
                return {
                    success: false,
                    message: `Order with ID ${id} not found`,
                }
            }

            await order.update(updateData)
            return { success: true, data: order }
        } catch (error) {
            console.error(`Error updating order with ID ${id}:`, error)
            return { success: false, message: 'Failed to update order', error }
        }
    }

    async deleteOrderById(id: string) {
        try {
            const order = await Order.findByPk(id)

            if (!order) {
                return {
                    success: false,
                    message: `Order with ID ${id} not found`,
                }
            }

            await order.destroy()
            return {
                success: true,
                message: `Order with ID ${id} successfully deleted`,
            }
        } catch (error) {
            console.error(`Error deleting order with ID ${id}:`, error)
            return { success: false, message: 'Failed to delete order', error }
        }
    }
}

// export default {
//     addOrder,
//     getOrders,
//     getOrderById,
//     updateOrderById,
//     deleteOrderById,
// }

// export default new OrderService()
