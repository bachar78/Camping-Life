const express = require('express')
const router = express.Router()
const { getAllCampgrounds } =  require('../controllers/campingController')

router.route('/').get(getAllCampgrounds)

module.exports = router
