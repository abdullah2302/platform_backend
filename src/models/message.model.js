import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    inquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry', required: true, index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
    readAt: Date,
  },
  { timestamps: true },
)

export default mongoose.model('Message', messageSchema)
