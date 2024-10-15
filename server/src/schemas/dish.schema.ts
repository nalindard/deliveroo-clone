import { JSONSchemaType } from 'ajv'
import { DishCreationAttributes } from '../models/dish.model'

export const NewDishSchema: JSONSchemaType<DishCreationAttributes> = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        restaurantId: {
            type: 'string',
        },
        priceInCents: {
            type: 'integer',
        },
        calories: {
            type: 'integer',
        },
        description: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        image: {
            type: 'string',
        },
        isAvaliable: {
            type: 'boolean',
        },
        highlight: {
            type: 'string',
            minLength: 3,
            maxLength: 20,
        },
        ingradients: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
    },
    required: [
        'name',
        'restaurantId',
        'priceInCents',
        'calories',
        'description',
        'image',
        'isAvaliable',
        'highlight',
        'ingradients',
    ],
}
