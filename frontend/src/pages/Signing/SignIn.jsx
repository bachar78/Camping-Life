import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import styled from 'styled-components'

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()
  const { user, isLoading, isError, isLogged, message } = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()

  const { username, password } = formData
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    if (isLogged) {
      toast.success('You login in successfully')
      navigate('/')
    }
  }, [isLogged])
  const onSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      return
    }
    const userData = { username, password }
    dispatch(login(userData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <h1>
        <FaSignInAlt /> Sign In
      </h1>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={onChange}
              placeholder='Enter your username'
              autoComplete='off'
              required
            />
            <label htmlFor='email'>Enter your Username</label>
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter Your Password'
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Enter Your Password</label>
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SignIn