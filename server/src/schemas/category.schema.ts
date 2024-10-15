import { JSONSchemaType } from 'ajv'
import { CategoryCreationAttributes } from '../models/category.model'

interface NewCategory extends CategoryCreationAttributes {}

export const NewCategorySchema: JSONSchemaType<NewCategory> = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        restaurantId: { type: 'string' },
    },
    required: ['name', 'restaurantId'],
    additionalProperties: false,
}
