import { useEffect, useState } from "react"
import { Coordinates } from "."

type MarkerProps = {
  coordinates: Coordinates
  map?: google.maps.Map
}

export const Marker = ({ map, coordinates }: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>()

  // Creates an empty Marker when component mounts
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }
  }, [])

  useEffect(() => {
    if (marker) {
      // remove the marker if the coordinates doesn't exist
      if (!coordinates?.lat && !coordinates?.lng) {
        return marker.setMap(null)
      }

      // Updates the marker
      marker.setOptions({
        map,
        position: coordinates,
      })
    }
  }, [coordinates, map, marker])

  // The component returns null as google.maps.Map manages the DOM manipulation.
  return null
}