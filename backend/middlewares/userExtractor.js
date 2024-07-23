import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }

  req.user = await User.findById(decodedToken.id)
  next()
}
