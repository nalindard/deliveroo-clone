import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import sequelize from '../../../configs/sequelize.config'

// interface ReviewAttributes {
//     id: number
//     userId: number
//     dishId: number
//     restaurantId: number
//     rating: number
//     comment: string
// }

class Review extends Model<
    InferAttributes<Review>,
    InferCreationAttributes<Review>
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

Review.init(
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
        },
        dishId: {
            allowNull: false,
            type: DataTypes.UUID,
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
                len: [2, 256],
            },
        },

        // timestamps
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'reviews',
    }
)

export default Review