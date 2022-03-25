import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCampgrounds } from '../features/campgrounds/campgroundsSlice'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
const AllCampgrounds = () => {
  const dispatch = useDispatch()
  const { campgrounds, isError, isLoading, isSuccess } = useSelector(
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
  if (isLoading) {
    return <Spinner/>
  }
  return (
    <>
      {campgrounds &&
        campgrounds.map((campground) => (
          <h1 key={campground._id}>
            <Link to={campground._id}>{campground.title}</Link>
          </h1>
        ))}
    </>
  )
}
export default AllCampgrounds
