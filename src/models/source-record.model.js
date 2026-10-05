import mongoose from 'mongoose'

const sourceRecordSchema = new mongoose.Schema(
  {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    source: { type: String, required: true, trim: true },
    sourceUrl: { type: String, trim: true },
    collectedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.model('SourceRecord', sourceRecordSchema)
