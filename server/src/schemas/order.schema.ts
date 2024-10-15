import { JSONSchemaType } from 'ajv'
import { OrderCreationAttributes } from '../models/order.model'

// export const NewOrderSchema: JSONSchemaType<OrderCreationAttributes> = {
//     type: 'object',
//     properties: {
//         userId: {
//             type: 'string',
//         },
//         restaurantId: {
//             type: 'string',
//         },
//         status: {
//             type: 'string',
//             enum: [
//                 'pending',
//                 'preparing',
//                 'out-for-delivery',
//                 'delivered',
//                 'canceled',
//                 'rejected',
//             ],
//         },
//     },
//     required: ['userId', 'restaurantId'],
// }
// export const NewOrderSchema: JSONSchemaType<Omit<OrderCreationAttributes, 'restaurantId'>> = {
export const NewOrderSchema: JSONSchemaType<{basketId: string, status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered' | 'canceled' | 'rejected'}> = {
    type: 'object',
    properties: {
        basketId: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
        },
        userId: {
            type: 'string',
        },
        status: {
            type: 'string',
            enum: [
                'pending',
                'preparing',
                'out-for-delivery',
                'delivered',
                'canceled',
                'rejected',
            ],
        },
    },
    required: ['basketId'],
    additionalProperties: false,
}

export const UpdateOrderSchema: JSONSchemaType<
    Omit<OrderCreationAttributes, 'userId' | 'restaurantId'>
> = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
            enum: [
                'pending',
                'preparing',
                'out-for-delivery',
                'delivered',
                'canceled',
                'rejected',
            ],
        },
    },
    required: ['status'],
    additionalProperties: false,
}
