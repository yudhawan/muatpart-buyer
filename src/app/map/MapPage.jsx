'use client'

import MapContainer from "@/containers/MapContainer/MapContainer"
import MiniMap from "@/containers/MapContainer/MiniMap"

function MapPage() {
  return (
    <div className="w-full">
        <div className='flex flex-col w-[262px]'>
            <MiniMap/>
        </div>
    </div>
  )
}

export default MapPage