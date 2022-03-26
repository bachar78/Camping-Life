import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Wave from '../components/Wave'
//frame motion
import { motion } from 'framer-motion'
import { pageAnimation, titleAnim, fade, photoAnim } from '../animation'
import OnScroll from '../components/OnScroll'

const HomePage = () => {
  return (
    <motion.div
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <Home>
        <OnScroll/>
        <Description>
          <motion.div>
            <Hide>
              <motion.h2 variants={titleAnim}> Want to explore the</motion.h2>
            </Hide>
            <Hide>
              <motion.h2 variants={titleAnim}>nature?</motion.h2>
            </Hide>
            <Hide>
              <motion.h2 variants={titleAnim}>
                Welcome to <span>CampLIFE</span>
              </motion.h2>
            </Hide>
          </motion.div>
          <motion.p variants={fade}>
            Jump right in and explore our many campgrounds in{' '}
            <span>Netherlands.</span> <br /> Feel free to share some of your own
            experience and comment on others!
          </motion.p>
          <Link to='/contacts'>
            <motion.button variants={fade}>Contact Us</motion.button>
          </Link>
        </Description>
        <Image>
          <motion.img
            variants={photoAnim}
            src='home.jpg'
            style={{ width: '42rem' }}
            alt='a tent at evening'
          />
        </Image>
        <Wave />
      </Home>
    </motion.div>
  )
}

//Styled Components
const Home = styled(motion.div)`
  min-height: 90vh;
  max-width: 100rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 4rem;
`
const Description = styled.div`
  flex: 1;
  z-index: 2;
  padding-right: 5rem;
  h2 {
    font-weight: lighter;
  }
`
const Image = styled(motion.div)`
  /* flex: 1; */
  overflow: hidden;
  z-index: 2;
  img {
    width: 100%;
    height: 80vh;
    object-fit: cover;
  }
`
const Hide = styled.div`
  overflow: hidden;
`
export default HomePage
