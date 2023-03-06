const Animal = require('../models/animal.model')

const { deleteImgCloudinary } = require('../../middlewares/files.middleware')

const getAllAnimals = async (req, res, next) => {
  try {
    //Vamos a comprobar por queryparams que la pagina existe y que es distinto a NaN
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      //Contamos el numero de personajes que hay
      const numAnimals = await Character.countDocuments()
      //Recuperamos el numero de pagina solicitado
      let page = parseInt(req.query.page)
      //Vamos a indicarle el limite de elementos y si no está indicado que sea 10 por defecto
      let limit = req.query.limit ? parseInt(req.query.limit) : 10
      //Hacemos el calculo del numero de paginas que hay en base al limit y al total de numeros de personajes que hay en la colección
      let numPages =
        numAnimals % limit > 0 ? numAnimals / limit + 1 : numAnimals / limit
      //Si la pagina es mayor que el numero de paginas o menor que 1 la pagina sera por defecto 1
      if (page > numPages || page < 1) {
        page = 1
      }
      //Vamos a definir una constante skip para que inicie en un punto concreto de la colección. Tiene que empezar teniendo en cuenta el limit
      const skip = (page - 1) * limit

      //Hacemos find en el modelo que nos recogera todos los personajes y los guardaremos en allAnimals indicandole el skip y el limite definidos
      const allAnimals = await Animal.find().skip(skip).limit(limit)

      //Vamos a devolver en la respuesta el calculo y los datos para definir si hay pagina siguiente o pagina anterior
      return res.status(200).json({
        info: {
          total: numAnimals,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/api/v1/animals?page=${page + 1}&limit=${limit}`
              : null,
          prev:
            page != 1
              ? `/api/v1/animals?page=${page - 1}&limit=${limit}`
              : null,
        },
        results: allAnimals,
      })
    } else {
      //Este es el valor por defecto si no le indicamos nada por query
      const allAnimals = await Animal.find().limit(10)
      const numAnimals = await Animal.countDocuments()

      return res.status(200).json({
        info: {
          total: numAnimals,
          page: 1,
          limit: 10,
          next: numAnimals > 10 ? `/api/v1/animals?page=2&limit=10` : null,
          prev: null,
        },
        results: allAnimals,
      })
    }
  } catch (error) {
    return next('Cannot find animals', error)
  }
}

const createAnimal = async (req, res, next) => {
  try {
    const animal = new Animal({
      ...req.body,
      image: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dy4mossqz/image/upload/v1678118078/utils/Placeholder_view_vector.svg_z87jyu.png',
    })
    const createdAnimal = await animal.save()
    return res.status(201).json(createdAnimal)
  } catch (error) {
    return next(error)
  }
}

const updateAnimalByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const newAnimal = new Animal(req.body)
    newAnimal._id = id
    const originalAnimal = await Animal.findById(id)
    if (req.file) {
      deleteImgCloudinary(originalAnimal.image)
      newAnimal.image = req.file.path
    }
    await Animal.findByIdAndUpdate(id, newAnimal)
    return res.status(200).json(newAnimal)
  } catch (error) {
    return next(error)
  }
}

const deleteAnimalByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const animal = await Animal.findByIdAndDelete(id)
    if (animal.image) {
      deleteImgCloudinary(animal.image)
      return res.status(200).json(animal)
    }
  } catch (error) {
    return next('Error deleting animal', error)
  }
}

module.exports = {
  getAllAnimals,
  createAnimal,
  updateAnimalByID,
  deleteAnimalByID,
}
