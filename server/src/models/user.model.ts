import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize'
import sequelize from '../../configs/sequelize.config'

interface UserAttributes {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    passwordHash: string | null
    passwordSalt: string | null
    isOAuthUser?: boolean
    oauthProvider?: string | null
    oauthId?: string | null
    role?: 'customer' | 'admin' | 'restaurant'
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface UserCreationAttributes
    extends Omit<UserAttributes, 'id' | 'emailVerified' | 'isOAuthUser' |  'oauthProvider' | 'oauthId'| 'role' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

    export interface UserRegisterAttributes extends Omit<UserCreationAttributes, 'passwordHash' | 'passwordSalt'>  { password: string }

export interface UserInterface extends UserAttributes {}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>
    declare name: string
    declare email: string
    declare emailVerified?: boolean
    declare passwordHash: string | null
    declare passwordSalt: string | null
    declare isOAuthUser?: boolean
    declare oauthProvider?: string | null
    declare oauthId?: string | null
    declare role: 'customer' | 'admin' | 'restaurant'

    // timestamps
    declare createdAt?: CreationOptional<Date>
    declare updatedAt?: CreationOptional<Date>
    declare deletedAt?: CreationOptional<Date>
}

User.init(
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
                notEmpty: true,
                len: [2, 255],
            },
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        passwordHash: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        passwordSalt: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        isOAuthUser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        oauthProvider: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        oauthId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM('customer', 'admin', 'restaurant'),
            allowNull: false,
            defaultValue: 'customer',
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['email'],
            },
        ],
        timestamps: true,
    }
)

export default User
