import { JSONSchemaType } from 'ajv'
import { OrderItemCreationAttributes } from '../models/order_item.model'

export const NewOrderItemSchema: JSONSchemaType<OrderItemCreationAttributes> = {
    type: 'object',
    properties: {
        basketId: {
            type: 'string',
        },
        orderId: {
            type: 'string',
        },
        dishId: {
            type: 'string',
        },
        amount: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
        },
    },
    required: ['basketId', 'orderId', 'dishId', 'amount'],
    additionalProperties: false,
}
