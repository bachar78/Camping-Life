import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { createReview, reset } from '../../features/reviews/reviewsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../Spinner'
import { FaStar } from 'react-icons/fa'

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
}
const FormReview = () => {
  const stars = Array(5).fill(0)
  const navigate = useNavigate()
  const [reviewData, setReviewData] = useState({ review: '', rating: 0 })
  const [hoverValue, setHoverValue] = useState(null)
  const { review, rating } = reviewData
  const { id } = useParams()
  const dispatch = useDispatch()
  const onChange = (e) => {
    setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const { isLoading, isError, message } = useSelector((state) => state.reviews)

  const handleHover = (value) => {
    setReviewData((prev) => ({ ...prev, rating: value }))
  }
  const handleMouseOver = (value) => {
    setHoverValue(value)
  }
  const handleMouseLeave = () => {
    setHoverValue(null)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const data = { campId: id, reviewData }
    dispatch(createReview(data))
    setReviewData({ review: '', rating: 1 })
    
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <h1>Leave a review</h1>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={34}
            style={{
              marginRight: 10,
              cursor: 'pointer',
            }}
            color={
              (hoverValue || reviewData.rating) > index
                ? colors.orange
                : colors.grey
            }
            onClick={() => handleHover(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={() => handleMouseLeave()}
          />
        )
      })}
      <Form onSubmit={onSubmit}>
        <label htmlFor='review'>Review Text</label>
        <textarea
          id='review'
          type='textarea'
          name='review'
          rows='3'
          cols='30'
          value={review}
          onChange={onChange}
          placeholder='Enter your Review'
        />
        <button type='submit'>Submit</button>
      </Form>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default FormReview
