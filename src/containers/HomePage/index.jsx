'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import HomePageResponsive from './HomePageResponsive'
import HomePageWeb from './HomePageWeb'
import SWRHandler from '@/services/useSWRHook'

function HomePage() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <HomePageResponsive/>
  return <HomePageWeb/>
}

export default HomePage