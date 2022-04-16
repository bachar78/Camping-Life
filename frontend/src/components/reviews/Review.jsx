import React from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
}

const Review = ({ review }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(
    (state) => state.auth
  )
  const stars = Array(5).fill(0)
  const rating = stars.map((rate, index) => (
    <FaStar
      key={index}
      color={review.rating > index ? colors.orange : colors.grey}
    />
  ))
  return (
    <Container>
      <h4> By:{review.author.username}</h4>
      <h4>{rating}</h4>
      <h4>{review.review}</h4>
      <div>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </Container>
  )
}

const Container = styled.div``
export default Review
