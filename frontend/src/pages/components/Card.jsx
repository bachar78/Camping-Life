import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../animation'

function CampgroundCard({ campground }) {
  return (
    <motion.div
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <Card>
        <Image>
          <img
            src={campground.images[0] ? campground.images[0].url : ''}
            alt='campground'
          />
        </Image>
        <Description className='description'>
          <h1>{campground.title}</h1>
          <h3>{campground.address}</h3>
          <h2>Price: ${campground.price}</h2>
          <Link to={`/campgrounds/${campground._id}`}>
            <button>view details</button>
          </Link>
        </Description>
      </Card>
    </motion.div>
  )
}

const Card = styled(motion.div)`
  height: 500px;
  position: relative;
  display: flex;
  align-items: flex-end;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(20px);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 176, 155, 0.5),
      rgba(150, 201, 16, 1)
    );
    z-index: 2;
    transition: 0.3s all ease-in-out;
    opacity: 0;
  }
  &:hover::before {
    opacity: 1;
  }
  &:hover .description {
    opacity: 1;
    transform: translateY(0px);
  }
`
const Image = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Description = styled(motion.div)`
  padding: 0rem 0.8rem;
  height: 85%;
  position: relative;
  z-index: 3;
  color: #fff;
  opacity: 0;
  transform: translateY(30px);
  transition: 0.3s all;

  h1 {
    font-size: 2.2rem;
    margin: 1rem 0rem;
  }
  h3 {
    margin: 2rem 0rem;
    font-size: 1.4rem;
    font-weight: lighter;
    text-align: center;
  }
  h2 {
    margin-bottom: 2rem;
    font-size: 2.2rem;
    text-align: right;
    font-weight: bold;
  }
  button {
    width: 100%;
    text-transform: uppercase;
    border: 2px solid white;
    &:hover {
      background: transparent;
      background: black;
    }
  }
`

export default CampgroundCard
