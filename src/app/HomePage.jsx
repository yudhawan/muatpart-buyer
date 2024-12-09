'use client'
import { ResponsiveContext } from '@/common/ResponsiveContext'
import React, { useContext } from 'react'

function HomePage() {
    const {setAppBarTypeMobile,appBarType,onBack} = useContext(ResponsiveContext)
  return (
    <div>
      <button onClick={()=>{
            setAppBarTypeMobile('title')

        }}>screen 1</button>
      <button onClick={()=>{
            setAppBarTypeMobile('titleSecondary','screen 2')
        }}>screen 2</button>
    </div>
  )
}

export default HomePage
