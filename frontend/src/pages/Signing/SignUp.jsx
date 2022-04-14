import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'
import styled from 'styled-components'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const { username, email, password, password2 } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, isLogged, message } = useSelector(
    (state) => state.auth
  )

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    if (isLogged) {
      toast.success("You were registered successfully")
      navigate(-1)
    }
  }, [isLogged])
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("Password don't much")
    } else {
      const userData = {
        username,
        email,
        password,
      }
      dispatch(register(userData))
      setFormData({
        username: '',
        email: '',
        password: '',
        password2: '',
      })
    }
  }

  return (
    <div>
      <h1>
        <FaUser /> Register
      </h1>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              onChange={onChange}
              placeholder='Enter your Full Name'
              autoComplete='off'
              required
            />
            <label htmlFor='username'>Enter your Full Name</label>
          </div>
          <div>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your Email'
              autoComplete='off'
              required
            />
            <label htmlFor='email'>Enter your Email</label>
          </div>
          <div>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter Password'
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Enter Password</label>
          </div>
          <div>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm your Password'
              autoComplete='off'
              required
            />
            <label htmlFor='password'>Confirm your Password</label>
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SignUp
