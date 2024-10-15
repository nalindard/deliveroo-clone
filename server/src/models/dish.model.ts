import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'
import Category from './category.model'

interface DishAttributes {
    id?: string
    name: string
    restaurantId: string
    priceInCents: number
    // categoryId: string
    calories: number
    description: string
    image: string
    isAvaliable: boolean
    highlight: string | null
    ingradients: string | null
}

export interface DishCreationAttributes
    extends Omit<DishAttributes, 'id'> {}

export interface DishInstance
    extends Model<InferAttributes<Dish>, InferCreationAttributes<Dish>>,
        DishAttributes {
    setCategories: (categories: string[]) => Promise<void>;
    addCategory: (category: string | string[]) => Promise<void>;
    removeCategory: (category: string | string[]) => Promise<void>;
    getCategories: () => Promise<Category[]>;
}

class Dish extends Model<InferAttributes<Dish>, InferCreationAttributes<Dish>> {
    declare id: CreationOptional<string>
    declare name: string
    declare restaurantId: string
    declare priceInCents: number
    // declare categoryId: string
    declare calories: number
    declare description: string
    declare image: string
    declare isAvaliable: boolean
    declare highlight: string | null
    declare ingradients: string | null

    // Methods for many-to-many association
    // setCategories: (categories: string[]) => Promise<void>;
    // addCategory: (category: string | string[]) => Promise<void>;
    // removeCategory: (category: string | string[]) => Promise<void>;
    // getCategories: () => Promise<Category[]>;

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Dish.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(255),
            validate: {
                len: [3, 255],
            },
        },
        restaurantId: {
            allowNull: false,
            // type: DataTypes.UUID,
            type: DataTypes.STRING(255),
            references: {
                model: 'restaurants',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        // categoryId: {
        //     allowNull: false,
        //     type: DataTypes.UUID,
        //     references: {
        //         model: 'categories',
        //         key: 'id',
        //     },
        //     onUpdate: 'CASCADE',
        //     onDelete: 'CASCADE',
        // },
        priceInCents: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        calories: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT('medium'),
        },
        highlight: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: [3, 25],
            },
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isAvaliable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        ingradients: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        // timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'dishes',
        indexes: [
            {
                unique: true,
                fields: ['restaurantId', 'name'], // Ensure dish names are unique per restaurant
            },
        ],
        timestamps: true,
    }
)

export default Dish
