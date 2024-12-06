'use client'
import React, { useEffect } from 'react'
import ResponsiveProvider from './ResponsiveContext'
import { viewport } from '@/store/viewport'

function App({children}) {
    const {setIsmobile}=viewport()
    useEffect(()=>{
        if(window.innerWidth<500) setIsmobile(true)
        else setIsmobile(false)
        document.addEventListener('resize',()=>{
            if(window.innerWidth<500) setIsmobile(true)
            else setIsmobile(false)
        })
        return ()=> document.addEventListener('resize',()=>{})
    },[])
  return (
    <ResponsiveProvider>
        <div>
            {children}
        </div>
    </ResponsiveProvider>
  )
}

export default App
