import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { login, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import styled from 'styled-components'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  //   const dispatch = useDispatch()
  //   const { member, isLoading, isError, isSuccess, message } = useSelector(
  //     (state) => state.auth
  //   )
  const navigate = useNavigate()

  const { email, password } = formData
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const memberData = {
      email,
      password,
    }
    setFormData({
      email: '',
      password: '',
    })
    // dispatch(login(memberData))
    console.log(formData)
  }
  //   if (isLoading) {
  //     return <Spinner />
  //   }
  return (
    <div>
      <h1>
        <FaSignInAlt /> Sign In
      </h1>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='email'
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
