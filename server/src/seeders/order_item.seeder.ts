import OrderItem from '../models/order_item.model';
import Basket from '../models/basket.model';
import Dish from '../models/dish.model';

async function getBasketIds() {
    const baskets = await Basket.findAll({
        attributes: ['id'],
    });

    if (!baskets.length) {
        throw new Error('No baskets found. Please seed baskets before seeding order items.');
    }

    return baskets.map((basket) => basket.id);
}

async function getDishIds() {
    const dishes = await Dish.findAll({
        attributes: ['id'],
    });

    if (!dishes.length) {
        throw new Error('No dishes found. Please seed dishes before seeding order items.');
    }

    return dishes.map((dish) => dish.id);
}

function getRandomAmount() {
    return Math.floor(Math.random() * 5) + 1; // Random amount between 1 and 5
}

function getRandomSubset(array: [], maxSize: number) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * maxSize) + 1);
}

export default async function seedOrderItems() {
    try {
        const basketIds = await getBasketIds();
        const dishIds = await getDishIds();

        const orderItems = [];

        for (const basketId of basketIds) {
            const numberOfItems = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
            const selectedDishes = getRandomSubset(dishIds as [] , numberOfItems);

            for (const dishId of selectedDishes) {
                orderItems.push({
                    basketId,
                    dishId,
                    amount: getRandomAmount(),
                });
            }
        }

        console.log(`Creating ${orderItems.length} order items...`);

        await OrderItem.bulkCreate(orderItems, {
            updateOnDuplicate: ['amount', 'updatedAt'],
        });

        console.log('Finished creating order items.');
    } catch (error) {
        console.error('Error seeding order items:', error);
    }
}