"use client"
import React, { useEffect } from 'react'
import ComponentProvider from './ComponentProvider'
import { viewport } from '@/store/viewport'

function App({children}) {
    const {setIsmobile} = viewport()
    useEffect(()=>{
        if(window.innerWidth<500) setIsmobile(true)
        else setIsmobile(false)
        window.addEventListener('resize',()=>{
            if(window.innerWidth<500) setIsmobile(true)
            else setIsmobile(false)
        })
        return window.addEventListener('resize',()=>{})
    },[])
  return (
    <main>
        <ComponentProvider>
            {children}
        </ComponentProvider>
    </main>
  )
}

export default App
