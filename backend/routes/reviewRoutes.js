const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')
const { isReviewAuthor, isLoggedIn } = require('../middleware/authorization')
router.route('/').get(getReviews).post(isLoggedIn, createReview)
router
  .route('/:reviewId')
  .put(isLoggedIn, isReviewAuthor, updateReview)
  .delete(isLoggedIn, isReviewAuthor, deleteReview)

module.exports = router

// /api/campgrounds/:id/reviews
