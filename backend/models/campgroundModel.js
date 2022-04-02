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
ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_10')
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
