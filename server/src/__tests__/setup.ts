import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    // 'sequelize_jest', //  your_database_name
    // 'root', // 'your_username',
    // '', // 'your_password',
    // {
    //     host: 'localhost',
    //     dialect: 'mysql',
    //     logging: !true,
    // }
    {
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    }
)

beforeAll(async () => {
    await sequelize.sync({ force: true }).then(() => {
        console.log('Database synced')
    })
})

afterAll(async () => {
    await sequelize.drop()
    await sequelize.close()
})

export default sequelize
