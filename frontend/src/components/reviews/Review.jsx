import React from 'react'
import styled from 'styled-components'

const Review = ({ review }) => {
  return (
    <Container>
      <h4>{review.rating}</h4>
      <h4>{review.review}</h4>
      <div>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
    
`
export default Review
