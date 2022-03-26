import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCampgrounds } from '../features/campgrounds/campgroundsSlice'
import { Link } from 'react-router-dom'
import MapCluster from '../components/Maps/MapCluster'
import { fade, LineAnim } from '../animation'
import styled from 'styled-components'
import CampgroundList from './components/CampgroundList'
import OnScroll from '../components/OnScroll'
//framer motion
import { motion } from 'framer-motion'
import { pageAnimation } from '../animation'

const AllCampgrounds = () => {
  const dispatch = useDispatch()
  const { campgrounds, isError, isSuccess } = useSelector(
    (state) => state.campgrounds
  )
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getCampgrounds())
  }, [dispatch])

  return (
    <Container
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <OnScroll/>
      <motion.div variants={fade}>
        <motion.div className='line'></motion.div>
        <Map>
          <MapCluster data={campgrounds} />
        </Map>
        <motion.div className='line'></motion.div>
      </motion.div>
      <ContainerCampground variants={fade}>
        {campgrounds &&
          campgrounds.map((campground) => (
            <CampgroundList campground={campground} key={campground._id} />
          ))}
      </ContainerCampground>
    </Container>
  )
}

const Container = styled(motion.div)`
  min-height: 90vh;
  max-width: 100rem;
  margin: 0 auto;

  h1 {
    padding: 2rem 0rem 1rem 0rem;
    font-weight: bold;
    font-size: 2.5rem;
  }

  .line {
    height: 0.4rem;
    background: #23d997;
    margin: 0.5rem 0;
  }
`
const ContainerCampground = styled(motion.div)`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`

const Map = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`
export default AllCampgrounds
