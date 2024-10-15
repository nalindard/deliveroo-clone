import { JSONSchemaType } from 'ajv'
import { RestaurentReviewCreationAttributes } from '../models/restaurent_review.model'

export const NewRestaurentReviewSchema: JSONSchemaType<Omit<RestaurentReviewCreationAttributes, 'dishId' | 'restaurantId'>> =
    {
        type: 'object',
        properties: {
            userId: {
                type: 'string',
            },
            // dishId: {
            //     type: 'string',
            // },
            // restaurantId: {
            //     type: 'string',
            // },
            rating: {
                type: 'integer',
                minimum: 1,
                maximum: 5,
            },
            comment: {
                type: 'string',
                minLength: 3,
                maxLength: 128,
            },
        },
        required: ['userId', 'rating', 'comment'],
        additionalProperties: false,
    }
