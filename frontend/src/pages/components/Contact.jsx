import React from 'react'
import {
  ImPhone,
  ImMail3,
  ImLocation,
  ImEarth,
  ImPlay,
  ImInstagram,
  ImWhatsapp,
  ImFacebook,
  ImTwitter,
} from 'react-icons/im'
import styled from 'styled-components'

function Contact() {
  return (
    <ContactStyled className='contact'>
      <div className='social-media'>
        <ImFacebook className='media' />
        <ImTwitter className='media' />
        <ImPlay className='media' />
        <ImInstagram className='media' />
      </div>
      <div className='social-media'>
        <ImPhone className='media' />
        <ImWhatsapp className='media' />
        +31-0000-9890
      </div>
      <div className='social-media'>
        <ImMail3 className='media' />
        #######@camplif.nl
        <ImEarth style={{ marginLeft: '2rem' }} className='media' />
        www.camplifeNetherland.nl
      </div>
      <div className='social-media'>
        <ImLocation className='media' /> ####### 1906AK, ####, Netherlands
      </div>
    </ContactStyled>
  )
}

const ContactStyled = styled.div`
  padding: 1rem 0rem;
  .social-media {
    font-size: 1.5rem;
    color: #cccccc;
    .media {
      margin: 2rem 2rem 2rem 0rem;
    }
  }
`

export default Contact
