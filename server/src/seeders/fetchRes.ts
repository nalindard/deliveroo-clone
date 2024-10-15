import Restaurant from '../models/restaurant.model';
import Category from '../models/category.model';
import Dish from '../models/dish.model';

async function getRestaurantDetailsById(restaurantId: string) {
    try {
        const restaurant = await Restaurant.findOne({
            where: { id: restaurantId },
            include: [
                {
                    model: Category,
                    include: [
                        {
                            model: Dish,
                        },
                    ],
                },
            ],
        });

        if (!restaurant) {
            throw new Error('Restaurant not found');
        }

        // Group dishes by categories
        const categoriesWithDishes = restaurant.categories.map(category => {
            return {
                categoryId: category.id,
                categoryName: category.name,
                dishes: category.dishes,
            };
        });

        return {
            restaurantId: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
            city: restaurant.city,
            area: restaurant.area,
            phone: restaurant.phone,
            categories: categoriesWithDishes,
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve restaurant details');
    }
}


// Usage,

async function main() {
    const restaurantId = 'some-restaurant-id';
    
    try {
        const restaurantDetails = await getRestaurantDetailsById(restaurantId);
        console.log(JSON.stringify(restaurantDetails, null, 2));
    } catch (error) {
        console.error(error.message);
    }
}

main();
