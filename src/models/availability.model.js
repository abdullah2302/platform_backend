import mongoose from 'mongoose'

const availabilitySchema = new mongoose.Schema(
  {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true, unique: true },
    status: { type: String, enum: ['available', 'limited', 'unavailable'], default: 'available' },
    note: { type: String, trim: true, maxlength: 500 },
    nextAvailableAt: Date,
  },
  { timestamps: true },
)

export default mongoose.model('Availability', availabilitySchema)
