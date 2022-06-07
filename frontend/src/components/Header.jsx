import React, { useEffect } from 'react'
import styled from 'styled-components'
import { GiCampingTent } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'


function Header() {
  const dispatch = useDispatch()
  const { user, isLogged } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
  }
  return (
    <Nav>
      <h1>
        <Link id='Logo' to='/'>
          <h3>CampLIFE</h3>
          <GiCampingTent size={50} />
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/campgrounds'>See All</Link>
          {/* <Line variants={pathname==='/campgrounds'?UnderLine:''} initial="hidden" animate="show"></Line> */}
        </li>
        {user ? (
          <>
            <li onClick={onLogout} className='logout'>
              Logout
              {/* <Line variants={pathname==='/contacts'?UnderLine:''} initial="hidden" animate="show"/> */}
            </li>
            <li className='logout'>{user.username}</li>
          </>
        ) : (
          <>
            <li>
              <Link to='/register'>Regist</Link>
              {/* <Line variants={pathname==='/contacts'?UnderLine:''} initial="hidden" animate="show"/> */}
            </li>
            <li>
              <Link to='/login'>Login</Link>
              {/* <Line variants={pathname==='/contacts'?UnderLine:''} initial="hidden" animate="show"/> */}
            </li>
          </>
        )}

        <li>
          <Link to='/contacts'>Book</Link>
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
  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 1rem 0;
    ul {
      width: 100%;
      margin-top: 1rem 
    }
  }
  ul {
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    .logout {
      text-decoration: none;
      color: inherit;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
  h1 {
    flex: 1;
    #Logo {
      font-size: 2rem;
      font-family: 'Lobster', cursive;
      font-weight: lighter;
      display: flex;
      align-items: center;
    }
    h3 {
      margin-right: 0.5rem;
      font-weight: lighter;
    }
  }
`

export default Header
