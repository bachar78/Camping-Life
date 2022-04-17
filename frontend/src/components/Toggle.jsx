import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { titleAnim, LineAnim } from '../animation'
import styled from 'styled-components'

const Toggle = ({ children, city }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <Hidden>
      <motion.div
        layout
        className='office'
        onClick={() => setToggle(!toggle)}
        variants={titleAnim}>
        <motion.h2 layout>
          <span>CampLIFE</span> in {city}
        </motion.h2>
        {toggle ? children : ''}
        <motion.div variants={LineAnim} className='contact-line'></motion.div>
      </motion.div>
    </Hidden>
  )
}

const Hidden = styled.div`
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  .contact-line {
    background: #cccccc;
    height: 0.2rem;
    margin: 2rem 0rem;
    width: 100%;
  }
  .office {
    padding-top: 3rem;
    cursor: pointer;
    @media (max-width: 1300px) {
      text-align: center;
    }
  }
`

export default Toggle
