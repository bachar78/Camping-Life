module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(400)
    throw new Error('You should Sign In first')
  }
  next()
}


// module.exports.isOwner = (req, res, next) => {
//   if () {
//     res.status(400)
//     throw new Error('You should Sign In first')
//   }
//   next()
// }