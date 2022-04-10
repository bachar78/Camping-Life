const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const PORT = process.env.PORT || 5000
const campgroundsRoutes = require('./routes/campgroundsRoutes')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorHandler')
const bcrypt = require('bcrypt')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/userModel')

//connect to database
connectDB()
const app = express()
const sessionOptions = {
  secret: process.env.EXPRESS_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}
app.use(session(sessionOptions))

//Passport Settings
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Cookies parser middleware
// app.use(cookieParser(process.env.EXPRESS_SESSION))

//Body parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

//Home Route
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome' })
})

//Routers
app.use('/api/campgrounds', campgroundsRoutes)
app.use('/api/users', userRoutes)
// app.use('/api/reviews', reviewsRoutes)

//Error Handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`server starts on port ${PORT}`))
