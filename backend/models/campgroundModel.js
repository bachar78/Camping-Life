const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
})

const CampgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [ImageSchema],
    latitude: Number,
    longitude: Number,
    state: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    forSell: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Campground', CampgroundSchema)
