import mongoose from 'mongoose'

const claimSchema = new mongoose.Schema(
  {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    note: { type: String, trim: true, maxlength: 2000 },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date,
  },
  { timestamps: true },
)

claimSchema.index({ person: 1, user: 1 }, { unique: true })
export default mongoose.model('Claim', claimSchema)
