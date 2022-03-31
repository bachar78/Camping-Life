import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { pageAnimation, fade } from '../../animation'
import {
  reset,
  updateCampground,
} from '../../features/campgrounds/campgroundsSlice'
import Spinner from '../../components/Spinner'

const EditForm = () => {
  const { id } = useParams()
  const { state } = useLocation()

  const { isUpdated, isError, isLoading, message } = useSelector(
    (state) => state.campgrounds
  )
  const [postData, setPostData] = useState({
    title: state ? state.title : '',
    price: state ? state.price : '',
    description: state ? state.description : '',
    location: state ? state.location : '',
    zip_code: state ? state.zip_code : '',
  })

  const [images, setImages] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isUpdated) {
      navigate(`/campgrounds/${id}`)
    }
    return () => {
      dispatch(reset())
    }
  }, [isError, isUpdated, message, navigate, id, dispatch])

  const onChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (state.images.length + images.length > 6) {
      toast.error(`You can only upload ${6 - state.images.length} images`)
      return
    }
    const dataForm = new FormData()
    for (const key in postData) {
      dataForm.append(key, postData[key])
    }
    for (const key in images) {
      dataForm.append('image', images[key])
    }
    const data = { campId: id, campData: dataForm }
    dispatch(updateCampground(data))
    toast.success('Campground was successfully created')
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Container
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <motion.h1 variants={fade}>Edit Campground</motion.h1>
      <Form variants={fade} onSubmit={onSubmit}>
        <motion.input
          variants={fade}
          type='text'
          name='title'
          placeholder='enter the title'
          onChange={onChange}
          value={postData.title}
          required
        />
        <motion.input
          variants={fade}
          type='text'
          name='price'
          placeholder='0.00'
          onChange={onChange}
          value={postData.price}
          required
        />
        <motion.textarea
          variants={fade}
          type='text'
          name='description'
          onChange={onChange}
          value={postData.description}
          required></motion.textarea>
        <motion.input
          variants={fade}
          type='file'
          name='image'
          onChange={(e) => {
            setImages(e.target.files)
          }}
          multiple
        />
        <motion.input
          variants={fade}
          type='text'
          name='zip_code'
          placeholder='enter zip_code'
          onChange={onChange}
          value={postData.zip_code}
          required
        />
        <motion.button variants={fade} type='submit'>
          {' '}
          Edit Camping
        </motion.button>
        <Link to={-1}>
          <motion.button variants={fade}>Cancel Editing</motion.button>
        </Link>
      </Form>
    </Container>
  )
}

const Container = styled(motion.div)`
  min-height: 80vh;
  width: 80%;
  margin: 2rem auto;
  h1 {
    text-align: center;
    margin: 3rem 0;
  }
`
const Form = styled.form`
  width: 40%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 60vh;
  textarea,
  input {
    width: 100%;
    padding: 1rem 2rem;
  }
  button {
    width: 100%;
  }
`

export default EditForm
