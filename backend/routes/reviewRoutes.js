const express = require('express')
const router = express.Router({ mergeParams: true })

const { createReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController')



router.route('/').get(getReviews).post(createReview)
router.route('/:reviewId').put(updateReview).delete(deleteReview)


module.exports = router

// /api/campgrounds/:id/reviews
