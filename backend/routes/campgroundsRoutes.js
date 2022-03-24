const express = require('express')
const router = express.Router()
const {
  getAllCampgrounds,
  getCampground,
} = require('../controllers/campgroundsController')

router.route('/').get(getAllCampgrounds)
router.route('/:id').get(getCampground)

module.exports = router
