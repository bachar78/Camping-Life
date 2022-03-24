import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome in Camping Life</h1>
      <img  style={{width: '30%', display: "block"}} src='home.jpg' alt='' />
      <button>
        <Link to='/campgrounds'>Campgrounds</Link>
      </button>
    </div>
  )
}

export default HomePage
