import sequelize from '../../configs/sequelize.config'
import Category from '../models/category.model'
import Dish from '../models/dish.model'
import Restaurant, {
    RestaurantCreationAttributes,
} from '../models/restaurant.model'
import RestaurentReview from '../models/restaurent_review.model'

type IgetAllRestaurants = {
    limit?: number
    offset?: number
    orderBy?: string
    sortInvert?: boolean
}

export default class RestaurantService {
    async getAllRestaurants({
        limit,
        offset,
        orderBy = 'createdAt',
        sortInvert = false,
    }: IgetAllRestaurants) {
        try {
            const restaurants = await Restaurant.findAll({
                limit: limit,
                offset: offset,
                // include: [{model: Category, include: [Dish]},Dish],
                // order: [['createdAt', 'DESC']],
                order: [[orderBy, sortInvert ? 'DESC' : 'ASC']],
            })
            return { success: true, data: restaurants }
        } catch (error) {
            // throw new Error(error as unknown as string)
            return {
                success: false,
                message: 'Error fetching restaurants',
                error,
            }
        }
    }

    // const getPaginatedUsers = async (req, res) => {
    //     const page = parseInt(req.query.page) || 1; // Default to page 1
    //     const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    //     const offset = (page - 1) * limit; // Calculate offset

    //     try {
    //         const { count, rows } = await User.findAndCountAll({
    //             limit,
    //             offset,
    //             order: [['createdAt', 'DESC']], // Optional: ordering
    //         });

    //         const totalPages = Math.ceil(count / limit); // Calculate total pages

    //         res.json({
    //             totalItems: count,
    //             totalPages,
    //             currentPage: page,
    //             users: rows,
    //         });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // };

    // module.exports = { getPaginatedUsers };

    async getRestaurantById(restaurantId: string) {
        try {
            const avgRating = await RestaurentReview.findOne({
                attributes: [
                    [
                        sequelize.fn('AVG', sequelize.col('rating')),
                        'averageRating',
                    ],
                ],
                where: { restaurantId },
                raw: true,
            })

            const restaurant = await Restaurant.findOne({
                where: { id: restaurantId },
                // filter timestamps
                include: [
                    {
                        model: Category,
                        include: [
                            {
                                model: Dish,
                                attributes: {
                                    exclude: [
                                        'restaurantId',
                                        'DishCategories',
                                        'createdAt',
                                        'updatedAt',
                                    ],
                                },
                                // attributes:  ['name'] ,
                                through: { attributes: [] }, // Exclude all attributes from the join table
                            },
                        ],
                        attributes: ['name'],
                    },
                    // {
                    //     model: RestaurentReview,
                    //     attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
                    //     required: false,
                    // }
                ],
                attributes: {
                    exclude: ['locationCordinates', 'createdAt', 'updatedAt'],
                    include: [
                        [
                            // @ts-expect-error
                            sequelize.literal(`(${avgRating?.averageRating})`),
                            'averageRating',
                        ],
                    ],
                },
                // include: {all: true},
            })
            const reviews = await RestaurentReview.findAll({
                where: { restaurantId },
                attributes: [
                    [
                        sequelize.fn('AVG', sequelize.col('rating')),
                        'averageRating',
                    ],
                    [
                        sequelize.fn('COUNT', sequelize.col('id')),
                        'totalReviews',
                    ],
                ],
            })

            const averageRating = reviews[0]?.get('averageRating') || 0
            const totalReviews = reviews[0]?.get('totalReviews') || 0

            if (!restaurant) {
                return { success: false, message: 'Restaurant not found' }
            }

            return {
                success: true,
                data: {
                    ...restaurant.toJSON(),
                    RestaurentReviews: { averageRating, totalReviews },
                },
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error fetching restaurant',
                error,
            }
        }
    }

    async addRestaurant(restaurantData: RestaurantCreationAttributes) {
        try {
            // const newRestaurant = await Restaurant.create({ id, name, address, city, area, phone, note, isActive, opensAt, closesAt, ownerId, opensAt, closesAt })
            const newRestaurant = await Restaurant.create(restaurantData)
            return { success: true, data: newRestaurant }
        } catch (error) {
            return { success: false, message: 'Error adding restaurant', error }
        }
    }

    async updateRestaurantById(
        restaurantId: string,
        updateData: RestaurantCreationAttributes
    ) {
        try {
            const [affectedRows] = await Restaurant.update(updateData, {
                where: { id: restaurantId },
            })
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'Restaurant not found or no changes',
                }
            }
            return { success: true, message: 'Restaurant updated successfully' }
        } catch (error) {
            return {
                success: false,
                message: 'Error updating restaurant',
                error,
            }
        }
    }

    async deleteRestaurantById(restaurantId: string) {
        try {
            const deletedRows = await Restaurant.destroy({
                where: { id: restaurantId },
            })
            if (deletedRows === 0) {
                return { success: false, message: 'Restaurant not found' }
            }
            return { success: true, message: 'Restaurant deleted successfully' }
        } catch (error) {
            return {
                success: false,
                message: 'Error deleting restaurant',
                error,
            }
        }
    }
}
