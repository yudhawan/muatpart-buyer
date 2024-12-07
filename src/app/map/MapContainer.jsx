"use client"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import style from './MapContainer.module.scss'
import useSWR from 'swr'

async function fetchAddress([lat,lng]) {
    return new Promise((resolve,reject)=>{
        const geocoder = window.google.maps.Geocoder()
        const location = {lat,lng}
        geocoder.geocode({location},(res,stat)=>{
            if(stat==='OK' && res[0]){
                resolve(res[0])
            }else{
                reject('Geocode error'+stat)
            }
        })
    })
}

function MapContainer({lat=-7.2575,lng=112.7521,zoom=5,width,height,classname}) {
    const [getCenter,setCenter]=useState({
        lat,
        lng
    })
    const [getAddress,setAddress] = useState(null)
    const [map,setMap] = useState(null)
    const onLoad= useCallback((a)=>{
        const bounds = new window.google.maps.LatLngBounds(getCenter)
        a.fitBounds(bounds)
        setMap(a)
    },[])
    
    const onDragEnd = useCallback(()=>{
        if(map){
            const newCenter = map.getCenter()
            setCenter({
                lat: newCenter.lat(),
                lng: newCenter.lng(),
              });
        }
    },[map])
    const {data,error} = useSWR(getCenter?[getCenter.lat,getCenter.lng]:null,fetchAddress)
    const cleanUp = useCallback(()=>setMap(null),[])
    const {isLoaded}= useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey:process.env.NEXT_PUBLIC_MAP_API
    })
  return isLoaded?(
    <div style={{width:width+'px',height:height+'px'}} className={`overflow-hidden rounded-md w-[200px] h-[200px] ${classname}`}>
        <GoogleMap 
            center={getCenter}
            mapContainerStyle={{width:'100%',height:'100%'}}
            onLoad={onLoad}
            zoom={zoom}
            onUnmount={cleanUp}
            onDragEnd={onDragEnd}
        >
            <div className={style.marker}>
                <Image className='w-full h-full' src={'/icons/marker.svg'} width={40} height={58}  />
            </div>
        </GoogleMap>
    </div>
  ):<></>
}

export default MapContainer
