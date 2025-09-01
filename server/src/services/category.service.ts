import Category from '../models/category.model'
import Dish from '../models/dish.model'
import { ServiceResponse } from '../types/service.types'

export default class CategoryService {
    async addNewCategory(data: {
        id: string
        name: string
        restaurantId: string
    }): Promise<ServiceResponse<any>> {
        try {
            const newCategory = await Category.create(data)
            return { success: true, data: newCategory }
        } catch (error) {
            return { success: false, message: 'Error adding new category', error }
        }
    }

    async getAllCategoriesByRestaurant(restaurantId: string): Promise<ServiceResponse<any[]>> {
        try {
            const categories = await Category.findAll({
                include: [Dish],
            })
            return { success: true, data: categories }
        } catch (error) {
            return { success: false, message: 'Error fetching categories', error }
        }
    }

    async getCategoryById(id: string): Promise<ServiceResponse<any>> {
        try {
            const category = await Category.findByPk(id)
            if (!category) {
                return { success: false, message: 'Category not found' }
            }
            return { success: true, data: category }
        } catch (error) {
            return { success: false, message: 'Error fetching category', error }
        }
    }

    async updateCategoryById(id: string, updateData: any): Promise<ServiceResponse<any>> {
        try {
            const category = await Category.findByPk(id)

            if (!category) {
                return { success: false, message: 'Category not found' }
            }

            await category.update(updateData)
            return { success: true, data: category }
        } catch (error) {
            return { success: false, message: 'Error updating category', error }
        }
    }

    async deleteCategoryById(id: string): Promise<ServiceResponse> {
        try {
            const category = await Category.findByPk(id)

            if (!category) {
                return { success: false, message: 'Category not found' }
            }

            await category.destroy()
            return { success: true, message: 'Category deleted successfully' }
        } catch (error) {
            return { success: false, message: 'Error deleting category', error }
        }
    }
}
