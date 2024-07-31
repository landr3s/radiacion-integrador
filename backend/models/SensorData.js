// models/SensorData.js
import { model, Schema } from 'mongoose'

const sensorDataSchema = new Schema({
  sensorValue: { type: Number, required: true },
  timestamp: { type: Date, required: true },
})

sensorDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const SensorData = model('SensorData', sensorDataSchema)
