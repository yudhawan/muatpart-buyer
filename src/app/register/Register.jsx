
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import SWRHandler from '@/services/useSWRHook'
import RegisterResponsive from './registerResponsive'
import RegisterWeb from './registerWeb'

function Register() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <RegisterResponsive/>
  return <RegisterWeb/>
}

export default Register
  