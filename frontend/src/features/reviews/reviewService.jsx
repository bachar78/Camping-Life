import axios from 'axios'
const API_URL = '/api/campgrounds'

//Get all Reviews
const getReviews = async (campId) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  const { data } = await axios.get(`${API_URL}/${campId}/reviews`)
  return data
}

//Create a Reviews
const createReview = async (data) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
  const response = await axios.post(
    `${API_URL}/${data.campId}/reviews`,
    data.reviewData
  )
  return response.data
}

const updateReview = async (data) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  const response = await axios.put(
    `${API_URL}/${data.campId}/reviews/${data.reviewId}`,
    data.reviewData
  )
  return response.data
}

//Delete a review
const deleteReview = async (data) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  const response = await axios.delete(
    `${API_URL}/${data.campId}/reviews/${data.reviewId}`
  )
  return response.data
}

const reviewService = { getReviews, createReview, updateReview, deleteReview }

export default reviewService
