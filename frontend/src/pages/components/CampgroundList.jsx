import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../animation'

function CampgroundList({ campground }) {
  return (
    <motion.div
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <Link to={`/campgrounds/${campground._id}`}>
        <CampgroundStyled>
          <Image>
            <img src={campground.images[0].url} alt='campground' />
          </Image>
          <Description>
            <h3>{campground.title}</h3>
            <h5>{campground.location}</h5>
            <h5>Price: ${campground.price}</h5>
          </Description>
        </CampgroundStyled>
      </Link>
    </motion.div>
  )
}

const CampgroundStyled = styled(motion.div)`
min-height: 30vh;
overflow: hidden;
  border-radius: 1rem;
  border: 1px solid white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  text-align: center;
  h5 {
    font-weight: lighter;
    margin: 1rem 0;
  }
`
const Image = styled.div`
  height: 30vh;
  width: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
    transform: scale(1.5)
  }
`
const Description = styled(motion.div)`
width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default CampgroundList
