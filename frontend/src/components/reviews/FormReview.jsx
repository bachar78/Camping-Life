import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { createReview, reset } from '../../features/reviews/reviewsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../Spinner'
const FormReview = () => {
  const navigate = useNavigate()
  const [reviewData, setReviewData] = useState({ review: '', rating: 1 })
  const { review, rating } = reviewData
  const { id } = useParams()
  const dispatch = useDispatch()
  const onChange = (e) => {
    setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const { isLoading, isError, message } = useSelector((state) => state.reviews)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = { campId: id, reviewData }
    dispatch(createReview(data))
    setReviewData({ review: '', rating: 1 })
    navigate(`/campgrounds/${id}`)
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
      <Form onSubmit={onSubmit}>
        <label htmlFor='rating'>Rating</label>
        <input
          type='range'
          min='1'
          max='5'
          name='rating'
          id='rating'
          value={rating}
          onChange={onChange}
        />
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
