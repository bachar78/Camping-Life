import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { pageAnimation, fade } from '../animation'
import { motion } from 'framer-motion'
import Spinner from '../components/Spinner'
import {
  getCampground,
  deleteCampground,
} from '../features/campgrounds/campgroundsSlice'

const SingleCampground = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { campground, isError, isLoading, message } = useSelector(
    (state) => state.campgrounds
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  useEffect(() => {
    dispatch(getCampground(id))
  }, [id, dispatch])
  const onDelete = () => {
    dispatch(deleteCampground(id))
    // dispatch(reset())
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
          <motion.h1 variants={fade}>{campground.title}</motion.h1>
          <motion.h1 variants={fade}>{campground.state}</motion.h1>
          <motion.h1 variants={fade}>{campground.location}</motion.h1>
          <motion.h1 variants={fade}>{campground.zip_code}</motion.h1>
          <motion.h1 variants={fade}>{campground.createdAt}</motion.h1>
          <motion.img
            variants={fade}
            src={campground.images ? campground.images[1].url : ''}
            style={{ width: '30%' }}
            alt=''
          />
          <motion.button variants={fade} onClick={onDelete}>
            Delete Campground
          </motion.button>
          <Link to='/campgrounds'>
            <motion.button variants={fade}>Back to Campgrounds</motion.button>
          </Link>
          <motion.button
            onClick={() =>
              navigate(`/campgrounds/${campground._id}/edit`, {
                state: campground ,
              })
            } variants={fade}>
            Edit Campgrounds
          </motion.button>
        </>
      )}
    </motion.div>
  )
}

export default SingleCampground
