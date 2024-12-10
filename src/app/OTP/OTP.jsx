
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import OTPResponsive from './OTPResponsive'
import OTPWeb from './OTPWeb'
import SWRHandler from '@/services/useSWRHook'

function OTP() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <OTPResponsive/>
  return <OTPWeb/>
}

export default OTP
  