import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import errors from './middlewares/erros.middleware'
import router from './routes'

const app = express()

// Middlewares,
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    })
)
app.use(helmet({
    xXssProtection: !true,
    xPoweredBy: true
}))

router(app)

app.use(errors)

export default app
