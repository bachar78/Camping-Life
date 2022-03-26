import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { motion } from 'framer-motion'

function Header() {
  return (
    <Nav>
      <h1>
        <Link id='Logo' to='/'>
          CampLIFE
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/campgrounds'>Campgrounds</Link>
          {/* <Line variants={pathname==='/campgrounds'?UnderLine:''} initial="hidden" animate="show"></Line> */}
        </li>
        <li>
          <Link to='/register'>Register</Link>
          {/* <Line variants={pathname==='/contacts'?UnderLine:''} initial="hidden" animate="show"/> */}
        </li>
        <li>
          <Link to='/login'>Login</Link>
          {/* <Line variants={pathname==='/contacts'?UnderLine:''} initial="hidden" animate="show"/> */}
        </li>
      </ul>
    </Nav>
  )
}

const Nav = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: #282828;
  position: sticky;
  top: 0;
  z-index: 10;
  ul {
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
  }
  h1 {
    flex: 1;
    #Logo {
      font-size: 2rem;
      font-family: 'Lobster', cursive;
      font-weight: lighter;
    }
  }
`

export default Header
