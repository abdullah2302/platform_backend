import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    reason: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: ['open', 'reviewing', 'resolved', 'dismissed'], default: 'open', index: true },
    resolution: { type: String, trim: true, maxlength: 2000 },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

export default mongoose.model('Report', reportSchema)
