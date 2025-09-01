import { col, fn, Op, or } from 'sequelize'
import Order from '../models/order.model'
import OrderItem from '../models/order_item.model'
import Basket from '../models/basket.model'
import { OrderStatus } from '../../types/custom'
import Dish from '../models/dish.model'
import { ServiceResponse, FilterOptions } from '../types/service.types'


export default class OrderService {
    async addOrder(orderData: {
        basketId: string
        userId: string
        status: OrderStatus
    }): Promise<ServiceResponse<any>> {
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
                    },
                ],
            })

            if (!basket) {
                return { success: false, message: 'Basket not found' }
            }
            
            if (basket.userId !== orderData.userId) {
                return {
                    success: false,
                    message: 'Basket does not belong to user',
                }
            }

            const basketOrderItems = basket.OrderItems as any[]
            const orderItemsNotAvailable = basketOrderItems.some(
                (orderItem) => !orderItem.Dish.isAvaliable
            )

            if (orderItemsNotAvailable) {
                return { success: false, message: 'Some dishes are not available' }
            }

            const orderValue: number = basketOrderItems.reduce(
                (accumulator: number, orderItem: any) => {
                    return accumulator + (orderItem.amount * orderItem.Dish.priceInCents)
                },
                0
            )

            const order = await Order.create({
                ...orderData,
                restaurantId: basket.restaurantId,
                totalValueInCents: orderValue,
                status: 'pending',
                userId: orderData.userId,
            })

            await OrderItem.update(
                { orderId: order.id },
                {
                    where: {
                        basketId: orderData.basketId,
                    },
                }
            )

            await basket.destroy()

            const data = {
                orderId: order.id,
                restaurantId: order.restaurantId,
                userId: order.userId,
                status: order.status,
                totalValueInCents: order.totalValueInCents,
            }

            return { success: true, data }
        } catch (error) {
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
    }): Promise<ServiceResponse<any[]>> {
        try {
            const dbFieldsMap = {
                value: 'totalValueInCents',
                created: 'createdAt',
                updated: 'updatedAt',
            }

            const whereConditions: any = {}

            if (filters.filterBy === 'time') {
                if (!filters.startDate || !filters.endDate) {
                    return {
                        success: false,
                        message: 'Missing startDate or endDate for time filtering',
                    }
                }
                whereConditions.createdAt = {
                    [Op.between]: [filters.startDate, filters.endDate],
                }
            } else if (filters.filterBy === 'restaurant' && filters.restaurantId) {
                whereConditions.restaurantId = filters.restaurantId
            } else if (filters.filterBy === 'user' && filters.userId) {
                whereConditions.userId = filters.userId
            } else if (filters.filterBy === 'status' && filters.status) {
                whereConditions.status = filters.status
            } else {
                return { success: false, message: 'Invalid filterBy' }
            }

            const sortField = dbFieldsMap[filters.shortField || 'created']
            const sortOrder = filters.sortBy || 'DESC'

            const orders = await Order.findAll({
                where: whereConditions,
                order: [[sortField, sortOrder]],
                attributes: {
                    exclude: ['userId', 'restaurantId', 'createdAt', 'updatedAt'],
                },
            })

            return { success: true, data: orders }
        } catch (error) {
            return { success: false, message: 'Failed to fetch orders', error }
        }
    }

    async getOrderById(id: string): Promise<ServiceResponse<any>> {
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
    ): Promise<ServiceResponse<any>> {
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
            return { success: false, message: 'Failed to update order', error }
        }
    }

    async deleteOrderById(id: string): Promise<ServiceResponse> {
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
            return { success: false, message: 'Failed to delete order', error }
        }
    }
}
