const express = require('express')
const dotenv = require('dotenv')
const connect = require('./src/utils/connect')
const cors = require('cors')
const { configCloudinary } = require('./src/middlewares/files.middleware')

dotenv.config()
configCloudinary()

const PORT = process.env.PORT || 8081

const server = express()

connect()

server.use(cors({ origin: '*', credentials: true }))

server.use(express.json({ limit: '5mb' }))
server.use(express.urlencoded({ limit: '5mb', extended: true }))

const AnimalsRoutes = require('./src/api/routes/animals.routes')
server.use('/api/v1/animals', AnimalsRoutes)

const TypeAnimalsRoutes = require('./src/api/routes/typeAnimals.routes')
server.use('/api/v1/typeAnimals', TypeAnimalsRoutes)

const UserRoutes = require('./src/api/routes/user.routes')
server.use('/api/v1/users', UserRoutes)

server.use('*', (req, res, next) => {
  const error = new Error('Route not found')
  return next(error)
})

server.disable('x-powered-by')

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
