const express = require('express')
const { upload } = require('../../middlewares/files.middleware')
const { isAuth } = require('../../middlewares/auth.middleware')

const {
  getAllAnimals,
  createAnimal,
  updateAnimalByID,
  deleteAnimalByID,
} = require('../controllers/animals.controller')

const AnimalsRoutes = express.Router()

AnimalsRoutes.get('/', getAllAnimals)
AnimalsRoutes.post('/', [isAuth], upload.single('image'), createAnimal)
AnimalsRoutes.patch('/:id', [isAuth], upload.single('image'), updateAnimalByID)
AnimalsRoutes.delete('/:id', [isAuth], deleteAnimalByID)

module.exports = AnimalsRoutes
