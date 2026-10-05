import mongoose from 'mongoose'

const peopleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    bio: { type: String, default: '' },
    country: { type: String, trim: true, default: '' },
    industry: { type: String, trim: true, default: '' },
    profession: { type: String, trim: true, default: '' },
    topics: { type: [String], default: [] },
    socialAccounts: { type: Map, of: String, default: {} },
    claimed: { type: Boolean, default: false },
  },
  { timestamps: true }
)

peopleSchema.index({ name: 'text', bio: 'text', industry: 'text', profession: 'text', topics: 'text' })

export default mongoose.model('Person', peopleSchema)
