import Category from '../models/category.model'
import Dish from '../models/dish.model'

export default class CategoryService {
    async addNewCategory(data: {
        id: string
        name: string
        restaurantId: string
    }) {
        try {
            const newCategory = await Category.create(data)
            // return newCategory
            return {success: true, data: newCategory}
        } catch (error) {
            // throw new Error(`Error adding new category: ${error}`)
            return {success: false, message: 'Error adding new category', error}
        }
    }

    async getAllCategoriesByRestaurant(restaurantId: string) {
        try {
            const categories = await Category.findAll({
                // where: { restaurantId },
                include: [Dish],
                // limit: 2,
            })
            // return categories
            return {success: true, data: categories}
        } catch (error) {
            // throw new Error(`Error fetching categories for restaurant with ID ${restaurantId}: ${error}`)
            // throw new Error(`Error fetching categories: ${error}`)
            return {success: false, message: 'Error fetching categories', error}
        }
    }

    async getCategoryById(id: string) {
        try {
            const category = await Category.findByPk(id)
            // return category
            return {success: true, data: category}
        } catch (error) {
            // throw new Error(`Error fetching category with ID ${id}: ${error}`)
            return {success: false, message: 'Error fetching category', error}
        }
    }

    async updateCategoryById(id: string) {
        try {
            const category = await Category.findByPk(id)

            if (!category) return {success: false, message: 'Category not found'}

            // category.name = name
            category.id = id
            await category.save()

            // return category
            return {success: true, data: category}
        } catch (error) {
            // throw new Error(`Error updating category with ID ${id}: ${error}`)
            return {success: false, message: 'Error updating category', error}
        }
    }

    async deleteCategoryById(id: string) {
        try {
            const category = await Category.findByPk(id)

            if (!category) return {success: false, message: 'Category not found'}

            await category.destroy()

            // return true
            return {success: true}
        } catch (error) {
            // throw new Error(`Error deleting category with ID ${id}: ${error}`)
            return {success: false, message: 'Error deleting category', error}
        }
    }
}

// export default {
//     addNewCategory,
//     getAllCategoriesByRestaurant,
//     getCategoryById,
//     updateCategoryById,
//     deleteCategoryById,
// }

// export default new CategoryService()
