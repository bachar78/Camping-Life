import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HomePage = () => {
  return (
    <Home>
      <Description>
        <div className='title'>
          <Hide>
            <h2>Want to explore the</h2>
          </Hide>
          <Hide>
            <h2>nature?</h2>
          </Hide>
          <Hide>
            <h2>
              Welcome to <span>CampLIFE</span>
            </h2>
          </Hide>
        </div>
        <p>
          Jump right in and explore our many campgrounds in{' '}
          <span>Netherlands.</span> <br /> Feel free to share some of your own
          experience and comment on others!
        </p>
        <Link to='/campgrounds'>
          <button>Contact Us</button>
        </Link>
      </Description>
      <Image>
        <img
          src='home.jpg'
          style={{ width: '42rem' }}
          alt='a tent at evening'
        />
      </Image>
    </Home>
  )
}

//Styled Components
const Home = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 4rem;
`
const Description = styled.div`
  flex: 1;
  padding-right: 5rem;
  h2 {
    font-weight: lighter;
  }
`
const Image = styled.div`
  flex: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 80vh;
    object-fit: cover;
    transform: scale(1.2);
  }
`
const Hide = styled.div`
  overflow: hidden;
`
export default HomePage
