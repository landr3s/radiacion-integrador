import express from 'express'
import { User } from '../models/User.js'
import { userExtractor } from '../middlewares/userExtractor.js'
import jwt from 'jsonwebtoken'

const usersRouter = express.Router()

// Middleware to extract and verify user token
usersRouter.use(userExtractor)

usersRouter.post('/', async (req, res) => {
  const { username, password, role } = req.body

  if (role !== 'operator' && role !== 'admin') {
    return res.status(400).json({ error: 'Invalid role' })
  }

  const user = new User({ username, passwordHash: password, role })
  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export default usersRouter
