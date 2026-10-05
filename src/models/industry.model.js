const mongoose = require('mongoose')
module.exports = mongoose.model('Industry', new mongoose.Schema({ name: { type: String, required: true, unique: true }, slug: { type: String, unique: true } }))
