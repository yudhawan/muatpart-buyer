
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import ROPPResponsive from './ROPPResponsive'
import ROPPWeb from './ROPPWeb'
import SWRHandler from '@/services/useSWRHook'

function ROPP() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return < ROPPResponsive/>
  return < ROPPWeb/>
}

export default ROPP
  