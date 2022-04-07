import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { pageAnimation, fade } from '../animation'
import { motion } from 'framer-motion'
import Spinner from '../components/Spinner'
import FormReview from '../components/reviews/FormReview'
import {
  getCampground,
  deleteCampground,
} from '../features/campgrounds/campgroundsSlice'
import { getReviews } from '../features/reviews/reviewsSlice'

import MapCampground from '../components/Maps/MapCampground'
import Review from '../components/reviews/Review'
import { Carousel } from 'react-bootstrap'

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
    <motion.div
      exit='exit'
      variants={pageAnimation}
      initial='hidden'
      animate='show'>
      {campground && (
        <>
          <MapCampground campground={campground} />
          <Carousel>
            {campground.images && campground.images.map((image, index) => (
              <Carousel.Item key={index} interval={3000}>
                <img
                  className='d-block w-100'
                  src={image.url}
                  alt={image.fileName}
                />
                <Carousel.Caption>
                  <h3>{campground.title}</h3>
                  <p>{campground.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <motion.h1 variants={fade}>{campground.title}</motion.h1>
          <motion.h1 variants={fade}>{campground.state}</motion.h1>
          <motion.h1 variants={fade}>{campground.location}</motion.h1>
          <motion.h1 variants={fade}>{campground.zip_code}</motion.h1>
          <motion.h1 variants={fade}>{campground.createdAt}</motion.h1>
          <motion.button variants={fade} onClick={onDelete}>
            Delete Campground
          </motion.button>
          <Link to='/campgrounds'>
            <motion.button variants={fade}>Back to Campgrounds</motion.button>
          </Link>
          <motion.button
            onClick={() =>
              navigate(`/campgrounds/${campground._id}/edit`, {
                state: campground,
              })
            }
            variants={fade}>
            Edit Campgrounds
          </motion.button>
          <FormReview />
          {reviews &&
            reviews.map((review) => (
              <Review key={review._id} review={review} />
            ))}
        </>
      )}
    </motion.div>
  )
}

export default SingleCampground
