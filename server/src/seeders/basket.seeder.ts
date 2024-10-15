import Basket from '../models/basket.model'
import Restaurant from '../models/restaurant.model'
import User from '../models/user.model'

async function getRestaurantIds() {
    const restaurants = await Restaurant.findAll({
        attributes: ['id'],
    })

    if (!restaurants.length) {
        throw new Error(
            'No restaurants found. Please create restaurant entries before seeding baskets.'
        )
    }

    return restaurants.map((restaurant) => restaurant.id)
}

async function getUsers() {
    const users = await User.findAll({
        attributes: ['id'],
    })

    if (!users.length) {
        throw new Error(
            'No users found. Please create user entries before seeding baskets.'
        )
    }

    return users.map((user) => user.id)
}

export default async function seedBaskets() {
    const restaurantIds = await getRestaurantIds()
    const users = await getUsers()

    const fakeBaskets = []

    for (const userId of users) {
        for (const restaurantId of restaurantIds) {
            fakeBaskets.push({
                restaurantId,
                userId,
            })
        }
    }

    console.log('Creating or updating fake baskets...')
    await Basket.bulkCreate(fakeBaskets, {
        updateOnDuplicate: ['updatedAt'],
    }).then(() => {
        console.log('Finished creating or updating fake baskets')
    })
}