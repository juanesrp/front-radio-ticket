'use client'

import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { MapComponent } from "./MapComponent"


export type Coordinates = google.maps.LatLngLiteral | google.maps.LatLng
export type SetCoordinates = (coordinates: Coordinates) => void

const render = (status: Status, coordinates: Coordinates, setCoordinates?: SetCoordinates) => {
  switch (status) {
    case Status.LOADING:
      return <div>Spinner</div>
    case Status.FAILURE:
      return <div>Error component</div>
    case Status.SUCCESS:
      return <MapComponent center={coordinates} zoom={14} setCoordinates={setCoordinates} />
  }
}

type MapProps = {
  coordinates?: Coordinates
  setCoordinates?: SetCoordinates
}

export const Map = ({ coordinates, setCoordinates }: MapProps) => {
  return (
    <Wrapper
      apiKey="AIzaSyBDpyCap-2Qfmq_8ENjglxqHSr2CwlQ918"
      render={(status) => coordinates ? render(status, coordinates, setCoordinates) : <div/>}
      libraries={["places"]}
    />
  )
}