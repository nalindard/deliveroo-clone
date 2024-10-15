import { Op, fn, col } from 'sequelize'
import Order from '../models/order.model'
import OrderItem from '../models/order_item.model'
import Dish from '../models/dish.model'

export default class ReportService {
    // Service to calculate total sales in a given time period
    async getTotalSales(startingDate: string, endingDate: string) {
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
                        [Op.in]: ['delivered', 'out-for-delivery'], // Only count delivered or in-progress orders
                    },
                },
            })

            return { success: true, data: totalSales }
        } catch (error) {
            console.error('Error in getTotalSales service:', error)
            return {
                success: false,
                message: 'Failed to get total sales',
                error,
            }
        }
    }

    // Service to get top-selling items by number of orders or total revenue
    async getTopItems(orderBy: string) {
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
            console.error('Error in getTopItems service:', error)
            return { success: false, message: 'Failed to get top items', error }
        }
    }

    // Service to calculate the average order value in a given time period
    async getAvgOrderValue(startingDate: string, endingDate: string) {
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
                        [Op.in]: ['delivered', 'out-for-delivery'], // Only include relevant orders
                    },
                },
            })

            return { success: true, data: avgOrderValue }
        } catch (error) {
            console.error('Error in getAvgOrderValue service:', error)
            return {
                success: false,
                message: 'Failed to get average order value',
                error,
            }
        }
    }
}

// export default {
//     getTotalSales,
//     getTopItems,
//     getAvgOrderValue,
// }

// export default new ReportService()
