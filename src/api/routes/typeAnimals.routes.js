const express = require('express')
const { isAuth } = require('../../middlewares/auth.middleware')

const TypeAnimalsRoutes = express.Router()

const {
  getAllTypeAnimals,
  createTypeAnimal,
  editTypeAnimal,
} = require('../controllers/typeAnimals.controller')

TypeAnimalsRoutes.get('/', getAllTypeAnimals)
TypeAnimalsRoutes.post('/', [isAuth], createTypeAnimal)
TypeAnimalsRoutes.put('/:id', [isAuth], editTypeAnimal)

module.exports = TypeAnimalsRoutes
