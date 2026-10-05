import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    serviceType: { type: String, trim: true, maxlength: 80 },
    price: { type: Number, min: 0 },
    currency: { type: String, default: 'PKR', uppercase: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.model('Service', serviceSchema)
