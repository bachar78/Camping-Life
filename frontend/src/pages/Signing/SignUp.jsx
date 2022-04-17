import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../features/auth/authSlice'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../animation'
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
      toast.success('You were registered successfully')
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
    <Container variants={pageAnimation} initial='hidden' animate='show'>
      <Video>
        <video className='bg_video' autoPlay muted loop>
          <source src='Campfire.mp4' type='video/mp4' />
          Your browser is not supported!
        </video>
      </Video>
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
    </Container>
  )
}

const Container = styled(motion.div)`
  min-height: 90vh;
  position: relative;
  h1 {
    text-align: center;
    font-size: 4rem;
    padding: 6rem;
    color: #23d997;
  }
`
const Video = styled(motion.div)`
  position: absolute;
  z-index: -100;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.15;
  overflow: hidden;
  .bg_video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
export default SignUp
