import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Optional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

interface BasketAttributes {
    id: string
    userId: string
    restaurantId: string
}

export interface BasketCreationAttributes
    extends Optional<BasketAttributes, 'id'> {}

export interface BasketInstance
    extends Model<BasketAttributes, BasketCreationAttributes>,
        BasketAttributes {}

class Basket extends Model<
    InferAttributes<Basket>,
    InferCreationAttributes<Basket>
> {
    [x: string]: any
    declare id: CreationOptional<string>
    declare userId: string
    declare restaurantId: string

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Basket.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            // references: {
            //     model: 'users',
            //     key: 'id',
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE',
        },
        restaurantId: {
            allowNull: false,
            type: DataTypes.STRING(255),
            references: {
                model: 'restaurants',
                key: 'id',
            },
            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE',
        },

        // timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'baskets',
        // indexes: [{ unique: true, fields: ['id','userId'] }],
        indexes: [
            // {
            //     unique: true,
            //     fields: ['id', 'userId'],
            // },
            {
                unique: true,
                fields: ['userId', 'restaurantId'],
            },
        ],
        timestamps: true,
    }
)

export default Basket
