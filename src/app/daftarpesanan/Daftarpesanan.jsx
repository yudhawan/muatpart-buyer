
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import DaftarpesananResponsive from './DaftarpesananResponsive'
import DaftarpesananWeb from './DaftarpesananWeb'
import SWRHandler from '@/services/useSWRHook'

function Daftarpesanan() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <DaftarpesananResponsive/>
  return <DaftarpesananWeb/>
}

export default Daftarpesanan
  