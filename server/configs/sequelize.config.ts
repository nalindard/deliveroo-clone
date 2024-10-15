import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'sequelize44', //  your_database_name
    'root', // 'your_username',
    '', // 'your_password',
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
