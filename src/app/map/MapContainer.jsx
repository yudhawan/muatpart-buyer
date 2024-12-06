"use client"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import React, { useCallback, useState } from 'react'

function MapContainer({lat,lng,zoom,width,height,classname}) {
    const [getCenter,setCenter]=useState({
        lat:7.2575,
        lng:112.7521
    })
    const [map,setMap] = useState(null)
    const onLoad= useCallback((a)=>{
        const bounds = new window.google.maps.LatLngBounds(getCenter)
        a.fitBounds(bounds)
        setMap(a)
    },[])
    const cleanUp = useCallback(()=>setMap(null),[])
    const {isLoaded}= useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey:'AIzaSyDSQlLIM9-7wYw-r0sH7gHizg_SjvMek34'
    })
    console.log(isLoaded)
  return isLoaded?(
    <div className={`overflow-hidden rounded-md ${width?width:'w-[200px]'} ${height?height:'h-[200px]'} ${classname}`}>
        <GoogleMap 
            center={getCenter}
            mapContainerStyle={{width:'100%',height:'100%'}}
            onLoad={onLoad}
            zoom={5}
            onUnmount={cleanUp}
        >

        </GoogleMap>
    </div>
  ):<></>
}

export default MapContainer
