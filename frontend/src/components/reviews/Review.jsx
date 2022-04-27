import React from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
}

const Review = ({ review }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const stars = Array(5).fill(0)
  const rating = stars.map((rate, index) => (
    <FaStar
      key={index}
      color={review.rating > index ? colors.orange : colors.grey}
    />
  ))
  return (
    <Container>
      <h4 className='reviewer'>
        {' '}
        <span>
          Reviewed By: <br></br>
        </span>
        {review.author.username}
      </h4>
      <h4>{rating}</h4>
      <h4 className='review'>{review.review}</h4>
      <Links>
        <Link className='left' to='/contacts'>
          Update
        </Link>
        <Link to='/contacts'>Delete</Link>
      </Links>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid #23d997;
  padding: 1rem 0;
  width: 20%;
  margin-top: 2rem;
  border-radius: 5px;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 1rem;
  .reviewer {
    text-align: center;
    line-height: 1.9;
  }
  .review {
    text-align: justify;
    line-height: 1.6;
    background-color: #a9a9a9;
    padding: 1rem 0;
    padding: 0 0.5rem;
    z-index: -10;
    width: 100%;
  }
`
const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  
  a {
    font-size: 0.8rem;
    transition: all .3s ease-out;
    padding: .5rem 1rem;
    &:hover {
      background-color: #23d997;
      transform: translateY(-3px) scale(1.1);
    }
  }
`
export default Review
