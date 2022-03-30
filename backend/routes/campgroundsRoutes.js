const express = require('express')
const router = express.Router()
const {storage} = require('../utils/cloudinary.js')
const multer  = require('multer')
const upload = multer({ storage })
const {
  getAllCampgrounds,
  getCampground,
  deleteCampground,
  createCampground,
} = require('../controllers/campgroundsController')

router.route('/').get(getAllCampgrounds).post(upload.array("image"), createCampground)
router.route('/:id').get(getCampground).delete(deleteCampground)

module.exports = router