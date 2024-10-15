import { CustomRequest, OrderStatus } from './../../types/custom.d'
import { Request, Response, NextFunction } from 'express'
import OrderService from '../services/order.service'
import { getDate } from '../utils/date.utils'


const orderService = new OrderService()

export default class OrderController {
    async addOrder(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { basketId, status } = req.body
            let userId: string | null = null
            if (req.user) userId = req.user.id ?? null

            // console.log('addOrder', { basketId, status, userId })

            if (!userId)
                return res.status(400).json({ message: 'User not found' })

            const result = await orderService.addOrder({
                basketId,
                userId,
                status: 'pending', // Default status to 'pending' if not provided
                // totalValueInCents: 0,
            })

            if (result.success) {
                return res.status(201).json({
                    message: 'Order created successfully',
                    data: result.data,
                })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.message })
            }
        } catch (error) {
            console.error('Error in addOrder controller:', error)
            next(error)
        }
    }

    async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            type Query = {
                userId?: string
                restaurantId?: string
                status?: OrderStatus
                filterBy?: 'time' | 'restaurant' | 'user' | 'status'
                shortField?: 'value' | 'created' | 'updated'
                sortBy?: 'ASC' | 'DESC'
            }

            const { userId, restaurantId, status, filterBy, sortBy }: Query = req.query
            const { startYear, startMonth, startDay } = req.query
            const { endYear, endMonth, endDay } = req.query

            if (
                filterBy === 'time' &&
                (!startYear ||
                    !startMonth ||
                    !startDay ||
                    !endYear ||
                    !endMonth ||
                    !endDay)
            ) {
                return res
                    .status(400)
                    .json({
                        message:
                            'Missing parameters: startYear, startMonth, startDay, endYear, endMonth, endDay',
                    })
            }

            const filterConditions: any = {
                userId,
                restaurantId,
                status,
                filterBy,
                sortBy,
            }

            if (filterBy === 'time') {
                filterConditions['startDate'] = getDate(
                    Number(startYear),
                    Number(startMonth),
                    Number(startDay)
                )
                filterConditions['endDate'] = getDate(
                    Number(endYear),
                    Number(endMonth),
                    Number(endDay),
                    true
                )
            }

            // console.log('filterConditions', filterConditions);

            // const startDate = getDate(Number(startYear), Number(startMonth), Number(startDay))
            // const endDate = getDate(Number(endYear), Number(endMonth), Number(endDay), true)

            // const result = await OrderService.getOrders({ userId, restaurantId, status, startDate, endDate, sortBy, filterBy })
            const result = await orderService.getOrders(filterConditions)

            if (result.success) {
                return res.status(200).json({ data: result.data })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.error })
            }
        } catch (error) {
            console.error('Error in getOrders controller:', error)
            next(error)
        }
    }

    async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await orderService.getOrderById(id)

            if (result.success) {
                return res.status(200).json({ data: result.data })
            } else {
                return res
                    .status(400)
                    .json({ message: result.message, error: result.error })
            }
        } catch (error) {
            console.error('Error in getOrderById controller:', error)
            next(error)
        }
    }

    async updateOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { status, restaurantId, userId } = req.body

            const result = await orderService.updateOrderById(id, {
                status,
                restaurantId,
                userId,
            })

            if (result.success) {
                return res.status(200).json({
                    message: 'Order updated successfully',
                    data: result.data,
                })
            } else {
                return res.status(404).json({ message: result.message })
            }
        } catch (error) {
            console.error('Error in updateOrder controller:', error)
            next(error)
        }
    }

    async deleteOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await orderService.deleteOrderById(id)

            if (result.success) {
                return res.status(200).json({
                    message: 'Order deleted successfully',
                    // data: result.data,
                })
            } else {
                return res.status(404).json({ message: result.message })
            }
        } catch (error) {
            console.error('Error in deleteOrder controller:', error)
            next(error)
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

// export default new OrderController()
