import express from 'express'

// routes importing
import router from './routes/index'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes settings
app.use('/api', router)

export default app
