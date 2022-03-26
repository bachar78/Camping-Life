import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import AllCampgrounds from './pages/AllCampgrounds'
import SingleCampground from './pages/SingleCampground'
import GlobalStyle from './components/GlobalStyle'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import ContactUs from './pages/ContactUs'
//Animation
import { AnimatePresence } from 'framer-motion'

function App() {
  let location = useLocation()
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='/campgrounds' element={<AllCampgrounds />} />
          <Route path='/campgrounds/:id' element={<SingleCampground />} />
          <Route path='/contacts' element={<ContactUs />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
`
export default App
