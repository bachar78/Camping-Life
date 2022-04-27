import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import marker from '../../img/mapbox-icon.png'
import { ImLocation2 } from 'react-icons/im'
import styled from 'styled-components'

function MapCampground({ campground }) {
  const [viewport, setViewport] = useState({
    latitude: campground.latitude,
    longitude: campground.longitude,
    width: '100%',
    height: '100%',
    zoom: 12,
  })
  const [selectedCamp, setSelectedCamp] = useState(false)
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoiYmFjaGFyZCIsImEiOiJja3dhaG9sZjQwY2llMm9td3l4Y3h3bHczIn0.DgRQUmT-31rrvRIAHOZv0w'
      mapStyle='mapbox://styles/bachard/ckwa8wvo60anl15qorv13ml6c'
      onViewportChange={(viewport) => {
        setViewport(viewport)
      }}>
      <Marker latitude={campground.latitude} longitude={campground.longitude}>
        <Button
          onClick={(e) => {
            e.preventDefault()
            setSelectedCamp(true)
          }}>
          {' '}
          <ImLocation2 className='marker' src={marker} />
        </Button>
      </Marker>
      {selectedCamp ? (
        <Popup
          className='main'
          latitude={campground.latitude}
          longitude={campground.longitude}
          onClose={() => {
            setSelectedCamp(false)
          }}>
          <PopupStyled className='popup'>
            <h5>Owner: Bachar Dawod</h5>
            <h5>Email: bachar@######</h5>
            <h5>Tel: 06-8789878</h5>
          </PopupStyled>
        </Popup>
      ) : null}
    </ReactMapGL>
  )
}

const PopupStyled = styled.div`
  border-radius: 0.25rem;
  color: black;
  text-align: left;
  width: 100%;
  min-height: 2vh;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  h5 {
    margin-bottom: 4px;
  }
`

const Button = styled.button`
  border: none;
  border-radius: 90%;
  transition: all 1s ease;
  .marker {
    color: red;
    font-size: 2.5rem;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    .marker {
      color: white;
    }
  }
`

export default MapCampground
