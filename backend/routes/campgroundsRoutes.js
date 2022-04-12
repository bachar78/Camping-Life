const express = require('express')
const router = express.Router()
const { storage } = require('../utils/cloudinary.js')
const multer = require('multer')
const upload = multer({ storage })
const reviewRouter = require('./reviewRoutes')
router.use('/:id/reviews', reviewRouter)
const {
  getAllCampgrounds,
  getCampground,
  deleteCampground,
  createCampground,
  updateCampground,
} = require('../controllers/campgroundsController')
const { isLoggedIn } = require('../middleware/authorization')
router
  .route('/')
  .get(getAllCampgrounds)
  .post(isLoggedIn, upload.array('image'), createCampground)
router
  .route('/:id')
  .get(getCampground)
  .delete(isLoggedIn, deleteCampground)
  .put(isLoggedIn, upload.array('image'), updateCampground)

module.exports = router
