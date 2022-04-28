import { useEffect } from 'react'
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
import { getReviews } from '../features/reviews/reviewsSlice'
//import map
import MapCampground from '../components/Maps/MapCampground'
//import Reviews
import Review from '../components/reviews/Review'
import FormReview from '../components/reviews/FormReview'
import Carousel from 'react-elastic-carousel'

const SingleCampground = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { campground, isError, isLoading, message } = useSelector(
    (state) => state.campgrounds
  )
  const { reviews } = useSelector((state) => state.reviews)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  useEffect(() => {
    dispatch(getCampground(id))
    dispatch(getReviews(id))
  }, [id, dispatch])

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
        <Map>
          <MapCampground campground={campground} />
        </Map>
        <Image>
          <img src={campground.images && campground.images[0].url} alt='' />
        </Image>
        <Title variants={fade}> {campground.title}</Title>
        <Description>
          {' '}
          <span>Description</span> {campground.description}
        </Description>
        <Price variants={fade}>
          {' '}
          <span>Price:</span> ${campground.price}{' '}
          <span className='night'>per Night</span>
        </Price>
        <Address variants={fade}>
          <span>Address:</span> {campground.address} - {campground.zip_code}
        </Address>
        <ReviewForm>
          <FormReview className='reviewForm' />
        </ReviewForm>
        <Buttons>
          <motion.button
            onClick={() =>
              navigate(`/campgrounds/${campground._id}/edit`, {
                state: campground,
              })
            }
            variants={fade}>
            Edit
          </motion.button>
          <motion.button variants={fade} onClick={onDelete}>
            Delete
          </motion.button>
          <Link to='/campgrounds'>
            <motion.button variants={fade}>Back</motion.button>
          </Link>
          <Link to='/contacts'>
            <motion.button variants={fade}>Book</motion.button>
          </Link>
        </Buttons>
        <Reviews>
          {reviews &&
            reviews.map((review) => (
              <Review key={review._id} review={review} />
            ))}
        </Reviews>
      </Container>
    )
  )
}

const Container = styled(motion.div)`
  padding: 8rem;
  padding-top: 0;
  width: 70%;
  margin: 0 auto;
  column-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(11, 5vw);
  min-height: 90vh;
  border: 3px solid;
`
const Map = styled(motion.div)`
  grid-column: 1/4;
  grid-row: 2/5;
`
const Image = styled(motion.div)`
  grid-column: 4/7;
  grid-row: 2/5;
  border: 1px solid #23d997;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
const Title = styled(motion.h1)`
  grid-column: 1/7;
  grid-row: 1/2;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
`
const Description = styled(motion.p)`
  grid-column: 1/4;
  grid-row: 5/7;
  align-self: center;
  padding: 0;
  line-height: 1.5;
  text-align: justify;
  padding: 1rem 0;
`
const Price = styled(motion.h1)`
  grid-column: 4/7;
  grid-row: 4/5;
  font-size: 1.6rem;
  align-self: center;
  margin-left: 2rem;
  .night {
    color: #aaa;
    font-weight: lighter;
    font-size: 1.1rem;
  }
`
const Address = styled(Description)`
  grid-row: 7/8;
  text-align: justify;
  padding: 1rem 0;
`
const Buttons = styled(motion.div)`
  display: flex;
  grid-row: 8/9;
  grid-column: 1/4;
  justify-content: space-evenly;
  align-items: center;
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
const ReviewForm = styled(motion.div)`
  grid-row: 5/9;
  grid-column: 4/7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Reviews = styled(motion.div)`
  grid-column: 1/7;
  grid-row: 9/12;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`
export default SingleCampground
