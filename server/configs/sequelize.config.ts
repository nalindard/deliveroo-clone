import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    // @TODO: Have to load from ENV
    'deliveroo',
    'root',
    '0000',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: !true,
    }
)

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Database synced')
    })
    .catch((err) => {
        console.error('Error syncing database:', err)
    })

export default sequelize
