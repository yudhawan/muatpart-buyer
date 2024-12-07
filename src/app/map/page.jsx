import React from 'react'
import MapContainer from './MapContainer'

function page() {
  return (
    <div className='w-full max-w-[1280px] mx-16 h-screen mt-[160px]'>
        <MapContainer width={500} height={500} />
    </div>
  )
}

export default page
