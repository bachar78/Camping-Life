import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import UseScroll from '../../hooks/useScrolls'
import { scrollReveal } from '../../animation'
import { useDispatch, useSelector } from 'react-redux'
import { getCampground } from '../../features/campgrounds/campgroundsSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function CampgroundCard({ campground }) {
  const [element, controls, view] = UseScroll()
  const dispatch = useDispatch()
  const { isSuccess, isError, message } = useSelector(
    (state) => state.campgrounds
  )
  const navigate = useNavigate()
  const onDetails = () => {
    dispatch(getCampground(campground._id))
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate(`/campgrounds/${campground._id}`)
    }
  }

  return (
    <Card ref={element}>
      <Image variants={scrollReveal} initial='hidden' animate={controls}>
        <img
          src={campground.images[0] ? campground.images[0].url : ''}
          alt='campground'
        />
      </Image>
      <Description className='description'>
        <h1 style={{ fontSize: '1.8rem' }}>{campground.title}</h1>
        <h3>{campground.address}</h3>
        <h2>Price: ${campground.price}</h2>
        <button onClick={onDetails}>view details</button>
      </Description>
    </Card>
  )
}

const Card = styled(motion.div)`
  height: 500px;
  position: relative;
  display: flex;
  align-items: flex-end;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
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
  &:hover img {
    transform: scale(1.2);
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
    transition: 0.3s all ease-out;
  }
`
const Description = styled(motion.div)`
  padding: 0rem 0.8rem;
  height: 100%;
  position: relative;
  z-index: 3;
  color: #fff;
  opacity: 0;
  transform: translateY(30px);
  transition: 0.3s all;

  h1 {
    font-size: 1.6rem;
    margin: 2rem 0rem;
    transition: 0.3s all;
    &:hover {
      color: #23d997;
    }
  }
  h3 {
    margin: 3rem 0rem;
    font-size: 1.4rem;
    font-weight: lighter;
    text-align: center;
    transition: 0.3s all;
    &:hover {
      color: #23d997;
    }
  }
  h2 {
    margin-bottom: 4rem;
    font-size: 2.2rem;
    text-align: right;
    font-weight: bold;
    transition: 0.3s all;
    &:hover {
      color: #23d997;
    }
  }
  button {
    width: 100%;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    button {
      width: 70%;
    }
  }
`

export default CampgroundCard
