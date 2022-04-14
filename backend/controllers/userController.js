const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    if (!username || !email || !password) {
      res.status(400)
      throw new Error('Please fill all required fields')
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
  } catch (e) {
    res.status(400)
    throw new Error("Can't register the User")
  }
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
  res.status(200).json(req.user)
})
module.exports = { registerUser, userLogin, getUser, logout }
