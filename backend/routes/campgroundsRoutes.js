const express = require('express')
const router = express.Router()
const {
  getAllCampgrounds,
  getCampground,
  deleteCampground,
} = require('../controllers/campgroundsController')

router.route('/').get(getAllCampgrounds)
router.route('/:id').get(getCampground).delete(deleteCampground)

module.exports = router
