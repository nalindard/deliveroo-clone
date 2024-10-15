import AuthService from '../../services/auth.service'
import User from '../../models/user.model'
import RefreshToken from '../../models/refresh_token.model'
import * as tokenUtil from '../../utils/tokens.util'
import * as hashUtil from '../../utils/hash.util'

jest.mock('../../utils/hash.util', () => ({
    hashPassword: jest.fn((password) => {
        return {
            passwordHash: `hashed-password-${password}`,
            passwordSalt: `salt-password-${password}`,
        }
    }),
}))

jest.mock('../../models/user.model', () => ({
    create: jest.fn(() => ({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        role: 'customer',
    })),
}))

jest.mock('../../utils/tokens.util', () => ({
    // createToken: jest.fn(({id, email, role}, time) => 'mock-token'),
    createToken: jest.fn(({id, email, role}, time) => `mock-token-${id}-${email}-${role}-${time}`),
}))

jest.mock('../../models/user.model.ts', () => ({
    create: jest.fn(({email, name, passwordHash, passwordSalt}) => ({
        id: '1',
        email: email,
        name: name,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        role: 'customer',
    })),
}))

jest.mock('../../models/refresh_token.model.ts', () => ({
    create: jest.fn(() => ({
        id: '1',
        userId: '1',
        refreshToken: 'mock-token',
    })),
}))

jest.mock('../../models/refresh_token.model.ts', () => ({
    create: jest.fn(({token, userId, expiresAt}) => ({
        id: '1',
        userId: '1',
        refreshToken: 'mock-token',
    })),
}))

describe('AuthService', () => {
    let authService: AuthService
    beforeEach(async () => {
        authService = await new AuthService()
        jest.clearAllMocks()
    })

    describe('registerUserByPassword', () => {
        it('should register a new user successfully', async () => {
            const result = await authService.registerUserByPassword({
                email: 'test@example.com',
                name: 'Test User',
                password: 'password123',
            })

            expect(hashUtil.hashPassword).toHaveBeenCalled()
            expect(hashUtil.hashPassword).toHaveBeenCalledWith('password123')
            expect(hashUtil.hashPassword).toHaveBeenCalledTimes(1)
            expect(hashUtil.hashPassword).toHaveReturnedWith({
                passwordHash: 'hashed-password-password123',
                passwordSalt: 'salt-password-password123',
            })
            expect(User.create).toHaveBeenCalled()
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(User.create).toHaveBeenCalledWith({
                email: 'test@example.com',
                name: 'Test User',
                // password: 'hashed-password-password123',
                // role: 'customer',
                passwordHash: 'hashed-password-password123',
                passwordSalt: 'salt-password-password123',
                isOAuthUser: false,
                role: 'customer',
                emailVerified: false,
            })

            expect(tokenUtil.createToken).toHaveBeenCalled()
            expect(tokenUtil.createToken).toHaveBeenCalledTimes(2)
            expect(tokenUtil.createToken).toHaveBeenCalledWith({
                id: '1',
                email: 'test@example.com',
                role: 'customer',
            }, '30d')

            expect(RefreshToken.create).toHaveBeenCalled()
            expect(RefreshToken.create).toHaveBeenCalledTimes(1)
            expect(RefreshToken.create).toHaveBeenCalledWith({
                token: 'mock-token-1-test@example.com-customer-30d',
                userId: '1',
                expiresAt: expect.any(Date),
            })

            expect(result.success).toBe(true)
        })

        it('should throw an error if user already exists', async () => {
            jest.spyOn(User, 'create').mockImplementationOnce(() =>
                Promise.reject('User already exists')
            )

            const result = await authService.registerUserByPassword({
                email: 'test@example.com',
                name: 'Test User',
                password: 'password123',
            })

            expect(result.success).toBe(false)
        })
    })
})
