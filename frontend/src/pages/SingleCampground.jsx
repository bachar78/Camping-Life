import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  reset,
  getCampground,
  deleteCampground,
} from '../features/campgrounds/campgroundsSlice'

import { Link, useNavigate, useParams } from 'react-router-dom'

const SingleCampground = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { campground, isError, isLoading, isDeleted, isSuccess } = useSelector(
    (state) => state.campgrounds
  )

  useEffect(() => {
    dispatch(getCampground(id))
    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  const onDelete = () => {
    dispatch(deleteCampground(id))
    dispatch(reset())
    navigate('/campgrounds')
  }
  const onCreate = () => {
    dispatch(reset())
    navigate('/new')
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
          <img
            src={campground.images ? campground.images[1].url : ''}
            style={{ width: '30%' }}
            alt=''
          />
          <button onClick={onDelete}>Delete Campground</button>
          <button onClick={onCreate}>Add Campground</button>
        </>
      )}
    </div>
  )
}

export default SingleCampground
