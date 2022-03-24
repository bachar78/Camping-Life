import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import AllCampgrounds from './pages/AllCampgrounds'
import SingleCampground from './pages/SingleCampground'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/campgrounds' element={<AllCampgrounds />} />
            <Route path='/campgrounds/:id' element={<SingleCampground />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
