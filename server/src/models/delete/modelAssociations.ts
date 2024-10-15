import User from '../user.model'
import Restaurant from '../restaurant.model'
import Basket from '../basket.model'
import Order from '../order.model'
import Review from './review.model'
import Category from '../category.model'
import Dish from '../dish.model'
import OrderItem from '../order_item.model'
import RefreshToken from '../refresh_token.model'


export function modelAssociations() {
    Restaurant.belongsTo(User, { foreignKey: 'ownerId' })
    User.hasMany(Restaurant, { foreignKey: 'ownerId' })

    RefreshToken.belongsTo(User, { foreignKey: 'userId' })
    User.hasMany(RefreshToken, { foreignKey: 'userId' })

    User.hasOne(Basket, { foreignKey: 'userId' })
    Basket.belongsTo(User, { foreignKey: 'userId' })

    Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' })
    Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' })

    User.hasMany(Order, { foreignKey: 'userId' })
    Order.belongsTo(User, { foreignKey: 'userId' })

    Restaurant.hasMany(Order, { foreignKey: 'restaurantId' })
    Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

    Basket.hasMany(OrderItem, { foreignKey: 'basketId' })
    OrderItem.belongsTo(Basket, { foreignKey: 'basketId' })

    Order.hasMany(OrderItem, { foreignKey: 'orderId' })
    OrderItem.belongsTo(Order, { foreignKey: 'orderId' })

    Review.belongsTo(User, { foreignKey: 'userId' })
    User.hasMany(Review, { foreignKey: 'userId' })

    Review.belongsTo(Dish, { foreignKey: 'dishId' })
    Dish.hasMany(Review, { foreignKey: 'dishId' })

    Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' })
    Restaurant.hasMany(Review, { foreignKey: 'restaurantId' })

    // Dish.belongsToMany(Category, {
    //     through: 'DishCategories',
    //     foreignKey: 'dishId',
    // })
    // Category.belongsToMany(Dish, {
    //     through: 'DishCategories',
    //     foreignKey: 'categoryId',
    // })


}
