const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specie: { type: String, required: true, trim: true },
    location: { type: String, required: false, trim: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal
