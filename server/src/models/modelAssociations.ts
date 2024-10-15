import User from './user.model'
import Restaurant from './restaurant.model'
import Basket from './basket.model'
import Order from './order.model'
// import Review from './review.model'
import Category from './category.model'
import Dish from './dish.model'
import OrderItem from './order_item.model'
import RefreshToken from './refresh_token.model'
import RestaurentReview from './restaurent_review.model'
import DishReview from './dish_review.model'

export default function modelAssociations() {
    User.hasMany(Restaurant, { foreignKey: 'ownerId' })
    Restaurant.belongsTo(User, { foreignKey: 'ownerId' })

    User.hasMany(RefreshToken, { foreignKey: 'userId' })
    RefreshToken.belongsTo(User, { foreignKey: 'userId' })

    // User.hasOne(Basket, { foreignKey: 'userId' })
    User.hasMany(Basket, { foreignKey: 'userId' })
    Basket.belongsTo(User, { foreignKey: 'userId' })
    // User.hasOne(Basket, { foreignKey: 'id' })
    // Basket.belongsTo(User, { foreignKey: 'id' })

    Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' })
    Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

    User.hasMany(RestaurentReview, { foreignKey: 'userId' })
    RestaurentReview.belongsTo(User, { foreignKey: 'userId' })

    User.hasMany(DishReview, { foreignKey: 'userId' })
    DishReview.belongsTo(User, { foreignKey: 'userId' })

    User.hasMany(Order, { foreignKey: 'userId' })
    Order.belongsTo(User, { foreignKey: 'userId' })

    Restaurant.hasMany(RestaurentReview, { foreignKey: 'restaurantId' })
    RestaurentReview.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

    Restaurant.hasMany(Basket, { foreignKey: 'restaurantId' })
    Basket.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

    Dish.hasMany(DishReview, { foreignKey: 'dishId' })
    DishReview.belongsTo(Dish, { foreignKey: 'dishId' })

    Dish.belongsToMany(Category, {
        through: 'DishCategories',
        foreignKey: 'dishId',
    })
    Category.belongsToMany(Dish, {
        through: 'DishCategories',
        foreignKey: 'categoryId',
    })

    Category.belongsTo(Restaurant, {
        foreignKey: 'restaurantId',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
    })

    // Restaurant has many Categories
    Restaurant.hasMany(Category, {
        foreignKey: 'restaurantId',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
    })

    Order.hasMany(OrderItem, { foreignKey: 'orderId' })
    OrderItem.belongsTo(Order, { foreignKey: 'orderId' })

    Basket.hasMany(OrderItem, { foreignKey: 'basketId' })
    OrderItem.belongsTo(Basket, { foreignKey: 'basketId' })

    Restaurant.hasMany(Order, { foreignKey: 'restaurantId' })
    Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

    // In OrderItem model
    OrderItem.belongsTo(Dish, { foreignKey: 'dishId' })
    Dish.hasMany(OrderItem, { foreignKey: 'dishId' })

    // In Basket model
    Basket.hasMany(OrderItem, { foreignKey: 'basketId' })
    OrderItem.belongsTo(Basket, { foreignKey: 'basketId' })

    // User.hasMany(Order, { foreignKey: 'userId' })
    // Order.belongsTo(User, { foreignKey: 'userId' })

    // Restaurant.hasMany(Order, { foreignKey: 'restaurantId' })
    // Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' })

    // Basket.hasMany(OrderItem, { foreignKey: 'basketId' })
    // OrderItem.belongsTo(Basket, { foreignKey: 'basketId' })

    // Order.hasMany(OrderItem, { foreignKey: 'orderId' })
    // OrderItem.belongsTo(Order, { foreignKey: 'orderId' })

    // Review.belongsTo(User, { foreignKey: 'userId' })
    // User.hasMany(Review, { foreignKey: 'userId' })

    // Review.belongsTo(Dish, { foreignKey: 'dishId' })
    // Dish.hasMany(Review, { foreignKey: 'dishId' })

    // Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' })
    // Restaurant.hasMany(Review, { foreignKey: 'restaurantId' })

    // Dish.belongsToMany(Category, {
    //     through: 'DishCategories',
    //     foreignKey: 'dishId',
    // })
    // Category.belongsToMany(Dish, {
    //     through: 'DishCategories',
    //     foreignKey: 'categoryId',
    // })
}
