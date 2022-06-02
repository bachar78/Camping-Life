const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedIn } = require('../middleware/authorization')
const {
  registerUser,
  userLogin,
  getUser,
  logout,
} = require('../controllers/userController')

router.route('/').post(registerUser)
router.route('/user').get(isLoggedIn, getUser)
router.route('/login').post(passport.authenticate('local'), userLogin)
router.route('/logout').get(logout)

module.exports = router
