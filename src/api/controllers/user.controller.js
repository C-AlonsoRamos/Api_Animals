const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/token')

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body)

    const userExists = await User.findOne({ email: newUser.email })

    if (userExists) {
      return next('User already exists')
    }
    const createdUser = await newUser.save()

    createdUser.password = null
    return res.status(201).json(createdUser)
  } catch (error) {
    return next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return next('User not found')
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email)
      return res.status(200).json(token)
    }
  } catch (error) {
    return next('User cannot login', error)
  }
}

module.exports = { registerUser, loginUser }
