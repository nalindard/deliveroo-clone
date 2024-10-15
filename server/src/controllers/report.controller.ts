import { Request, Response, NextFunction } from 'express'
import ReportService from '../services/report.service'
import {
    getDate,
    getStartAndEndOfMonth,
    getStartAndEndOfWeek,
} from '../utils/date.utils'

const reportService = new ReportService()

type TPeriod = 'day' | 'week' | 'month'
const periods: TPeriod[] = ['day', 'week', 'month']


export default class ReportController {
    async getSales(req: Request, res: Response, next: NextFunction) {
        try {
            const { period, week } = req.query
            const { startYear, startMonth, startDay } = req.query
            const { endYear, endMonth, endDay } = req.query

            if (!periods.includes(period as TPeriod))
                return res.status(400).json({ message: 'Invalid period' })
            if (!startYear || !startMonth)
                return res.status(400).json({
                    message: 'Missing parameters: startYear or startMonth',
                })

            let startDate: string, endDate: string

            switch (period) {
                case 'day':
                    if (!startDay)
                        return res
                            .status(400)
                            .json({ message: 'Missing parameters: startDay' })
                    // startDate = getDate(parseInt(startYear as string), parseInt(startMonth as string), parseInt(startDay as string))
                    // endDate = getDate(parseInt(startYear as string), parseInt(startMonth as string), parseInt(startDay as string), true)
                    startDate = getDate( Number(startYear), Number(startMonth), Number(startDay) )
                    endDate = getDate( Number(startYear), Number(startMonth), Number(startDay), true )
                    break
                case 'week':
                    // const weekDates = getStartAndEndOfWeek(parseInt(startYear as string), parseInt(startMonth as string), parseInt(week as string))
                    const weekDates = getStartAndEndOfWeek( Number(startYear), Number(startMonth), Number(week) )
                    // console.log(weekDates)

                    startDate = weekDates.start
                    endDate = weekDates.end
                    break
                case 'month':
                    // const monthDates = getStartAndEndOfMonth(parseInt(startYear as string), parseInt(startMonth as string))
                    const monthDates = getStartAndEndOfMonth( Number(startYear), Number(startMonth) )
                    startDate = monthDates.start
                    endDate = monthDates.end
                    break
                default:
                    return res.status(400).json({ message: 'Invalid period' })
            }

            // console.log(startDate, endDate);

            const results = await reportService.getTotalSales(
                startDate,
                endDate
            )
            if (!results.success) {
                return res.status(400).json({ message: results.message, error: results.error })
            }
            return res.status(200).json(results)
        } catch (error) {
            console.error('Error in getSales controller:', error)
            next(error)
        }
    }

    async getTopItems(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderBy } = req.query

            if (!['orders', 'revenue'].includes(orderBy as string)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid orderBy parameter' })
            }

            const results = await reportService.getTopItems(orderBy as string)
            if (!results.success) {
                return res
                    .status(400)
                    .json({ message: results.message, error: results.error })
            }
            return res.status(200).json(results)
        } catch (error) {
            console.error('Error in getTopItems controller:', error)
            next(error)
        }
    }

    async getAvgOrderValue(req: Request, res: Response, next: NextFunction) {
        try {
            // const { startYear, startMonth, startDay, endYear, endMonth, endDay, } = req.query
            const { startYear, startMonth, startDay } = req.query
            const { endYear, endMonth, endDay } = req.query

            // const startDate = getDate(parseInt(startYear as string), parseInt(startMonth as string), parseInt(startDay as string))
            // const endDate = getDate(parseInt(endYear as string), parseInt(endMonth as string), parseInt(endDay as string), true)
            const startDate = getDate( Number(startYear), Number(startMonth), Number(startDay) )
            const endDate = getDate( Number(endYear), Number(endMonth), Number(endDay), true )

            const results = await reportService.getAvgOrderValue(
                startDate,
                endDate
            )
            if (!results.success) {
                return res
                    .status(400)
                    .json({ message: results.message, error: results.error })
            }
            return res.status(200).json(results)
        } catch (error) {
            console.error('Error in getAvgOrderValue controller:', error)
            next(error)
        }
    }
}

// export default {
//     getSales,
//     getTopItems,
//     getAvgOrderValue,
// }

// export default new ReportController()
