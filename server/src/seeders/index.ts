import seedUsers from "./users.seeder";
import modelAssociations from '../models/modelAssociations'
import seedRestaurants from "./restaurant.seeder";
import seedDishes from "./dish.seeder";
import seedCategories from "./category.seeder";
import seedBaskets from "./basket.seeder";
import seedOrderItems from "./order_item.seeder";
import seedOrders from "./order.seeder";

export default (async function seedAll() {
    console.log('Seeding all...');
    modelAssociations()
    
    for (let i = 0; i < 5; i++) {
        await seedUsers(1_00);
    }


    await seedRestaurants(50);
    await seedCategories(10);
    await seedDishes(50);

    await seedBaskets()
    await seedOrderItems()
    await seedOrders()


})()

// import swaggerDocs from './utils/swagger.util'

// 1,000 users

// 50 restaurants
// 10 categories
// 5,000 dishes

// 50,000 baskets
// 10,000 order items
// 1,000 orders

// 5,000 restaurant reviews
// 5,000 dish reviews