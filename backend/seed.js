import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from './models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL } = process.env

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

const seedUsers = async () => {
  const users = [
    {
      username: 'admin@ups.edu.ec',
      password: 'admin123',
      role: 'admin',
    },
    {
      username: 'operator1@ups.edu.ec',
      password: 'operator123',
      role: 'operator',
    },
    {
      username: 'operator2@ups.edu.ec',
      password: 'operator123',
      role: 'operator',
    },
    {
      username: 'guest@ups.edu.ec',
      password: 'guest123',
      role: 'guest',
    },
  ]

  for (const user of users) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    const newUser = new User({
      username: user.username,
      passwordHash,
      role: user.role,
    })

    await newUser.save()
  }
}

seedUsers()
  .then(() => {
    console.log('Users seeded successfully')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('Error seeding users:', err)
    mongoose.connection.close()
  })
