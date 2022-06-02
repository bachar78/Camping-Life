const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Campground = require('../models/campgroundModel')

//@desc create review
//route POST /api/campgrounds/:id/reviews
//access Private
const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { review, rating } = req.body
  const campground = await Campground.findById(id)
  if (!campground) {
    res.status(400)
    throw new Error('Campground not found')
  }
  if (!rating || !review) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }
  const newReview = await Review.create({
    review,
    rating,
    campground_id: campground._id,
    author: req.user._id,
  })
  campground.reviews.push(newReview._id)
  await campground.save()

  if (!newReview) {
    res.status(400)
    throw new Error("You can't post a review")
  }
  res.status(200).json(newReview)
})

//@desc Get all reviews
//route Get/api/campgrounds/:id/reviews
//access Private
const getReviews = asyncHandler(async (req, res) => {
  const { id } = req.params
  const campground = await Campground.findById(id)
  if (!campground) {
    res.status(400)
    throw new Error('Campground not found')
  }
  const reviews = await Review.find({ campground_id: campground._id }).populate(
    'author'
  )
  if (!reviews) {
    res.status(400)
    throw new Error('No reviews to show')
  }
  res.status(200).json(reviews)
})

//@desc update review
//route PUT/api/campgrounds/:id/reviews/:reviewId
//access Private
const updateReview = asyncHandler(async (req, res) => {
  const { review, rating } = req.body
  if (!review && !rating) {
    res.status(401)
    throw new Error('You should update at least one field')
  }
  const reviewToUpdate = await Review.findById(req.params.reviewId)
  if (!reviewToUpdate) {
    res.status(400)
    throw new Error('Review not exists')
  }
  reviewToUpdate.review = review ? review : reviewToUpdate.review
  reviewToUpdate.rating = rating ? rating : reviewToUpdate.rating
  const updatedReview = await reviewToUpdate.save()

  if (!updatedReview) {
    res.status(400)
    throw new Error('Review not updated')
  }
  res.status(200).json(updatedReview)
})
//@desc delete review
//route DELETE/api/campgrounds/:id/reviews/:reviewId
//access Private
const deleteReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params
  const deletedReview = await Review.findByIdAndDelete(reviewId)
  const campground = await Campground.findById(id)
  if (!campground) {
    res.status(400)
    throw new Error('Campground can not be found')
  }

  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  // campground.reviews = campground.reviews.filter(
  //   (review) => review.toString() !== deletedReview._id.toString()
  // )
  // await campground.save()
  if (!deletedReview) {
    res.status(400)
    throw new Error('Review can not be deleted')
  }
  res.status(200).json(deletedReview)
})

module.exports = { createReview, getReviews, updateReview, deleteReview }
