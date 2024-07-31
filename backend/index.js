import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT } from './config.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import dotenv from 'dotenv'
import sensorRouter from './controllers/sensor.js'

dotenv.config()

const { DATABASE_URL, NODE_ENV } = process.env
const connectionString =
  NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : DATABASE_URL

mongoose
  .connect(connectionString)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/sensor', sensorRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
