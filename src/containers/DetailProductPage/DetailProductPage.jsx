
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import DetailProductPageResponsive from './DetailProductPageResponsive'
import DetailProductPageWeb from './DetailProductPageWeb'
import SWRHandler from '@/services/useSWRHook'

function DetailProductPage({product}) {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <DetailProductPageResponsive product={product} />
  return <DetailProductPageWeb product={product} />
}

export default DetailProductPage
  