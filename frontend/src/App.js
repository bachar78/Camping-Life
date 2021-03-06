import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import AllCampgrounds from './pages/AllCampgrounds'
import SingleCampground from './pages/SingleCampground'
import GlobalStyle from './components/GlobalStyle'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import ContactUs from './pages/ContactUs'
import AddCampground from './pages/FormComponents/AddCampground'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditForm from './pages/FormComponents/EditForm'
import { useEffect } from 'react'
//Animation
import { AnimatePresence } from 'framer-motion'
import SignIn from './pages/Signing/SignIn'
import SignUp from './pages/Signing/SignUp'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './features/auth/authSlice'

function App() {
  let location = useLocation()
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getUser()) 
  // }, [dispatch])
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='/campgrounds' element={<AllCampgrounds />} />
          <Route path='/new' element={<AddCampground />} />
          <Route path='/campgrounds/:id/edit' element={<EditForm />} />
          <Route path='/campgrounds/:id' element={<SingleCampground />} />
          <Route path='/contacts' element={<ContactUs />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
`
export default App
