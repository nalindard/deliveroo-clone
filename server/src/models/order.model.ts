import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

interface OrderAttributes {
    id: string
    userId: string
    restaurantId: string
    status:
        | 'pending'
        | 'preparing'
        | 'out-for-delivery'
        | 'delivered'
        | 'canceled'
        | 'rejected'
    totalValueInCents: number
}

export interface OrderCreationAttributes
    extends Omit<OrderAttributes, 'id'| 'totalValueInCents'> {}

export interface OrderInstance
    extends Model<OrderAttributes, OrderCreationAttributes>,
        OrderAttributes {}

class Order extends Model<
    InferAttributes<Order>,
    InferCreationAttributes<Order>
> {
    declare id: CreationOptional<string>
    declare userId: string
    declare restaurantId: string
    declare status:
        | 'pending'
        | 'preparing'
        | 'out-for-delivery'
        | 'delivered'
        | 'canceled'
        | 'rejected'
    declare totalValueInCents: number

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Order.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
        status: {
            allowNull: false,
            type: DataTypes.ENUM(
                'pending',
                'preparing',
                'out-for-delivery',
                'delivered',
                'canceled',
                'rejected'
            ),
            defaultValue: 'pending',
        },
        totalValueInCents: {
            allowNull: true,
            // defaultValue: 0,
            type: DataTypes.INTEGER.UNSIGNED,
        },

        // timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'orders',
        timestamps: true,
    }
)

export default Order
