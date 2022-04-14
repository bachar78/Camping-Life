import axios from 'axios'

const API_URL = '/api/users'

//Register Member
const register = async (userData) => {
  const { data } = await axios.post(API_URL, userData)
  console.log(data)
  return data
}

//Login member
const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}/login`, userData)
  console.log(data)
  return data
}

//Logout member

const logout = async () => {
  const { data } = await axios.get(`${API_URL}/logout`)
  console.log(data)
  return data
}

const authService = {
  register,
  logout,
  login,
}

export default authService
