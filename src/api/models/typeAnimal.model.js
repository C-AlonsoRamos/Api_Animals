const mongoose = require('mongoose')

const TypeAnimalSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ['carnivoro', 'herbivoro', 'omnivoro'],
  },
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
})

const TypeAnimal = mongoose.model('TypeAnimal', TypeAnimalSchema)

module.exports = TypeAnimal
