const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 3,
  },
  campground_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campground',
  },
})

module.exports = mongoose.model('Review', reviewSchema)
