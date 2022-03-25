const asyncHandler = require('express-async-handler')
const Campground = require('../models/campgroundModel')

//@des Get all Campgrounds for the homepage
//@route /api/campgrounds
//@access Public
const getAllCampgrounds = asyncHandler(async (req, res) => {
  const campgrounds = await Campground.find({})
  if (!campgrounds) {
    res.status(401)
    throw new Error('Campgrounds not found')
  }
  res.status(200).json(campgrounds)
})

//@des Get a single Campground from the homepage
//@route /api/campgrounds/:id
//@access Public
const getCampground = asyncHandler(async (req, res) => {
  const { id } = req.params
  const campground = await Campground.findById(id)
  if (!campground) {
    res.status(404)
    throw new Error('campground not found')
  }
  res.status(200).json(campground)
})

const deleteCampground = asyncHandler(async (req, res) => {
  const { id } = req.params

  const campground = await Campground.findById(id)

  if (!campground) {
    res.status(404)
    throw new Error('campground not found')
  }
  await campground.remove()

  res.status(200).json(campground)
})
module.exports = { getAllCampgrounds, getCampground, deleteCampground }
