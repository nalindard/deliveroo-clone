// import Order from '../models/order.model';
// import User from '../models/user.model';
// import Restaurant from '../models/restaurant.model';
// import OrderItem from '../models/order_item.model';
// import Basket from '../models/basket.model';

// async function getUsers(): Promise<string[]> {
//     const users = await User.findAll({
//         attributes: ['id'],
//     });

//     if (!users.length) {
//         throw new Error('No users found. Please seed users before seeding orders.');
//     }

//     return users.map((user) => user.id);
// }

// async function getRestaurants(): Promise<string[]> {
//     const restaurants = await Restaurant.findAll({
//         attributes: ['id'],
//     });

//     if (!restaurants.length) {
//         throw new Error('No restaurants found. Please seed restaurants before seeding orders.');
//     }

//     return restaurants.map((restaurant) => restaurant.id);
// }

// function getRandomStatus(): Order['status'] {
//     const statuses: Order['status'][] = ['pending', 'preparing', 'out-for-delivery', 'delivered', 'canceled', 'rejected'];
//     return statuses[Math.floor(Math.random() * statuses.length)];
// }

// function getRandomTotalValue(): number {
//     return Math.floor(Math.random() * 10000) + 1000; // Random value between 1000 and 11000 cents
// }

// export default async function seedOrders(): Promise<void> {
//     try {
//         const userIds = await getUsers();
//         const restaurantIds = await getRestaurants();

//         const orders: Partial<Order>[] = [];

//         // Create 50 random orders
//         for (let i = 0; i < 50; i++) {
//             orders.push({
//                 userId: userIds[Math.floor(Math.random() * userIds.length)],
//                 restaurantId: restaurantIds[Math.floor(Math.random() * restaurantIds.length)],
//                 status: getRandomStatus(),
//                 totalValueInCents: getRandomTotalValue(),
//             });
//         }

//         console.log(`Creating ${orders.length} orders...`);

//         const createdOrders = await Order.bulkCreate(orders);

//         console.log('Finished creating orders.');

//         // Now, let's associate some order items with these new orders
//         console.log('Associating order items with new orders...');

//         for (const order of createdOrders) {
//             // Find a basket for this user and restaurant
//             const basket = await Basket.findOne({
//                 where: {
//                     userId: order.userId,
//                     restaurantId: order.restaurantId,
//                 },
//             });

//             if (basket) {
//                 // Get order items associated with this basket
//                 const basketItems = await OrderItem.findAll({
//                     where: {
//                         basketId: basket.id,
//                     },
//                 });

//                 // Randomly select some items to associate with the order
//                 const itemsToAssociate = basketItems.slice(0, Math.floor(Math.random() * basketItems.length) + 1);

//                 // Update these items with the new orderId
//                 await Promise.all(itemsToAssociate.map(item =>
//                     item.update({
//                         orderId: order.id,
//                         basketId: null,
//                     })
//                 ));
//             }
//         }

//         console.log('Finished associating order items with new orders.');

//     } catch (error) {
//         console.error('Error seeding orders:', error);
//     }
// }

import { Op } from 'sequelize';
import Order from '../models/order.model';
import User from '../models/user.model';
import Restaurant from '../models/restaurant.model';
import OrderItem from '../models/order_item.model';
import Basket from '../models/basket.model';
import Dish from '../models/dish.model';

async function getUsers(): Promise<string[]> {
    const users = await User.findAll({
        attributes: ['id'],
    });

    if (!users.length) {
        throw new Error('No users found. Please seed users before seeding orders.');
    }

    return users.map((user) => user.id);
}

async function getRestaurants(): Promise<string[]> {
    const restaurants = await Restaurant.findAll({
        attributes: ['id'],
    });

    if (!restaurants.length) {
        throw new Error('No restaurants found. Please seed restaurants before seeding orders.');
    }

    return restaurants.map((restaurant) => restaurant.id);
}

function getRandomStatus(): Order['status'] {
    const statuses: Order['status'][] = ['pending', 'preparing', 'out-for-delivery', 'delivered', 'canceled', 'rejected'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

async function calculateOrderTotal(orderItems: OrderItem[]): Promise<number> {
    let total = 0;
    for (const item of orderItems) {
        const dish = await Dish.findByPk(item.dishId);
        if (dish) {
            total += dish.priceInCents * item.amount;
        }
    }
    return total;
}

export default async function seedOrders(): Promise<void> {
    try {
        const userIds = await getUsers();
        const restaurantIds = await getRestaurants();

        const orders: Partial<Order>[] = [];

        // Create 50 random orders
        for (let i = 0; i < 50; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)];
            const restaurantId = restaurantIds[Math.floor(Math.random() * restaurantIds.length)];

            // Find a basket for this user and restaurant
            const basket = await Basket.findOne({
                where: {
                    userId: userId,
                    restaurantId: restaurantId,
                },
            });

            if (basket) {
                // Get order items associated with this basket
                const basketItems = await OrderItem.findAll({
                    where: {
                        basketId: basket.id,
                    },
                });

                // Randomly select some items to associate with the order
                const itemsToAssociate = basketItems.slice(0, Math.floor(Math.random() * basketItems.length) + 1);

                // Calculate the total value based on the selected items
                const totalValueInCents = await calculateOrderTotal(itemsToAssociate);

                orders.push({
                    userId: userId,
                    restaurantId: restaurantId,
                    status: getRandomStatus(),
                    totalValueInCents: totalValueInCents,
                });
            }
        }

        console.log(`Creating ${orders.length} orders...`);

        const createdOrders = await Order.bulkCreate(orders);

        console.log('Finished creating orders.');

        // Now, let's associate order items with these new orders
        console.log('Associating order items with new orders...');

        for (const order of createdOrders) {
            const basket = await Basket.findOne({
                where: {
                    userId: order.userId,
                    restaurantId: order.restaurantId,
                },
            });

            if (basket) {
                const basketItems = await OrderItem.findAll({
                    where: {
                        basketId: basket.id,
                    },
                });

                const itemsToAssociate = basketItems.slice(0, Math.floor(Math.random() * basketItems.length) + 1);

                await Promise.all(itemsToAssociate.map(item =>
                    item.update({
                        orderId: order.id,
                        basketId: null,
                    })
                ));
            }
        }

        console.log('Finished associating order items with new orders.');

    } catch (error) {
        console.error('Error seeding orders:', error);
    }
}