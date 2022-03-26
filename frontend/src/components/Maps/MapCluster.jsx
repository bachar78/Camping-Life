import React, { useState, useRef } from "react";
import { ImLocation2 } from "react-icons/im";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import styled from "styled-components";
import 'mapbox-gl/dist/mapbox-gl.css';
function MapCluster({ data }) {
  const [viewport, setViewport] = useState({
    latitude: 52.132633,
    longitude: 5.291266,
    width: "100%",
    height: "35vh",
    zoom: 6,
  });
  const mapRef = useRef();

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;
  const points = data
    ? data.map((camping) => ({
        type: "Feature",
        properties: {
          cluster: false,
          campingId: camping._id,
          category: camping.location,
        },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(camping.longitude),
            parseFloat(camping.latitude),
          ],
        },
      }))
    : "";
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 25, maxZoom: 20 },
  });

  return (
    <ReactMapGL
      {...viewport}
      maxZoom={20}
      mapboxApiAccessToken="pk.eyJ1IjoiYmFjaGFyZCIsImEiOiJja3dhaG9sZjQwY2llMm9td3l4Y3h3bHczIn0.DgRQUmT-31rrvRIAHOZv0w"
      mapStyle='mapbox://styles/mapbox/light-v10'
          onViewportChange={(newViewport) => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      {data &&
        clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                <MarkerStyle
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 50}px`,
                    height: `${10 + (pointCount / points.length) * 50}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {pointCount}
                </MarkerStyle>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.campingId}
              latitude={latitude}
              longitude={longitude}
            >
              <Button>
                {" "}
                <ImLocation2 className="marker" />
              </Button>
            </Marker>
          );
        })}

    </ReactMapGL>
  );
}

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
`;

const MarkerStyle = styled.div`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default MapCluster;
