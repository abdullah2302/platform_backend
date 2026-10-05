import mongoose from 'mongoose'

const listSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true },
)

listSchema.index({ user: 1, name: 1 }, { unique: true })
export default mongoose.model('List', listSchema)
