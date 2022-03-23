const asyncHandler = require('express-async-handler')
const Campground = require('../models/campgroundModel')



//@des Get all Campgrounds for the homepage
//@route /api/campgrounds
//@access Public
const getAllCampgrounds = asyncHandler(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.status(200).json(campgrounds)
})


  








module.exports = {getAllCampgrounds}