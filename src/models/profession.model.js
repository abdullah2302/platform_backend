const mongoose = require('mongoose')
module.exports = mongoose.model('Profession', new mongoose.Schema({ name: { type: String, required: true, unique: true }, slug: { type: String, unique: true } }))
