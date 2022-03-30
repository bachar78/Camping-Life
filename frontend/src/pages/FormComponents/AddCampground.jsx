import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
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
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.campgrounds
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/campgrounds')
      dispatch(reset())
      toast.success('Campground was successfully created')
    }
  }, [isError, isSuccess, message, dispatch, navigate])
  const onChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(reset())
    if (!images) {
      toast.error('You should upload images')
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
    <Container>
      <h1>Create a Campground</h1>
      <Form onSubmit={onSubmit}>
        <input
          type='text'
          name='title'
          placeholder='enter the title'
          onChange={onChange}
          value={postData.title}
          required
        />
        <input
          type='text'
          name='price'
          placeholder='0.00'
          onChange={onChange}
          value={postData.price}
          required
        />
        <textarea
          type='text'
          name='description'
          onChange={onChange}
          value={postData.description}
          required></textarea>
        <input
          type='file'
          name='image'
          onChange={(e) => {
            setImages(e.target.files)
          }}
          multiple
        />
        <input
          type='text'
          name='zip_code'
          placeholder='enter zip_code'
          onChange={onChange}
          value={postData.zip_code}
          required
        />
        <button type='submit'>Add Camping</button>
      </Form>
    </Container>
  )
}

const Container = styled(motion.div)`
  min-height: 80vh;
  width: 80%;
  margin: 2rem auto;
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
  }
`
export default AddCampground
