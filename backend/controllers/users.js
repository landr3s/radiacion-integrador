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

// Método PUT para actualizar un usuario
usersRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { username, password, role } = req.body

  // Verificar que el role sea válido si se está actualizando
  if (role && role !== 'operator' && role !== 'admin') {
    return res.status(400).json({ error: 'Invalid role' })
  }

  const updatedUserData = {}
  if (username) updatedUserData.username = username
  if (password) updatedUserData.passwordHash = password // Asumiendo que la contraseña ya está hasheada

  if (role) updatedUserData.role = role

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    })
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default usersRouter
