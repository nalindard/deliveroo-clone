import { JSONSchemaType } from 'ajv'
import { DishReviewCreationAttributes } from '../models/dish_review.model'

interface NewDishReview extends DishReviewCreationAttributes {}

export const newDishReviewSchema: JSONSchemaType<NewDishReview> = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        dishId: { type: 'string' },
        rating: { type: 'integer' },
        comment: { type: 'string' },
    },
    required: ['userId', 'dishId', 'rating', 'comment'],
    additionalProperties: false,
}
