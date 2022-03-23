const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CampgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
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
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
      },
    ],
    latitude: Number,
    longitude: Number,
    state: {
      type: String,
      required: true,
    },
    Zip_code: {
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
