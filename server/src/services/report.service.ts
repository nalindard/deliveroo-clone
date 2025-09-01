import { Op, fn, col } from 'sequelize'
import Order from '../models/order.model'
import OrderItem from '../models/order_item.model'
import Dish from '../models/dish.model'
import { ServiceResponse } from '../types/service.types'

export default class ReportService {
    async getTotalSales(startingDate: string, endingDate: string): Promise<ServiceResponse<any[]>> {
        try {
            const totalSales = await Order.findAll({
                attributes: [
                    [fn('SUM', col('totalValueInCents')), 'totalSales'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startingDate, endingDate],
                    },
                    status: {
                        [Op.in]: ['delivered', 'out-for-delivery'],
                    },
                },
            })

            return { success: true, data: totalSales }
        } catch (error) {
            return {
                success: false,
                message: 'Failed to get total sales',
                error,
            }
        }
    }

    async getTopItems(orderBy: string): Promise<ServiceResponse<any[]>> {
        try {
            const topItems = await OrderItem.findAll({
                attributes: [
                    'dishId',
                    [fn('COUNT', col('orderId')), 'totalOrders'],
                    [fn('SUM', col('amount')), 'totalAmount'],
                ],
                group: ['dishId'],
                include: [
                    {
                        model: Dish,
                        attributes: ['name'],
                    },
                ],
                order:
                    orderBy === 'orders'
                        ? [[fn('COUNT', col('orderId')), 'DESC']]
                        : [[fn('SUM', col('amount')), 'DESC']],
            })

            return { success: true, data: topItems }
        } catch (error) {
            return { success: false, message: 'Failed to get top items', error }
        }
    }

    async getAvgOrderValue(startingDate: string, endingDate: string): Promise<ServiceResponse<any>> {
        try {
            const avgOrderValue = await Order.findOne({
                attributes: [
                    [fn('AVG', col('totalValueInCents')), 'avgOrderValue'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startingDate, endingDate],
                    },
                    status: {
                        [Op.in]: ['delivered', 'out-for-delivery'],
                    },
                },
            })

            return { success: true, data: avgOrderValue }
        } catch (error) {
            return {
                success: false,
                message: 'Failed to get average order value',
                error,
            }
        }
    }
}
