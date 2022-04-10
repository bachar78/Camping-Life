const asyncHandler = require('express-async-handler')
const Campground = require('../models/campgroundModel')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
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
  res.json(newUser)
})

module.exports = { registerUser }
