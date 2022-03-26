import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCampgrounds } from '../features/campgrounds/campgroundsSlice'
import { Link } from 'react-router-dom'
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
    <motion.div exit='exit' variants={pageAnimation} initial='hidden' animate='show'>
      {campgrounds &&
        campgrounds.map((campground) => (
          <h1 key={campground._id}>
            <Link to={campground._id}>{campground.title}</Link>
          </h1>
        ))}
    </motion.div>
  )
}
export default AllCampgrounds
