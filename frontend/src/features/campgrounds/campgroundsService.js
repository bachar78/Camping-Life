import axios from 'axios'
const API_URL = '/api/campgrounds'

const getCampgrounds = async () => {
  const { data } = await axios.get(API_URL)
  return data
}

const getCampground = async (campId) => {
  const { data } = await axios.get(`${API_URL}/${campId}`)
  return data
}

//Delete a campground
const deleteCampground = async (campId) => {
  const { data } = await axios.delete(`${API_URL}/${campId}`)
  return data
}

//Create Campground
const createCampground = async (data) => {
  const response = await axios.post(API_URL, data)
  return response.data
}

const campgroundsService = { getCampground, getCampgrounds, deleteCampground, createCampground }

export default campgroundsService
