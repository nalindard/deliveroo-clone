// import { faker } from '@faker-js/faker';
// import Restaurant from '../models/restaurant.model';

// export type IRestaurant = {
//     id: string;
//     name: string;
//     ownerId: string; // Assuming you already have owner IDs to reference
//     city: string;
//     area: string;
//     address: string;
//     opensAt: string;
//     closesAt: string;
//     isActive: boolean;
//     phone: string;
//     note: string;
// };

// function generateId(): string {
//     // Generate a random restaurant-like string (custom logic)
//     return `${faker.word.adjective()}-${faker.word.noun()}-${faker.word.noun()}-${faker.word.noun()}`;
// }

// export default async function seedRestaurants() {
//     const fakeRestaurants: IRestaurant[] = await Promise.all(
//         Array.from({ length: 5 }).map(() => {
//             return {
//                 id: generateId(),
//                 name: faker.company.name(),
//                 ownerId: 'some-existing-owner-id', // Replace this with actual owner IDs
//                 city: faker.location.city(),
//                 area: faker.location.street(),
//                 address: faker.location.streetAddress(),
//                 opensAt: faker.date.future().toISOString(),
//                 closesAt: faker.date.future().toISOString(),
//                 isActive: true,
//                 phone: faker.phone.number(),
//                 note: faker.lorem.sentence(),
//             };
//         })
//     );

//     console.log('Creating fake restaurants...', fakeRestaurants);

//     await Restaurant.bulkCreate(fakeRestaurants).then(() => {
//         console.log('Created fake restaurants:');
//     });
// }

import { faker } from '@faker-js/faker'
import Restaurant, {
    RestaurantCreationAttributes,
} from '../models/restaurant.model'
import User from '../models/user.model'

// function generateId(name: string): string {
//     // Normalize the name to lowercase, replace spaces and special characters with hyphens
//     return (
//         name
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
//             .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
//             .trim() + // Trim hyphens from the beginning and end
//         `-new-${faker.number.int({ min: 1, max: 100 })}`
//     ) // Append a random number
// }

async function getUserIds(): Promise<string[]> {
    const users = await User.findAll({
        attributes: ['id'],
    })

    console.log('Users:', users.map((user) => user.id))
    return users.map((user) => user.id)
}

export default async function seedRestaurants(amount: number = 5) {
    if (amount <= 0 || amount > 100) throw new Error('Invalid amount')

    const userIds = await getUserIds()

    if (userIds.length === 0) {
        console.error(
            'No users found. Please create user entries before seeding restaurants.'
        )
        return
    }

    const fakeRestaurants: RestaurantCreationAttributes[] = await Promise.all(
        Array.from({ length: amount }).map(() => {
            const name = `${faker.commerce.productAdjective()} - ${faker.location.street()}`
            const randomOwnerId =
                userIds[Math.floor(Math.random() * userIds.length)]

            return {
                // id: generateId(name),
                name: name,
                ownerId: randomOwnerId,
                city: faker.location.city(),
                area: faker.location.street(),
                address: faker.location.streetAddress(),
                opensAt: faker.date.future().toISOString(),
                closesAt: faker.date.future().toISOString(),
                isActive: true,
                phone: faker.phone.number(),
                note: faker.lorem.sentence(),
                image: faker.image.url(),
                titleTags: `${faker.food.adjective()},${faker.food.adjective()},${faker.food.adjective()}`,
                subTitleTags: faker.lorem.words(5).split(' ').join(', '),
                locationCordinates: `${faker.location.latitude()},${faker.location.longitude()}`,
                minimumInCents: faker.number.int({ min: 500, max: 5000 }), // Between $5.00 and $50.00
                deliveryFeesInCents: faker.number.int({ min: 500, max: 5000 }), // Between $5.00 and $50.00
            }
        })
    )

    // console.log('Creating fake restaurants...', fakeRestaurants)

    await Restaurant.bulkCreate(fakeRestaurants).then(() => {
        console.log('Created fake restaurants:')
    })
}
