import axios from 'axios'

const API_URL = '/api/users'

//Register Member
const register = async (userData) => {
  const { data } = await axios.post(API_URL, userData)
  return data
}

//Login member
const login = async (userData) => {
  await axios.post(`${API_URL}/login`, userData)
  const { data } = await axios.get(`${API_URL}/user`)
  if (data) {
    localStorage.setItem('user', JSON.stringify(data))
  }
  return data
}

//Logout member
const logout = async () => {
  const { data } = await axios.get(`${API_URL}/logout`)
  localStorage.removeItem('user')
  return data
}

// //Get a user
// const getUser = async () => {
//   const { data } = await axios.get(`${API_URL}/user`)
//   return data
// }

const authService = {
  register,
  logout,
  login,
  // getUser,
}

export default authService
