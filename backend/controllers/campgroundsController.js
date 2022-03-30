const asyncHandler = require('express-async-handler')
const Campground = require('../models/campgroundModel')
const axios = require('axios')
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

//@des Delete single Campground
//@route DELETE /api/campgrounds/:id
//@access Private
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

//@des Create new Campground
//@route POST /api/campgrounds
//@access Private
const createCampground = asyncHandler(async (req, res) => {
  const { title, price, description, zip_code, images } = req.body
  const {} = await axios.get(
    `https://api.geoapify.com/v1/geocode/search?postcode=${zip_code}&format=json&apiKey=0295f24387ed41c99bc8805b138ace7c`
  )
  const newCampground = Campground.create({
    title,
    price,
    description,
    zip_code,
  })

  res.json(data.features[0])
})
module.exports = {
  getAllCampgrounds,
  getCampground,
  deleteCampground,
  createCampground,
}
