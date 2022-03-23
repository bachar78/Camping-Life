const mongoose = require('mongoose')
const Campground = require('../models/campground')
const faker = require('faker')
const data = require('./data')
const { places, descriptors } = require('./seedHelpers')

//connect Mongo
mongoose.connect("mongodb+srv://bachar78:BrasiliA2018@react-camping.5ylye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 74; i++) {
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: data[i].State + '-' + data[i].City,
      price: Math.floor(Math.random() * 150),
      description: faker.lorem.paragraph(),
      state: data[i].State,
      latitude: data[i].Latitude,
      longitude: data[i].Longitude,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          filename: 'Bach-camp/ivbscp9s0c3phopixbyt',
        },
        {
          url: 'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
          filename: 'Bach-camp/ijkaqhvasx3pxzxyfvkj',
        },
        {
          url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          filename: 'Bach-camp/ijkaqhvasx3pxzxyfvkj',
        },
      ],
    })
    await camp.save()
  }
}

seedDb().then(() => {
  mongoose.connection.close()
})
