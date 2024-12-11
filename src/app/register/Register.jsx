
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import SWRHandler from '@/services/useSWRHook'
import RegisterResponsive from './registerResponsive'
import RegisterWeb from './registerWeb'

function Register() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()

  const { data: dataBanks } = useSWRHook(`${process.env.NEXT_PUBLIC_API}v1/register/banks`)

  const banks = dataBanks?.Data || []
  const bankOptions = banks.map(bank => ({ name: bank.value, value: bank.id }))

  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <RegisterResponsive/>
  return (
    <RegisterWeb
      bankOptions={bankOptions}
    />
  )
}

export default Register
  