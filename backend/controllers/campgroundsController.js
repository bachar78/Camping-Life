const asyncHandler = require('express-async-handler')
const Campground = require('../models/campgroundModel')
const axios = require('axios')
const data = require('../config/data')
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
  const { title, price, description, zip_code } = req.body
  const { data } = await axios.get(
    `https://api.geoapify.com/v1/geocode/search?postcode=${zip_code}&format=json&apiKey=0295f24387ed41c99bc8805b138ace7c`
  )
  if (data.results.length === 0) {
    res.json(400)
    throw new Error('Please fill all the fields')
  }
  if (!title || !price || !description || !zip_code) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }
  if (req.files.length === 0) {
    res.status(400)
    throw new Error('You should upload at least one image')
  }
  const newCampground = await Campground.create({
    title,
    price,
    description,
    address:
      data.results[0].suburb +
      '-' +
      data.results[0].address_line1 +
      '-' +
      data.results[0].address_line2,
    latitude: data.results[0].lat,
    longitude: data.results[0].lon,
    state: data.results[0].state,
    zip_code,
    images:
      req.files.length > 0
        ? req.files.map((photo) => ({
            url: photo.path,
            filename: photo.filename,
          }))
        : {},
  })
  if (!newCampground) {
    res.status(401)
    throw new Error('Invalid Credential')
  }
  res.status(200).json(newCampground)
})
module.exports = {
  getAllCampgrounds,
  getCampground,
  deleteCampground,
  createCampground,
}
