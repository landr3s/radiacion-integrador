import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const correctPassword = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!user || !correctPassword) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
    role: user.role,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '7d' })

  res.send({ username: user.username, role: user.role, token })
})

export default loginRouter
