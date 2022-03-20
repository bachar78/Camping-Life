const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const PORT = process.env.PORT || 5000


//connect to database
// connectDB()

const app = express()

//Body parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

//Home Route
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome' })
})
//Routers
// app.use('/api/campgrounds', memberRoutes)
// app.use('/api/reviews', tasksRoutes)


//Error Handler middleware
// app.use()

app.listen(PORT, () => console.log(`server starts on port ${PORT}`))
