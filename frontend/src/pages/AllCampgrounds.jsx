import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCampgrounds } from '../features/campgrounds/campgroundsSlice'
import { Link } from 'react-router-dom'
import MapCluster from '../components/Maps/MapCluster'
import styled from 'styled-components'
import CampgroundCard from './components/Card'

//framer motion
import { motion } from 'framer-motion'
import { pageAnimation, SliderContainer } from '../animation'
import { toast } from 'react-toastify'

const AllCampgrounds = () => {
  const dispatch = useDispatch()
  const { campgrounds, isError, isSuccess } = useSelector(
    (state) => state.campgrounds
  )
  const { isLogged } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error('Cant find the campgrounds')
    }
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess, isError])

  useEffect(() => {
    dispatch(getCampgrounds())
  }, [dispatch])

  return (
    <Container
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      <Map>
        <MapCluster data={campgrounds} />
      </Map>
      {isLogged ? (
        <Link to='/new'>
          <motion.button>Add Campground</motion.button>
        </Link>
      ) : null}
      <ContainerCampground>
        {campgrounds &&
          campgrounds.map((campground, index) => (
            <CampgroundCard campground={campground} key={campground._id} />
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  /* background: #fff; */
`

const Map = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`
export default AllCampgrounds
