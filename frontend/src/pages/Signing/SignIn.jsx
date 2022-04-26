import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { login } from '../../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import styled from 'styled-components'
import { pageAnimation } from '../../animation'
import { motion } from 'framer-motion'

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
    <Container variants={pageAnimation} initial='hidden' animate='show'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <Image>
        <img src='tent2.jpg' alt='' />
      </Image>
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
            <button type='submit'>Sign In</button>
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
    font-size: 4rem;
    padding: 2rem;
    color: #23d997;
  }
`

const Image = styled(motion.div)`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 2rem;
  img {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }
`

const FormContainer = styled(motion.div)`
  width: 50%;
  margin: 0 auto;
  form {
    width: 100%;
    min-height: 50vh;
    .form-group {
      position: relative;
      margin-bottom: 2rem;
      height: 5rem;
      font-size: 1.6rem;
      overflow: hidden;
      button {
        width: 100%;
        background: #23d997;
        height: 5rem;
        font-size: 1.8rem;
        text-transform: uppercase;
        letter-spacing: 1rem;
        &:hover {
          background: transparent;
        }
      }
      input {
        width: 100%;
        height: 100%;
        padding-top: 20px;
        padding-bottom: 0px;
        border: none;
        outline: none;
        font-size: 1.6rem;
      }
      label {
        position: absolute;
        bottom: 9px;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-bottom: 3px solid transparent;

        .form-span {
          position: absolute;
          bottom: 13px;
          left: 0px;
          transition: all 0.3s ease;
          margin-left: 0.5rem;
          color: black;
          font-weight: normal;
        }
        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          border-bottom: 5px solid #5fd36a;
          left: 0px;
          bottom: -12px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
      }
    }
  }
  .form-group input:focus + label .form-span,
  .form-group input:valid + label .form-span {
    transform: translateY(-150%);
    font-size: 1.1rem;
    color: #5fd36a;
  }
  .form-group input:focus + label::after,
  .form-group input:valid + label::after {
    transform: translateX(0%);
  }
`

export default SignIn
