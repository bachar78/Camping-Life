import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { pageAnimation, fade } from '../../animation'
import {
  createCampground,
  reset,
} from '../../features/campgrounds/campgroundsSlice'
import Spinner from '../../components/Spinner'

const AddCampground = () => {
  const [postData, setPostData] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
    zip_code: '',
  })
  const [images, setImages] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isCreated, isError, isLoading, message, campground } = useSelector(
    (state) => state.campgrounds
  )
  // useEffect(() => {
  //   return () => {
  //     dispatch(reset())
  //   }
  // })
  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isCreated) {
      navigate(`/campgrounds/${campground._id}`)
    }
  }, [isError, isCreated, message, navigate, campground._id, dispatch])
  const onChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!images) {
      toast.error('You should upload images')
      return
    }
    if (images.length > 5) {
      toast.error('You can only upload till 6 images')
      return
    }
    const data = new FormData()
    for (const key in postData) {
      data.append(key, postData[key])
    }
    for (const key in images) {
      data.append('image', images[key])
    }
    dispatch(createCampground(data))
  }
  // // if we want to upload images using the browser not "multer" we put this function in onChange field of image input
  // const uploadFiles = (e) => {
  //   Array.from(e.target.files).forEach((image) => {
  //     const file = image
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onloadend = () => {
  //       setImages((prev) => [...prev, reader.result])
  //     }
  //   })
  // }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Container
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <motion.h1 variants={fade}>Create a Campground</motion.h1>
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
          Add Camping
        </motion.button>
        <Link to={-1}>
          <motion.button variants={fade}>Cancel</motion.button>
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
  width: 60%;
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
export default AddCampground
