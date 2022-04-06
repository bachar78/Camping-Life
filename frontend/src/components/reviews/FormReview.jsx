import React from 'react'
import styled from 'styled-components'
const FormReview = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    console.log()
  }
    return (
        <>
            <h1>Leave a review</h1>
    <Form>
      <label htmlFor='rating'>Rating</label>
      <input type='range' min='1' max='5' name='rating' id='rating' />
      <label htmlFor='review'>Review Text</label>
      <textarea
        id='review'
        type='textarea'
        label=''
        rows='3'
        cols='30'
        // value={enteredValue}
        // onChange={valueChangeHandler}
        // onBlur={inputBlurHandler}
        placeholder='Enter your Review'
      />
      <button type='submit'>Submit</button>
            </Form>
            </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default FormReview
