const Campground = require('../models/campgroundModel')
const Review = require('../models/reviewModel')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(400)
    throw new Error('You should Sign In first')
  }
  next()
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params
  const campground = await Campground.findById(id)
  if (campground.owner !== req.user._id.toString()) {
    res.status(404)
    throw new Error('You are not authorized')
  }
  next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params
  const campground = await Campground.findById(id)
  const review = await Review.findById(reviewId)
  if (
    campground._id.toString() !== review.campground_id.toString() ||
    review.author.toString() !== req.user._id.toString()
  ) {
    res.status(404)
    throw new Error('You are not authorized')
  }
  next()
}
