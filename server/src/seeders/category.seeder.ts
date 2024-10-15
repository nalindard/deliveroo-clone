import { faker } from '@faker-js/faker'
import Restaurant from '../models/restaurant.model'
import Category from '../models/category.model'

const categoryNames = [
    'Platters',
    'Yourguts',
    'Sea Food',
    'Desserts',
    'Beverages',
    'Starters',
    'Salads',
    'Snacks',
    'Main Course',
    'Appetizers',
    'Grilled',
    'Vegan',
    'Italian',
    'Asian',
    'Mexican',
    'Barbecue',
    'Deli',
    'Sushi',
    'Curry',
    'Wraps',
    'Pasta',
    'Tacos',
    'Breakfast',
    'Brunch',
    'Smoothies',
    'Soups',
    'Sandwiches',
    'Baked Goods',
    'Seafood',
    'Pizzas',
    'Healthy Bowls',
    'Finger Foods',
    'Tropical',
    'Comfort Food',
    'Specialty',
    'Gourmet',
    'Seasonal',
    'Fusion',
    'Street Food',
    'Family Meals',
]

async function getRestaurantIds() {
    const restaurants = await Restaurant.findAll({
        attributes: ['id'],
    })

    if (!restaurants.length) {
        throw new Error(
            'No restaurants found. Please create restaurant entries before seeding categories.'
        )
    }

    return restaurants.map((restaurant) => restaurant.id)
}

export default async function seedCategories(amountPerRestaurant = 10) {
    if (amountPerRestaurant <= 0 || amountPerRestaurant > 100) {
        throw new Error(
            'Invalid amount. Please provide a number between 1 and 100.'
        )
    }

    const restaurantIds = await getRestaurantIds()

    const fakeCategories = []
    for (const restaurantId of restaurantIds) {
        const usedNames = new Set() // To avoid duplicate category names for the same restaurant

        for (let i = 0; i < amountPerRestaurant; i++) {
            let name
            // Ensure the name is unique for the current restaurant
            do {
                name =
                    categoryNames[
                        Math.floor(Math.random() * categoryNames.length)
                    ]
            } while (usedNames.has(name))

            usedNames.add(name) // Add to used names set

            fakeCategories.push({
                name: name,
                restaurantId: restaurantId,
            })
        }
    }

    console.log('Creating fake categories...', fakeCategories)

    await Category.bulkCreate(fakeCategories)
    console.log(
        `Created ${fakeCategories.length} fake categories for ${restaurantIds.length} restaurants.`
    )
}
