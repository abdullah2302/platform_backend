import mongoose from 'mongoose'
export default mongoose.model('Topic', new mongoose.Schema({ name: { type: String, required: true, unique: true }, slug: { type: String, unique: true } }))
