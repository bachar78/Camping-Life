import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getCampground } from '../features/campgrounds/campgroundsSlice'
import Spinner from '../components/Spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SingleCampground = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { campground, isError, isLoading, isSuccess } = useSelector(
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
    dispatch(getCampground(id))
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <div>
      {campground && (
        <>
          <h1>{campground.title}</h1>
          <h1>{campground.state}</h1>
          <h1>{campground.location}</h1>
          <h1>{campground.zip_code}</h1>
          <h1>{campground.createdAt}</h1>
          <img src={campground.images && campground.images[1].url} style={{width:'30%'}} alt="" />
        </>
      )}
    </div>
  )
}

export default SingleCampground
