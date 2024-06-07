'use client'
import React, { useEffect, useRef, useState } from 'react';
import { LatLong } from '@/types';
import { useJsApiLoader } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'

const libs: Library[] = ["core", "maps", "places", "marker"]
function Map(latlong: LatLong) {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        libraries: libs
    })

    const mapRef = useRef<HTMLDivElement>(null)
    const placeAutocompleteRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isLoaded) {
            const mapOptions = {
                center: {
                    lat: latlong.coordinates[0],
                    lng: latlong.coordinates[1]
                },
                zoom: 15,
                mapId: 'My-Map-123'
            }
            //setup the map
            const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions)
        }
    }, [isLoaded])
    return (
        <div className='flex flex-col space-y-4'>
            {isLoaded ?
                <div style={{ height: '400 px' }} ref={mapRef} />
                : <p> loading...</p>
            }

        </div>
    )
}

export default Map;