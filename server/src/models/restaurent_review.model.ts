import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

interface RestaurentReviewAttributes {
    id: string
    userId: string
    dishId: string
    restaurantId: string
    rating: number
    comment: string
}

export interface RestaurentReviewCreationAttributes
    extends Omit<RestaurentReviewAttributes, 'id'> {}

export interface RestaurentReviewInstance
    extends Model<
            RestaurentReviewAttributes,
            RestaurentReviewCreationAttributes
        >,
        RestaurentReviewAttributes {}

class RestaurentReview extends Model<
    InferAttributes<RestaurentReview>,
    InferCreationAttributes<RestaurentReview>
> {
    declare id: CreationOptional<string>
    declare userId: string
    // declare dishId: string
    declare restaurantId: string
    declare rating: number
    declare comment: string

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

RestaurentReview.init(
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
        tableName: 'restaurent_reviews',
        indexes: [
            {
                unique: true,
                fields: ['userId', 'restaurantId'],
            },
        ],
        timestamps: true,
    }
)

export default RestaurentReview
