import { Request, Response, NextFunction } from 'express'
import CategoryService from '../services/category.service'

const categoryService = new CategoryService()

export default class CategoryController {
    async addNewCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: restaurantId } = req.params
            const { id: categoryId, name } = req.body
            const results = await categoryService.addNewCategory({
                id: categoryId,
                restaurantId,
                name,
            })
            if (!results.success){
                return res.status(400).json({message: results.message, error: results.error})
            }
            res.status(201).json(results)
        } catch (error) {
            next(error)
        }
    }

    async getAllCategoriesByRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id: restaurantId } = req.params
            const results =
                await categoryService.getAllCategoriesByRestaurant(restaurantId)
                if (!results.success) {
                    return res.status(400).json({message: results.message, error: results.error})
                }
            res.status(200).json(results)
        } catch (error) {
            next(error)
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await categoryService.getCategoryById(id)

            if (!result.success) {
                return res.status(404).json({ message: result.message, error: result.error })
            }

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async updateCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const result = await categoryService.updateCategoryById(
                id
                // name
            )

            if (!result.success) {
                // return res.status(404).json({ message: 'Category not found' })
                return res.status(400).json({ message: result.message, error: result.error })
            }

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async deleteCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const result = await categoryService.deleteCategoryById(id)

            if (!result.success) {
                return res.status(400).json({ message: result.message, error: result.error })
            }

            res.sendStatus(204) // No content response for delete success
        } catch (error) {
            next(error)
        }
    }
}
