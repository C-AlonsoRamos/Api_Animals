const TypeAnimal = require('../models/typeAnimal.model')

const getAllTypeAnimals = async (req, res, next) => {
  try {
    const typeAnimals = await TypeAnimal.find().populate('animals')
    return res.status(200).json({
      info: 'All TypeAnimals',
      results: typeAnimals,
    })
  } catch (error) {
    return next('TypeAnimal not found', error)
  }
}

const createTypeAnimal = async (req, res, next) => {
  try {
    const newTypeAnimal = new TypeAnimal(req.body)
    const createdTypeAnimal = await newTypeAnimal.save()
    return res.status(200).json(createdTypeAnimal)
  } catch (error) {
    return next('Failed creating TypeAnimal', error)
  }
}

const editTypeAnimal = async (req, res, next) => {
  try {
    const { id } = req.params
    const newTypeAnimal = new TypeAnimal(req.body)
    newTypeAnimal._id = id
    const foundTypeAnimal = await TypeAnimal.findById(id)
    newTypeAnimal.animals = [
      ...newTypeAnimal.animals,
      ...foundTypeAnimal.animals,
    ]
    const updatedTypeAnimal = await TypeAnimal.findByIdAndUpdate(
      id,
      newTypeAnimal
    )
    return res.status(201).json(newTypeAnimal)
  } catch (error) {
    return next('Error updating TypeAnimal', error)
  }
}

module.exports = { getAllTypeAnimals, createTypeAnimal, editTypeAnimal }
