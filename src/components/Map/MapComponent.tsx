'use client'
import { useEffect, useRef, useState } from "react"
import { Marker } from "./Marker"
import { Coordinates, SetCoordinates } from "."

export function MapComponent({
  center,
  zoom,
  setCoordinates
}: {
  center: Coordinates
  zoom: number
  setCoordinates?: SetCoordinates
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        fullscreenControl: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
      })
      setMap(newMap)

      // Add a click listener to the map
      newMap.addListener("click", (event: google.maps.MapMouseEvent) => {
        const clickedCoordinates: Coordinates = {
          lat: event.latLng?.lat() || 0,
          lng: event.latLng?.lng() || 0,
        };
        setCoordinates && setCoordinates(clickedCoordinates); // Call the setCoordinates function to update the parent component's state
      });
    }
  }, [])

  // Watch for changes to the center prop
  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center])

  return (
    <div style={{ height: 280, width: "100%", marginTop: 20, }} ref={ref}>
      {map && <Marker coordinates={center} map={map} />}
    </div>
  )
}