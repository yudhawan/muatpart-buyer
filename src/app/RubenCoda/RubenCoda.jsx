
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import RubenCodaResponsive from './RubenCodaResponsive'
import RubenCodaWeb from './RubenCodaWeb'
import SWRHandler from '@/services/useSWRHook'

function RubenCoda() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <RubenCodaResponsive/>
  return <RubenCodaWeb/>
}

export default RubenCoda
  