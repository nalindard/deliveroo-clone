import { faker } from '@faker-js/faker'
import User, { UserCreationAttributes } from '../models/user.model'
import bcrypt from 'bcrypt'

export type IUser = {
    name: string
    email: string
    passwordHash: string
    passwordSalt: string
    // isOAuthUser: boolean
    // role: 'customer' | 'admin' | 'restaurant'
    // emailVerified: boolean
}

const password = '12345678'

async function hashPassword(
    password: string
): Promise<{ passwordHash: string; passwordSalt: string }> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return { passwordHash: hash, passwordSalt: salt }
}

export default async function seedUsers(amount: number = 10) {
    if (amount <= 0 || amount > 100) throw new Error('Invalid amount')

    const fakeUsers: UserCreationAttributes[] = await Promise.all(
        Array.from({ length: amount }).map(async () => {
            const { passwordHash, passwordSalt } = await hashPassword(password)

            return {
                name: faker.person.fullName({ sex: 'male' }),
                email: faker.internet.email(),
                passwordHash: passwordHash,
                passwordSalt: passwordSalt,
                isOAuthUser: false,
                role: 'customer',
                emailVerified: false,
            }
        })
    )

    console.log('Creating fake users...', fakeUsers)

    // @ts-expect-error the user property exist here allways
    await User.bulkCreate(fakeUsers).then(() => {
        console.log('Created fake users:')
    })
}
