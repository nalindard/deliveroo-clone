// All Schemas imported here, for easy access, and to avoid circular dependencies,
import * as BasketSchemas from './basket.schema'
import * as CategorySchemas from './category.schema'
import * as DishSchemas from './dish.schema'
import * as DishReviewSchemas from './dish_review.schema'
import * as OrderSchemas from './order.schema'
import * as OrderItemSchemas from './order_item.schema'
import * as RestaurentSchemas from './restaurant.schema'
import * as RestaurentReviewSchemas from './restaurent_review.schema'
import * as UserSchemas from './user.schema'

const ValidationSchemas = {
    ...BasketSchemas,
    ...CategorySchemas,
    ...DishSchemas,
    ...DishReviewSchemas,
    ...OrderSchemas,
    ...OrderItemSchemas,
    ...RestaurentSchemas,
    ...RestaurentReviewSchemas,
    ...UserSchemas,
}

export default ValidationSchemas
