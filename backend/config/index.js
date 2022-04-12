const mongoose = require('mongoose')
const Campground = require('../models/campgroundModel')

const data = require('./data')
const { places, descriptors, images } = require('./seedHelpers')

//connect Mongo
mongoose.connect(
  'mongodb+srv://bachar78:BrasiliA2018@react-camping.5ylye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 25; i++) {
    await Campground.create({
      title: `${sample(descriptors)} ${sample(places)}`,
      address: data[i].Street + '-' + data[i].State + '-' + data[i].City,
      price: Math.floor(Math.random() * 150),
      description:
        'Camping is an outdoor activity that involves staying the night/more than one night in a protective shelter out in nature.',
      state: data[i].State,
      latitude: data[i].Latitude,
      longitude: data[i].Longitude,
      zip_code: data[i].Zip_code,
      forSell: false,
      owner: '6255cef0b37315ba448314b2',
      images: [
        {
          url: sample(images),
          filename: 'Bach-camp/camping-life',
        },
        {
          url: sample(images),
          filename: 'Bach-camp/camping-life',
        },
      ],
    })
  }
}

seedDb().then(() => {
  mongoose.connection.close()
})
