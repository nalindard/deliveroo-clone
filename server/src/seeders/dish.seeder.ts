import { faker } from '@faker-js/faker';
import Dish, { DishCreationAttributes } from '../models/dish.model';
import Restaurant from '../models/restaurant.model';
import Category from '../models/category.model';

async function getRestaurantIds(): Promise<string[]> {
    const restaurants = await Restaurant.findAll({
        attributes: ['id'],
    });
    return restaurants.map((restaurant) => restaurant.id);
}

async function getCategoriesByRestaurant(restaurantId: string): Promise<string[]> {
    const categories = await Category.findAll({
        where: { restaurantId: restaurantId },
        attributes: ['id'],
    });
    return categories.map((category) => category.id);
}

export default async function seedDishes(amountPerRestaurant: number = 5) {
    if (amountPerRestaurant <= 0 || amountPerRestaurant > 100) throw new Error('Invalid amount');

    const restaurantIds = await getRestaurantIds();

    if (restaurantIds.length === 0) {
        console.error(
            'No restaurants found. Please create restaurant entries before seeding dishes.'
        );
        return;
    }

    const fakeDishes: DishCreationAttributes[] = [];

    for (const restaurantId of restaurantIds) {
        const categoryIds = await getCategoriesByRestaurant(restaurantId);

        // If there are less than 3 categories, skip creating dishes for this restaurant
        if (categoryIds.length < 3) {
            console.warn(`Not enough categories for restaurant ID ${restaurantId}. Required: 3, Found: ${categoryIds.length}`);
            continue; // Skip this restaurant
        }

        const dishNamesSet = new Set(); // Track dish names for this restaurant

        for (let i = 0; i < amountPerRestaurant; i++) {
            let dishName;
            // Ensure unique dish names
            do {
                dishName = faker.food.dish();
            } while (dishNamesSet.has(dishName)); // Keep generating until we find a unique name

            dishNamesSet.add(dishName); // Add the new dish name to the set

            const dish = {
                name: dishName,
                restaurantId: restaurantId,
                priceInCents: faker.number.int({ min: 100, max: 1000 }),
                calories: faker.number.int({ min: 100, max: 1000 }),
                description: faker.lorem.sentence({ min: 3, max: 10 }),
                // image: faker.internet.url(),
                image: getRandomImageUrl(),
                isAvaliable: faker.datatype.boolean(),
                highlight: faker.lorem.words(2),
                ingradients: `${faker.food.ingredient()},${faker.food.ingredient()},${faker.food.ingredient()},${faker.food.ingredient()},${faker.food.ingredient()}`,
            };

            fakeDishes.push(dish);
        }
    }

    console.log('Creating fake dishes...', fakeDishes);

    const createdDishes = await Dish.bulkCreate(fakeDishes);

    // Associate each dish with 3 random categories
    for (const dish of createdDishes) {
        const categoryIds = await getCategoriesByRestaurant(dish.restaurantId);
        const randomCategoryIds = faker.helpers.shuffle(categoryIds).slice(0, 3); // Get 3 random categories
        // @ts-expect-error the user property exist here allways
        await dish.setCategories(randomCategoryIds); // Assuming you have a method to add categories
    }

    console.log('Created fake dishes and associated categories.');
}

interface FoodImages {
    [key: string]: number;
}

const foodImages: FoodImages = {
    biryani: 81,
    'butter-chicken': 22,
    dosa: 83,
    pasta: 34,
    rice: 35,
    burger: 87,
    dessert: 36,
    idly: 77,
    pizza: 95,
    samosa: 22,
};

function getRandomImageUrl(): string {
    const foodNames = Object.keys(foodImages);
    const randomFood = foodNames[Math.floor(Math.random() * foodNames.length)];
    const imageCount = foodImages[randomFood];
    const randomIndex = Math.floor(Math.random() * imageCount) + 1;
    const imageUrl = `https://foodish-api.com/images/${randomFood}/${randomFood}${randomIndex}.jpg`;
    return imageUrl;
}