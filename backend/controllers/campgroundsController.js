const asyncHandler = require('express-async-handler')
const Campground = require('../models/campgroundModel')
const axios = require('axios')
const { cloudinary } = require('../utils/cloudinary.js')

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
//@route GET /api/campgrounds/:id
//@access Public
const getCampground = asyncHandler(async (req, res) => {
  const { id } = req.params
  const campground = await Campground.findById(id)
    .populate('reviews')
    .populate('owner')
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
  if (campground.owner.toString() !== req.user._id.toString()) {
    res.status(404)
    throw new Error('You are not authorized to delete this campground')
  }
  await campground.remove()
  for (let image of campground.images) {
    await cloudinary.uploader.destroy(image.filename, (result) =>
      console.log(result)
    )
  }
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
    res.status(400)
    throw new Error('Invalid Postcode')
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
    owner: req.user._id,
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

//@des update Campground
//@route PUT /api/campgrounds
//@access Private
const updateCampground = asyncHandler(async (req, res) => {
  const { id } = req.params

  const campground = await Campground.findById(id)
  if (!campground) {
    res.status(401)
    throw new Error('Campground not found')
  }
  if (campground.owner.toString() !== req.user._id.toString()) {
    res.status(404)
    throw new Error('You are not authorized to Edit this campground')
  }
  if (req.body.zip_code !== campground.zip_code) {
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?postcode=${req.body.zip_code}&format=json&apiKey=0295f24387ed41c99bc8805b138ace7c`
    )
    ;(campground.address =
      data.results[0].suburb +
      '-' +
      data.results[0].address_line1 +
      '-' +
      data.results[0].address_line2),
      (campground.latitude = data.results[0].lat),
      (campground.longitude = data.results[0].lon),
      (campground.state = data.results[0].state),
      (campground.zip_code = req.body.zip_code),
      await campground.save()
  }
  if (req.body.title !== campground.title) {
    campground.title = req.body.title
    await campground.save()
  }
  if (req.body.description !== campground.description) {
    campground.description = req.body.description
    await campground.save()
  }
  if (req.body.price !== campground.price) {
    campground.price = req.body.price
    await campground.save()
  }
  if (req.files.length !== 0) {
    const imgs = req.files.map((photo) => ({
      url: photo.path,
      filename: photo.filename,
    }))
    campground.images.push(...imgs)
    await campground.save()
  }
  if (req.body.deletedImage && req.body.deletedImage.length !== 0) {
    for (let image of req.body.deletedImage) {
      await cloudinary.uploader.destroy(image, (result) => console.log(result))
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deletedImage } } },
    })
    await campground.save()
  }
  await campground.save()
  res.status(200).json(campground)
})
module.exports = {
  getAllCampgrounds,
  getCampground,
  deleteCampground,
  createCampground,
  updateCampground,
}
