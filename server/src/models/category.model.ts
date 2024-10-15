import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

interface CategoryAttributes {
    id: string
    name: string
    restaurantId: string
}

export interface CategoryCreationAttributes
    extends Omit<CategoryAttributes, 'id'> {}

export interface CategoryInstance extends Model<CategoryAttributes>, CategoryAttributes {}

class Category extends Model<
    InferAttributes<Category>,
    InferCreationAttributes<Category>
> {
    declare id: CreationOptional<string>
    declare name: string
    declare restaurantId: string
}

Category.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
    },
    {
        sequelize,
        tableName: 'categories',
        indexes: [
            {
                unique: true,
                fields: ['restaurantId', 'name'],
            },
        ],
        timestamps: true,
    }
)

export default Category
