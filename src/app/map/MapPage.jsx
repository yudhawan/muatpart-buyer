'use client'

import MapContainer from "@/containers/MapContainer/MapContainer"

function MapPage() {
  return (
    <div>
        <div className='flex flex-col w-[262px]'>
            <MapContainer width={262} height={154} classname={'rounded-t-lg rounded-b-none'} />
            <span className="w-full h-[35px] rounded-b-lg text-white bg-primary-700 grid place-content-center cursor-pointer">Atur Pin Lokasi</span>
        </div>
    </div>
  )
}

export default MapPage