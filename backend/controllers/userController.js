const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please fill all required fields')
  }
  const userExist = User.findOne({ email })
  if (userExist) {
    throw new Error("A User exists with the same email, change email!!")
  }
  const user = new User({ email, username })
  const newUser = await User.register(user, password)
  if (!newUser) {
    res.status(401)
    throw new Error("User can't be created")
  }
  req.logIn(newUser, (err) => {
    if (err) return next(err)
    res.json(newUser)
  })
})

const userLogin = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400)
    throw new Error('You are not login')
  }
  res.json(req.user)
})

const logout = asyncHandler(async (req, res) => {
  req.logOut()
  res.status(200).json({ message: 'Logout Successfully' })
})

const getUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(404)
    throw new Error('Not authorized')
  }
})
module.exports = { registerUser, userLogin, getUser, logout }
