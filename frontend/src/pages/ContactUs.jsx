import React from 'react'
//frame motion
import { AnimateSharedLayout, motion } from 'framer-motion'
import styled from 'styled-components'
import { pageAnimation, titleAnim } from '../animation'
import Toggle from '../components/Toggle'
import Contact from './components/Contact'
const ContactUs = () => {
  return (
    <Contacts
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <Hidden>
        <motion.h1 variants={titleAnim}>
          OUR <span>OFFICES</span>.
        </motion.h1>
      </Hidden>
      <AnimateSharedLayout>
        <Offices>
          <Toggle city='Amsterdam'>
            <Contact />
          </Toggle>
          <Toggle city='Rotterdam'>
            <Contact />
          </Toggle>
          <Toggle city='Utrecht'>
            <Contact />
          </Toggle>
        </Offices>
      </AnimateSharedLayout>
    </Contacts>
  )
}
const Contacts = styled(motion.div)`
  min-height: 90vh;
  display: block;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.1)
    ),
    url("https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.9);
  h1 {
    font-size: 3rem;
    margin: 3rem 0;
    text-align:center;
    span {
      font-style: italic;
    }
  }

  h2 {
    font-weight: lighter;
  }
`
const Offices = styled(motion.div)`
  overflow: hidden;
  display: grid;
  padding: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 2rem;
`

const Hidden = styled(motion.div)`
  overflow: hidden;
`
export default ContactUs
