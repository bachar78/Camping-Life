import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCampgrounds } from '../features/campgrounds/campgroundsSlice'
import Spinner from '../components/Spinner'
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
  }, [])

  useEffect(() => {
    dispatch(getCampgrounds())
  }, [dispatch])
  return (
    <>
      {campgrounds &&
        campgrounds.map((campground) => (
          <h1 key={campground._id}>{campground.title}</h1>
        ))}
    </>
  )
}
export default AllCampgrounds
