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
      <FormContainer>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              onChange={onChange}
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor='username'>
              <span className='form-span'>Enter your Name</span>
            </label>
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor='email'>
              <span className='form-span'>Enter your Email</span>
            </label>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor='password'>
              <span className='form-span'>Enter Password</span>
            </label>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor='password'>
              <span className='form-span'>Confirm your Password</span>
            </label>
          </div>
          <div className='form-group'>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
      </FormContainer>
    </Container>
  )
}

const Container = styled(motion.div)`
  min-height: 90vh;
  position: relative;
  h1 {
    text-align: center;
    font-size: 2.5rem;
    padding: 4rem;
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
  opacity: 0.4;
  overflow: hidden;
  .bg_video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
const FormContainer = styled(motion.div)`
  width: 50%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.75);
  form {
    width: 100%;
    min-height: 40vh;
    .form-group {
      position: relative;
      width: 100%;
      height: 4rem;
      font-size: 1.4rem;
      overflow: hidden;
      &:not(:last-child) {
        margin-bottom: 3rem;
      }
      input {
        width: 100%;
        height: 100%;
        padding-top: 20px;
        border: none;
        outline: none;
        font-size: 1.5rem;
      }
      button {
        width: 100%;
        border: 1px solid #23d997;
        background: transparent;
        height: 4rem;
        font-size: 1.4rem;
        text-transform: uppercase;
        font-weight: lighter;
        &:hover {
          background: #23d997;
        }
      }
      label {
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-bottom: 3px solid transparent;
        span {
        }
        .form-span {
          position: absolute;
          bottom: 13px;
          left: 0px;
          transition: all 0.3s ease;
          margin-left: 0.5rem;
          color: #3f474783;
          font-weight: normal;
        }
        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          border-bottom: 5px solid #23d997;
          left: 0px;
          bottom: 3px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
      }
    }
  }
  .form-group input:focus + label .form-span,
  .form-group input:valid + label .form-span {
    transform: translateY(-140%);
    font-size: 1.1rem;
    color: #23d997;
  }
  .form-group input:focus + label::after,
  .form-group input:valid + label::after {
    transform: translateX(0%);
  }
  @media (max-width: 900px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 85%;
  }
`
export default SignUp
