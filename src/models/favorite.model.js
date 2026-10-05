import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true, index: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  },
  { timestamps: true },
)

favoriteSchema.index({ user: 1, person: 1 }, { unique: true })
export default mongoose.model('Favorite', favoriteSchema)
