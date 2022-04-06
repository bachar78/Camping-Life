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
    images: state ? state.images : [],
  })
  const [deletedImages, setDeletedImages] = useState([])
  const [images, setImages] = useState([])
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
  }, [isError, isUpdated, message, id, dispatch, navigate])

  const onChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const rangeExistingImages = state.images.length - deletedImages.length
    if (rangeExistingImages + images.length > 6) {
      toast.error(`You can only upload ${6 - rangeExistingImages} images`)
      return
    }
    const dataForm = new FormData()
    for (const key in postData) {
      dataForm.append(key, postData[key])
    }
    for (const key in images) {
      dataForm.append('image', images[key])
    }
    if (deletedImages.length > 0) {
      for (let deletedImage of deletedImages) {
        dataForm.append('deletedImage', deletedImage)
      }
    }
    const data = { campId: id, campData: dataForm }
    dispatch(updateCampground(data))
    toast.success('Campground was successfully updated')
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
        <ImgsInputsContainer>
          {postData.images.map((image, index) => (
            <motion.div className='img-input' variants={fade} key={index}>
              <div className='image'>
                <img src={image.url} alt='' />
              </div>
              <label className='form'>
                {' '}
                Delete?
                <input
                  id={index}
                  type='checkbox'
                  onChange={(e) =>
                    e.target.checked
                      ? setDeletedImages((init) => [...init, image.filename])
                      : setDeletedImages((init) => [
                          ...init.filter((file) => file !== image.filename),
                        ])
                  }
                />
                <span className='checkmark'></span>
              </label>
            </motion.div>
          ))}
        </ImgsInputsContainer>
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
const ImgsInputsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  justify-items: center;

  .img-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    .image {
      flex: 1;
      width: 70%;
      img {
        border: 1px solid white;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .form {
    display: block;
    flex-direction: column;
    position: relative;
    padding-left: 35px;
    margin-top: 12px;
    cursor: pointer;
    font-size: 18px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkmark {
      position: absolute;
      top: 0px;
      left: 8px;
      height: 20px;
      width: 20px;
      background-color: #eee;
    }
  }
  .form:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .form input:checked ~ .checkmark {
    background-color: #23d997;
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  .form input:checked ~ .checkmark:after {
    display: block;
  }
  .form .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export default EditForm
