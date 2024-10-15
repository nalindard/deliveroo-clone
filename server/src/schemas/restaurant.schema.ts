import { Optional } from 'sequelize'
import { RestaurantCreationAttributes } from './../models/restaurant.model'
import { JSONSchemaType } from 'ajv'

// RestaurantCreationAttributes

interface NewRestaurant extends Omit<RestaurantCreationAttributes, 'id'> {}

export const NewRestaurantSchema: JSONSchemaType<NewRestaurant> = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        ownerId: {
            type: 'string',
        },
        city: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        area: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
        opensAt: {
            type: 'string',
            minLength: 4,
            maxLength: 5,
        },
        closesAt: {
            type: 'string',
            minLength: 4,
            maxLength: 5,
        },
        isActive: {
            type: 'boolean',
            enum: [true, false],
        },
        phone: {
            type: 'string',
            minLength: 10,
            maxLength: 10,
        },
        note: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        titleTags: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        subTitleTags: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        locationCordinates: {
            type: 'string',
        },
        minimumInCents: {
            type: 'integer',
            minimum: 0,
            maximum: 10000,
        },
        deliveryFeesInCents: {
            type: 'integer',
            minimum: 0,
            maximum: 10000,
        },
    },
    required: [
        'name',
        'ownerId',
        'city',
        'area',
        'address',
        'opensAt',
        'closesAt',
        'isActive',
        'phone',
        'note',
        'image',
        'titleTags',
        'subTitleTags',
        'locationCordinates',
        'minimumInCents',
        'deliveryFeesInCents',
    ],
    additionalProperties: false,
}

interface UpdateRestaurant
    extends Omit<
        Optional<
            RestaurantCreationAttributes,
            | 'name'
            | 'ownerId'
            | 'city'
            | 'area'
            | 'address'
            | 'opensAt'
            | 'closesAt'
            | 'isActive'
            | 'phone'
            | 'note'
            | 'image'
            | 'titleTags'
            | 'subTitleTags'
            | 'locationCordinates'
            | 'minimumInCents'
            | 'deliveryFeesInCents'
        >,
        'ownerId'
    > {
    id: string
}

export const UpdateRestaurantSchema: JSONSchemaType<UpdateRestaurant> = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
            nullable: true,
        },
        // ownerId: {
        //     type: 'string',
        // },
        city: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
            nullable: true,
        },
        area: {
            type: 'string',
            nullable: true,
        },
        address: {
            type: 'string',
            nullable: true,
        },
        opensAt: {
            type: 'string',
            minLength: 4,
            maxLength: 5,
            nullable: true,
        },
        closesAt: {
            type: 'string',
            minLength: 4,
            maxLength: 5,
            nullable: true,
        },
        isActive: {
            type: 'boolean',
            enum: [true, false],
            nullable: true,
        },
        phone: {
            type: 'string',
            minLength: 10,
            maxLength: 10,
            nullable: true,
        },
        note: {
            type: 'string',
            nullable: true,
        },
        image: {
            type: 'string',
            nullable: true,
        },
        titleTags: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
            nullable: true,
        },
        subTitleTags: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
            nullable: true,
        },
        locationCordinates: {
            type: 'string',
            nullable: true,
        },
        minimumInCents: {
            type: 'integer',
            minimum: 0,
            maximum: 10000,
            nullable: true,
        },
        deliveryFeesInCents: {
            type: 'integer',
            minimum: 0,
            maximum: 10000,
            nullable: true,
        },
    },
    required: ['id'],
    additionalProperties: false,
}
