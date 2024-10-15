import { CreationOptional } from './../../node_modules/sequelize/types/model.d'
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

// Utility to convert name to a slug
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}

interface RestaurantAttributes {
    id?: string
    name: string
    ownerId: string
    city: string
    area: string
    address: string
    opensAt: string
    closesAt: string
    isActive: boolean
    phone: string
    note: string
    image: string
    titleTags: string
    subTitleTags: string
    locationCordinates: string
    minimumInCents: number
    deliveryFeesInCents: number
    createdAt?: Date
    updatedAt?: Date
}

// This interface is for creating new Restaurants, making all attributes optional
export interface RestaurantCreationAttributes
    extends Omit<RestaurantAttributes, 'createdAt' | 'updatedAt'> {}

// If you need an interface for Restaurant instances (including Sequelize model methods)
export interface RestaurantInstance extends Model<RestaurantAttributes>, RestaurantAttributes {}

class Restaurant extends Model<InferAttributes<Restaurant>, InferCreationAttributes<Restaurant>> {
    declare id: CreationOptional<string>
    declare name: string
    declare ownerId: string
    declare city: string
    declare area: string
    declare address: string
    declare opensAt: string
    declare closesAt: string
    declare isActive: boolean
    declare phone: string
    declare note: string
    declare image: string
    declare titleTags: string
    declare subTitleTags: string
    declare locationCordinates: string
    declare minimumInCents: number
    declare deliveryFeesInCents: number

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Restaurant.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.STRING(255),
            validate: {
                notEmpty: true,
                len: [5, 255],
            },
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [3, 255],
            },
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        opensAt: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        closesAt: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        titleTags: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        subTitleTags: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        locationCordinates: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        minimumInCents: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deliveryFeesInCents: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'restaurants',
        timestamps: true,
        hooks: {

            // Hook to automatically generate the 'id' before creating the restaurant
            beforeBulkCreate: (restaurants) => {
                restaurants.forEach((restaurant) => {
                    // Ensure both name and area are defined
                    if (!restaurant.name || !restaurant.area) {
                        throw new Error("Restaurant name and area must be provided to generate 'id'");
                    }
            
                    // Generate the id using slugify
                    const generatedId = `${slugify(restaurant.name)}-${slugify(restaurant.area)}`;
            
                    // Log the generated ID
                    console.log('Generated ID:', generatedId);
            
                    // If generatedId is empty, throw an error
                    if (!generatedId) {
                        throw new Error("Failed to generate 'id' for the restaurant");
                    }
            
                    // Assign the generatedId to the id field
                    restaurant.id = generatedId;
                });
            },
            beforeCreate: (restaurant) => {
                if (!restaurant.id) {
                    const generatedId = `${slugify(restaurant.name)}-${slugify(restaurant.area)}`;
                    if (!generatedId) {
                        throw new Error('Failed to generate ID: name or area is missing.');
                    }
                    console.log('Generated ID:', generatedId); // Log the generated id
                    restaurant.id = generatedId;
                }
            },
            // Hook to automatically update the 'id' when updating the name or area
            beforeUpdate: (restaurant) => {
                if (restaurant.changed('name') || restaurant.changed('area')) {
                    const generatedId = `${slugify(restaurant.name)}-${slugify(restaurant.area)}`;
                    if (!generatedId) {
                        throw new Error('Failed to generate ID: name or area is missing.');
                    }
                    console.log('Updated ID:', generatedId); // Log the updated id
                    restaurant.id = generatedId;
                }
            },
        },
    }
)

export default Restaurant
