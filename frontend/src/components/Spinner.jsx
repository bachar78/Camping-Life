import React from 'react'
import styled from 'styled-components'

function Spinner() {
  return (
    <LoadingSpinnerContainer>
      <LoadingSpinner>
        <LoadingSpinnerInner></LoadingSpinnerInner>
      </LoadingSpinner>
    </LoadingSpinnerContainer>
  )
}

const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingSpinner = styled.div`
  width: 164px;
  height: 164px;
  border: 18px solid;
  border-color: #23d997 transparent #23d997 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingSpinnerInner = styled.div`
  width: 84px;
  height: 84px;
  border: 18px solid;
  border-color: #d96ed4 transparent #d96ed4 transparent;
  border-radius: 50%;
`

export default Spinner
