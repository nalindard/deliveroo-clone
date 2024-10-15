import Category from '../models/category.model'
import Dish from '../models/dish.model'
// import { WhereOptions } from 'sequelize';

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
    async getAllMenusById(restaurantId: string) {
        try {
            const dishes = await Dish.findAll({
                where: { restaurantId },
                include: [Category],
            })
            return { success: true, data: dishes }
        } catch (error) {
            console.error('Error fetching menus by restaurant ID:', error)
            return {
                success: false,
                message: 'Failed to fetch menus by restaurant ID',
                error,
            }
        }
    }

    async getAllMenus() {
        try {
            const dishes = await Dish.findAll()
            return { success: true, data: dishes }
        } catch (error) {
            console.error('Error fetching all menus:', error)
            return {
                success: false,
                message: 'Failed to fetch all menus',
                error,
            }
        }
    }

    async getMenuById(id: string) {
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
            console.error('Error fetching menu by ID:', error)
            return {
                success: false,
                message: 'Failed to fetch menu by ID',
                error,
            }
        }
    }

    async addNewMenu(data: DishData, categories: string[]) {
        try {
            const dish = await Dish.create(data)

            // const categories = await Category.create({
            //     id: 'Drinks',
            //     name: 'New Category',
            // })

            // console.log('categories', categories)

            // @ts-ignore
            await dish.setCategories([...categories])
            // await dish.setCategories(['Cold Drinks'])
            // await dish.setCategories(['999c07c5-a817-41b4-bff7-666804f3569e', 'e3289d96-1668-4e62-b35b-164d5291fae7'])
            return { success: true, data: dish }
        } catch (error) {
            console.error('Error adding new menu:', error)
            return { success: false, message: 'Failed to add new menu', error }
        }
    }

    async updateMenuById(id: string, data: Partial<DishData>) {
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
            console.error('Error updating menu:', error)
            return { success: false, message: 'Failed to update menu', error }
        }
    }

    async deleteMenuById(id: string) {
        try {
            const deletedRowsCount = await Dish.destroy({ where: { id } })
            if (deletedRowsCount === 0) {
                return { success: false, message: 'Menu not found' }
            }
            return { success: true, message: 'Menu deleted successfully' }
        } catch (error) {
            console.error('Error deleting menu:', error)
            return { success: false, message: 'Failed to delete menu', error }
        }
    }
}

// export default {
//     getAllMenusById,
//     getAllMenus,
//     getMenuById,
//     addNewMenu,
//     updateMenuById,
//     deleteMenuById,
// }

// export default new MenuService()
