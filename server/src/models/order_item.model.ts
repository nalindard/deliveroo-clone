import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
    Op,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'
// import { Op } from 'sequelize'


interface OrderItemAttributes {
    id: string
    basketId: string | null
    orderId: string | null
    dishId: string
    amount: number
}

export interface OrderItemCreationAttributes
    extends Omit<OrderItemAttributes, 'id'> {}

export interface OrderItemInstance
    extends Model<
        InferAttributes<OrderItem>,
        InferCreationAttributes<OrderItem>
    >,
        OrderItemAttributes {
    createdAt: CreationOptional<Date>
    updatedAt: CreationOptional<Date>
}

class OrderItem extends Model<
    InferAttributes<OrderItem>,
    InferCreationAttributes<OrderItem>
> {
    [x: string]: any
    declare id: CreationOptional<string>
    declare basketId: string | null
    declare orderId: string | null
    declare dishId: string
    declare amount: number

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

OrderItem.init(
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        basketId: {
            type: DataTypes.UUID,
            allowNull: true, // Allow null because it can be either a basket or an order
            references: {
                model: 'baskets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        orderId: {
            type: DataTypes.UUID,
            allowNull: true, // Allow null because it can be either a basket or an order
            references: {
                model: 'orders',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        dishId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'dishes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        // timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'order_items',
        indexes: [
            {
                unique: true,
                fields: ['basketId', 'dishId'],
                where: {
                    basketId: {
                        [Op.ne]: null, // applies only when basketId is not null
                    },
                },
            },
            {
                unique: true,
                fields: ['orderId', 'dishId'],
                where: {
                    orderId: {
                        [Op.ne]: null, // applies only when orderId is not null
                    },
                },
            },
        ],
        timestamps: true
    }
)

export default OrderItem
