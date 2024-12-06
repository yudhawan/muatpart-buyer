'use client'
import React, { useEffect } from 'react'
import ResponsiveProvider from './ResponsiveContext'
import { viewport } from '@/store/viewport'

function App({children}) {
    const {setIsmobile}=viewport()
    useEffect(()=>{
        if(window.innerWidth<500) setIsmobile(true)
        else setIsmobile(false)
        window.addEventListener('resize',()=>{
            if(window.innerWidth<500) setIsmobile(true)
            else setIsmobile(false)
        })
        return ()=> window.addEventListener('resize',()=>{})
    },[])
  return (
    <ResponsiveProvider>
        <div className={`w-full max-w-[1280px] mx-auto`}>
            {children}
        </div>
    </ResponsiveProvider>
  )
}

export default App
