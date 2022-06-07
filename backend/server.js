const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db.js')
const PORT = process.env.PORT || 5000
const campgroundsRoutes = require('./routes/campgroundsRoutes')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorHandler')
const bcrypt = require('bcryptjs')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/userModel')
const MongoDBStore = require('connect-mongo')
const path = require('path')
//connect to database
connectDB()
const app = express()

//Body parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

// //Cookies parser middleware
// app.use(cookieParser(process.env.EXPRESS_SESSION))

const store = MongoDBStore.create({
  mongoUrl: process.env.MONGO_URI,
  secret: process.env.EXPRESS_SESSION,
  touchAfter: 24 * 60 * 60,
})
store.on('error', function (e) {
  console.log('SESSION STORE ERROR', e)
})
const sessionConfig = {
  store,
  name: 'CampLife',
  secret: process.env.EXPRESS_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}

app.use(session(sessionConfig))

//Passport Settings middleware
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Home Route
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome' })
})

//Routers
app.use('/api/campgrounds', campgroundsRoutes)
app.use('/api/users', userRoutes)
// app.use('/api/reviews', reviewsRoutes)
//Serve Frontend
if (process.env.NODE_ENV === 'production') {
  //Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  })
} else {
  //Home Route
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to the task manager application' })
  })
}
//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`server starts on port ${PORT}`))
