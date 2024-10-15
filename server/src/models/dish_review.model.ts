import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

interface DishReviewAttributes {
    id: string
    userId: string
    dishId: string
    // restaurantId: string
    rating: number
    comment: string
    createdAt: Date
    updatedAt: Date
}

export interface DishReviewCreationAttributes
    extends Omit<DishReviewAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class DishReview extends Model<
    DishReviewAttributes,
    DishReviewCreationAttributes
> {
    declare id: CreationOptional<string>
    declare userId: string
    declare dishId: string
    // declare restaurantId: string
    declare rating: number
    declare comment: string

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

DishReview.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
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
        dishId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'dishes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        // restaurantId: {
        //     allowNull: false,
        //     type: DataTypes.UUID,
        // },
        rating: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [2, 255],
            },
        },

        // timestamps
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'dish_reviews',
        indexes: [
            {
                unique: true,
                fields: ['userId', 'dishId'],
            },
        ],
        timestamps: true,
    }
)

export default DishReview
