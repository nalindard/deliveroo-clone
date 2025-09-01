import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

class RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
> {
    // declare id: CreationOptional<string>
    declare token: string
    declare userId: string

    // timestamps
    declare createdAt: CreationOptional<Date>
    declare expiresAt: CreationOptional<Date>
}

RefreshToken.init(
    {
        // id: {
        //     primaryKey: true,
        //     allowNull: false,
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        // },
        token: {
            type: DataTypes.STRING(512),
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        // timestamps
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        expiresAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: 'refresh_tokens',
        indexes: [
            {
                unique: true,
                fields: ['token'],
            },
        ],
        timestamps: true,
    }
)

export default RefreshToken
