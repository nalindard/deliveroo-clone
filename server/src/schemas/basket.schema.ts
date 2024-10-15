import { JSONSchemaType } from 'ajv'
import { BasketCreationAttributes } from '../models/basket.model'

interface NewBasket extends Omit<BasketCreationAttributes, 'id'> {}

export const newBasketSchema: JSONSchemaType<NewBasket> = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
        },
        restaurantId: {
            type: 'string',
        },
    },
    required: ['userId', 'restaurantId'],
    additionalProperties: false,
}
