import { UserCreationAttributes } from './../models/user.model'
import { JSONSchemaType } from 'ajv'

interface User
    extends Omit<UserCreationAttributes, 'passwordHash' | 'passwordSalt'> {
    password: string
}

export const NewUserShema: JSONSchemaType<User> = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
        email: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
            // format: 'email',
        },
        password: {
            type: 'string',
            minLength: 3,
            maxLength: 128,
        },
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false,
}

// export default NewUserShema

interface OAuthUser {
    access_token: string
    expires_in: number
    scope: string
    token_type: string
}


export const NewOAuthUserSchema: JSONSchemaType<OAuthUser> = {
    type: 'object',
    properties: {
        access_token: {
            type: 'string',
        },
        expires_in: {
            type: 'number',
        },
        scope: {
            type: 'string',
        },
        token_type: {
            type: 'string',
        },
    },
    required: ['access_token', 'expires_in', 'scope', 'token_type'],
    additionalProperties: false,
}