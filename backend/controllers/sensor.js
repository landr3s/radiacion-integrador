import express from 'express'
import { SensorData } from '../models/SensorData.js' // Asegúrate de crear este modelo

const sensorRouter = express.Router()

sensorRouter.post('/', async (req, res) => {
  const { sensorValue } = req.body

  try {
    const newSensorData = new SensorData({ sensorValue, timestamp: new Date() })
    const savedSensorData = await newSensorData.save()

    res.status(201).json(savedSensorData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to save sensor data' })
  }
})

sensorRouter.get('/', async (req, res) => {
  try {
    const sensorData = await SensorData.find().sort({ timestamp: -1 }).limit(10) // Últimos 10 datos
    res.status(200).json(sensorData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sensor data' })
  }
})

export default sensorRouter
