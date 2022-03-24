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

const campgroundsService = { getCampground, getCampgrounds }

export default campgroundsService
