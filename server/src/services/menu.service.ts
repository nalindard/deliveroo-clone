import Category from '../models/category.model'
import Dish from '../models/dish.model'
import { ServiceResponse } from '../types/service.types'

interface DishData {
    name: string
    restaurantId: string
    priceInCents: number
    calories: number
    description: string
    image: string
    isAvaliable: boolean
    highlight?: string
}

export default class MenuService {
    async getAllMenusById(restaurantId: string): Promise<ServiceResponse<any[]>> {
        try {
            const dishes = await Dish.findAll({
                where: { restaurantId },
                include: [Category],
            })
            return { success: true, data: dishes }
        } catch (error) {
            return {
                success: false,
                message: 'Failed to fetch menus by restaurant ID',
                error,
            }
        }
    }

    async getAllMenus(): Promise<ServiceResponse<any[]>> {
        try {
            const dishes = await Dish.findAll()
            return { success: true, data: dishes }
        } catch (error) {
            return {
                success: false,
                message: 'Failed to fetch all menus',
                error,
            }
        }
    }

    async getMenuById(id: string): Promise<ServiceResponse<any>> {
        try {
            const dish = await Dish.findOne({
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
            
            if (!dish) {
                return { success: false, message: 'Menu not found' }
            }
            
            return { success: true, data: dish }
        } catch (error) {
            return {
                success: false,
                message: 'Failed to fetch menu by ID',
                error,
            }
        }
    }

    async addNewMenu(data: DishData, categories: string[]): Promise<ServiceResponse<any>> {
        try {
            const dish = await Dish.create(data)
            await (dish as any).setCategories([...categories])
            return { success: true, data: dish }
        } catch (error) {
            return { success: false, message: 'Failed to add new menu', error }
        }
    }

    async updateMenuById(id: string, data: Partial<DishData>): Promise<ServiceResponse<any>> {
        try {
            const [updatedRowsCount] = await Dish.update(data, {
                where: { id },
            })
            
            if (updatedRowsCount === 0) {
                return {
                    success: false,
                    message: 'Menu not found or no changes made',
                }
            }
            
            const updatedDish = await Dish.findByPk(id)
            return { success: true, data: updatedDish }
        } catch (error) {
            return { success: false, message: 'Failed to update menu', error }
        }
    }

    async deleteMenuById(id: string): Promise<ServiceResponse> {
        try {
            const deletedRowsCount = await Dish.destroy({ where: { id } })
            
            if (deletedRowsCount === 0) {
                return { success: false, message: 'Menu not found' }
            }
            
            return { success: true, message: 'Menu deleted successfully' }
        } catch (error) {
            return { success: false, message: 'Failed to delete menu', error }
        }
    }
}
