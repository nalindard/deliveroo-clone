import { Request, Response, NextFunction } from 'express'
import MenuService from '../services/menu.service'

const menuService = new MenuService()

export default class MenuController {
    async getAllMenusById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: restaurantId } = req.params
            const result = await menuService.getAllMenusById(restaurantId)
            if (result.success) {
                return res.status(200).json(result.data)
            }
            res.status(404).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }

    async getAllMenus(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await menuService.getAllMenus()
            if (result.success) {
                return res.status(200).json(result.data)
            }
            res.status(404).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }

    async getMenuById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await menuService.getMenuById(id)
            if (result.success) {
                return res.status(200).json(result.data)
            }
            res.status(404).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }

    async addMenu(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: restaurantId } = req.params
            const data = { ...req.body, restaurantId }
            const { categories, ...dishData } = data

            const result = await menuService.addNewMenu(dishData, categories)
            if (result.success) {
                return res.status(201).json(result.data)
            }
            res.status(400).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }

    async updateMenuById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await menuService.updateMenuById(id, req.body)
            if (result.success) {
                return res.status(200).json(result.data)
            }
            res.status(404).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }

    async deleteMenuById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await menuService.deleteMenuById(id)
            if (result.success) {
                return res.sendStatus(204)
            }
            res.status(404).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }
}
