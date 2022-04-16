import React from 'react'
//frame motion
import { AnimateSharedLayout, motion } from "framer-motion";
import styled from "styled-components";
import { pageAnimation, titleAnim } from '../animation'
const ContactUs = () => {
  return (
    <Contacts exit='exit' variants={pageAnimation} initial='hidden' animate='show'>
     <Hidden>
        <motion.h1 variants={titleAnim}>
          OUR <span>OFFICES</span>.
        </motion.h1>
      </Hidden>
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
    font-size: 4rem;
    span {
      font-style: italic;
    }
  }

  h2 {
    font-weight: lighter;
  }

  /* .contact-line {
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
    } */
  
`;

const Hidden = styled(motion.div)`
  overflow: hidden;
`;
export default ContactUs
