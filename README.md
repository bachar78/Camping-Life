# Camping-Life

<div id="top"></div>

<p align="center">
  <img width="40%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/desk1.png">
  <img width="40%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/desk2.png">
</p>

<p align="center">
  <img width="30%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/tap1.png">
  <img width="30%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/tap3.png">
  <img width="30%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/tap2.png">
</p>

<p align="center">
  <img width="20%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/mob5.png">
  <img width="20%" src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/mob2.png">
  <img width="20%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/mob3.png">
  <img width="20%"  src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/mob4.png">
  <img width="20%" src="https://github.com/bachar78/Camping-Life/blob/eea266d5c941cdbeb05f7a4be062c37517409123/frontend/public/images/mob1.png">
</p>

# Camping-Life

- Camping-Life-App is an application built with the MERN stack.
- It is for people who like to make camping in the Netherland or for people who like to hire there campgrounds
- The user can search to find a place to camp and can create, update , delete and browse his own campground

## 1.Setup

### Set Environment Variables

Rename the .envexample to .env and add your [MongoDB](https://www.mongodb.com/) database URI, your JWT secret and your [Cloudinary](https://cloudinary.com/) keys
[EXPRESS_SESSION](https://www.npmjs.com/package/express-session) keys

### Install backend dependencies

```bash
npm install
```

### Install client (frontend) dependencies

```bash
cd frontend
npm install
```

### Run app in development (frontend & backend)

```bash
npm run dev
```

## 2. Code structure

```
backend
|   └── config
|   └── controllers
|   └── Middlewares
|   └── models
|   └── routes
|   └── util
|   └── server.js
frontend
├── public
└── src
|   └── app
|   |   └── store
|   └── components
|   |   └── Maps
|   |   |   └── MapCampground
|   |   |   └── MapCluster
|   |   └── reviews
|   |   |   └── FormReview
|   |   |   └── Review
|   |   └── Footer
|   |   └── GlobalStyle
|   |   └── Header
|   |   └── OnScroll
|   |   └── SlideEffect
|   |   └── Spinner
|   |   └── Toggle
|   |   └── Wave
|   └── features
|   |   └── auth
|   |   └── campgrounds
|   |   └── review
|   └── hooks
|   └── img
|   └── pages
|   |   └── components
|   |   └── FormCampground
|   |   └── Signing
|   |   └── AllCampgrounds
|   |   └── ContactUs
|   |   └── HomePage
|   |   └── SingleCampground
|   |   └── animation
|   └── App
|   └── index
```

<p align="right">(<a href="#top">back to top</a>)</p>

## 3. Further Improvements

- To create Admin profile and user profile
- Booking Process
- Payment Method
