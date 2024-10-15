import app from './app'
import defaultConfig from '../configs/default.config'
// import { modelAssociations } from './models/delete/modelAssociations'
import User from './models/user.model'
import modelAssociations from './models/modelAssociations'
// import swaggerDocs from './utils/swagger.util'

async function main() {
    try {
        modelAssociations()

        // const u = await User.create({
        //     email: 'admin@email.com',
        //     isOAuthUser: false,
        //     name: 'Admin',
        //     role: 'admin',
        // })

        app.listen(defaultConfig.port, () =>
            console.log(`Server running on port: ${defaultConfig.port}`)
        )
        // swaggerDocs(app, defaultConfig.port as number)
    } catch (error) {
        console.error(error)
    }
}

main()
