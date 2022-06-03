import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
//import motion
import { fade } from '../animation'
import { motion } from 'framer-motion'
import Spinner from '../components/Spinner'
//import actions
import {
  getCampground,
  deleteCampground,
} from '../features/campgrounds/campgroundsSlice'
import { getReviews, setIsSuccess } from '../features/reviews/reviewsSlice'
//import map
import MapCampground from '../components/Maps/MapCampground'
//import Reviews
import Review from '../components/reviews/Review'
import FormReview from '../components/reviews/FormReview'
import Carousel from 'react-elastic-carousel'
import reviewService from '../features/reviews/reviewService'

const SingleCampground = () => {
  const [width, setWidth] = useState(0)
  const carousel = useRef()
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { campground, isError, isLoading, message } = useSelector(
    (state) => state.campgrounds
  )
  const { reviews, isSuccess } = useSelector((state) => state.reviews)
  const { user, isLogged } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  useEffect(() => {
    dispatch(getCampground(id))
    dispatch(getReviews(id))
    if (isSuccess) {
      dispatch(getReviews(id))
    }
    dispatch(setIsSuccess())
  }, [id, dispatch, isSuccess])

  const onDelete = () => {
    dispatch(deleteCampground(id))
    toast.success('Campground deleted')
    navigate('/campgrounds')
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    campground && (
      <Container>
        <Title variants={fade}>
          {' '}
          <span>CAMPGROUND: </span> {campground.title}
        </Title>
        <ImagesMap>
          <Image>
            {campground.images && (
              <Carousel className='carousel'>
                {campground.images.map((image, index) => (
                  <img key={index} src={image.url} alt='camp'/>
                ))}
              </Carousel>
            )}
          </Image>
          <MapButtons>
            <Map>
              <MapCampground campground={campground} />
            </Map>
            <Buttons>
              {user && campground && user._id === campground.owner._id ? (
                <motion.button
                  onClick={() =>
                    navigate(`/campgrounds/${campground._id}/edit`, {
                      state: campground,
                    })
                  }
                  variants={fade}
                >
                  Edit
                </motion.button>
              ) : null}
              {user && campground && user._id === campground.owner._id ? (
                <motion.button variants={fade} onClick={onDelete}>
                  Delete
                </motion.button>
              ) : null}
              <Link to='/campgrounds'>
                <motion.button variants={fade}>Back</motion.button>
              </Link>
              <Link to={isLogged ? '/contacts' : '/login'}>
                <motion.button variants={fade}>Book</motion.button>
              </Link>
            </Buttons>
          </MapButtons>
        </ImagesMap>
        <InfoForm>
          {isLogged && (
            <ReviewForm>
              <FormReview className='reviewForm' />
            </ReviewForm>
          )}
          <Information>
            <Description>
              {' '}
              <span>Description</span> {campground.description}
            </Description>
            <Price variants={fade}>
              {' '}
              <span>Price:</span> ${campground.price}{' '}
              <span className='night'>For Night</span>
            </Price>
            <Address variants={fade}>
              <span>Address:</span> {campground.address} - {campground.zip_code}
            </Address>
          </Information>
        </InfoForm>

        <Reviews ref={carousel}>
          <InnerReviews
            drag='x'
            dragConstraints={{
              right: 0,
            }}
          >
            {reviews &&
              reviews.map((review) => (
                <Review key={review._id} review={review} />
              ))}
          </InnerReviews>
        </Reviews>
      </Container>
    )
  )
}

const Container = styled(motion.div)`
  padding: 8rem;
  padding-top: 0;
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Title = styled(motion.h1)`
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  margin: 4rem 0;
`
const ImagesMap = styled(motion.div)`
  height: 50vh;
  width: 100%;
  display: flex;
  text-align: center;
`
const Image = styled(motion.div)`
  height: 50vh;
  width: 50%;
  .carousel {
    height: 100%;
    width: 100%;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const MapButtons = styled(motion.div)`
  width: 45%;
  height: 50vh;
  margin: 0 auto;
`
const Buttons = styled(motion.div)`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  button {
    font-weight: lighter;
    font-size: 1rem;
    cursor: pointer;
    width: 5rem;
    padding: 0.7rem 1.2rem;
    border: 1px solid #aaa;
    background: transparent;
    color: white;
    transition: all 0.2s ease;
    &:hover {
      background-color: #23d997;
      transform: translateY(-3px) scale(1.1);
      color: white;
      box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.5);
    }
  }
`
const Map = styled(motion.div)`
  height: 45vh;
  width: 100%;
`

const InfoForm = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
const ReviewForm = styled(motion.div)`
  width: 50%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Information = styled(motion.div)`
  width: 50%;
  padding: 4rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Description = styled(motion.p)`
  line-height: 1.5;
  text-align: justify;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`
const Price = styled(motion.h1)`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  z-index: 15;
  .night {
    color: #aaa;
    font-weight: lighter;
    font-size: 1.1rem;
  }
`
const Address = styled(Description)`
  padding: 0rem 0rem;
  color: #ccc;
  font-size: 1.2rem;
  line-height: 1.9;
`

const Reviews = styled(motion.div)`
  cursor: grab;
  margin: 0 30%;
  overflow: hidden;
`

const InnerReviews = styled(motion.div)`
  display: flex;
`
export default SingleCampground
