import { Request, Response, NextFunction } from 'express'
import RestaurantService from '../services/restaurant.service'
import { RestaurantCreationAttributes } from '../models/restaurant.model'

const restaurantService = new RestaurantService()

export default class RestaurantController {
    async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req?.query?.page as string) || 1
            const limit = Number(req?.query?.limit as string) || 10

            const offset = (page || -1) * limit
            const { success, data, message } =
                await restaurantService.getAllRestaurants({ limit, offset })

            if (!success) {
                return res.status(500).json({ message })
            }

            return res.status(200).json(data)
        } catch (error) {
            console.error('Error in getAllRestaurants controller:', error)
            next(error)
        }
    }

    async getOneRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const { success, data, message } =
                await restaurantService.getRestaurantById(req.params.id)

            if (!success) {
                return res
                    .status(404)
                    .json({ message: message || 'Restaurant not found' })
            }

            return res.status(200).json(data)
        } catch (error) {
            console.error('Error in getOneRestaurant controller:', error)
            next(error)
        }
    }

    async addOneRestaurant(req: Request, res: Response, next: NextFunction) {
        try {

            const { success, data, message } =
                await restaurantService.addRestaurant(
                    req.body as RestaurantCreationAttributes
                )

            if (!success) {
                return res.status(500).json({ message })
            }

            return res.status(201).json(data)
        } catch (error) {
            console.error('Error in addOneRestaurant controller:', error)
            next(error)
        }
    }

    async updateOneRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const updateData = { ...req.body }

            const { success, message } =
                await restaurantService.updateRestaurantById(
                    req.params.id,
                    updateData
                )

            if (!success) {
                return res
                    .status(404)
                    .json({ message: message || 'Restaurant not found' })
            }

            return res
                .status(200)
                .json({ message: message || 'Restaurant updated successfully' })
        } catch (error) {
            console.error('Error in updateOneRestaurant controller:', error)
            next(error)
        }
    }

    async deleteOneRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const { success, message } =
                await restaurantService.deleteRestaurantById(req.params.id)

            if (!success) {
                return res
                    .status(404)
                    .json({ message: message || 'Restaurant not found' })
            }

            return res.sendStatus(204)
        } catch (error) {
            console.error('Error in deleteOneRestaurant controller:', error)
            next(error)
        }
    }
}
