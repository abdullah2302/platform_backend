import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true, index: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    subject: { type: String, required: true, trim: true, maxlength: 160 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ['new', 'accepted', 'declined', 'closed'], default: 'new', index: true },
  },
  { timestamps: true },
)

export default mongoose.model('Inquiry', inquirySchema)
