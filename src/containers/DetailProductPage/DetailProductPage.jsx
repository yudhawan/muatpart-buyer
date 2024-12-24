
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import DetailProductPageResponsive from './DetailProductPageResponsive'
import DetailProductPageWeb from './DetailProductPageWeb'
import SWRHandler, { SWRHandlerConfig } from '@/services/useSWRHook'
import mockdata from './detail.json'
function DetailProductPage({product,params}) {
  const [state,setState]=useState()
  const [showDescription,setShowDescription]=useState(false)
  const [getExpanded,setExpanded]=useState(['scania'])
  function handleExpanded(id) {
      if (getExpanded.some(val => val === id)) {
          let tmp = getExpanded.filter(val => val !== id);
          setExpanded(tmp);
      } else {
          setExpanded(prev => [...prev, id]);
      }
  }
  const {useSWRHook,useSWRMutateHook}=SWRHandlerConfig
  const {data} = useSWRHook('http://192.168.7.77:3010/v1/muatparts/buyer/product/TokoHasyim%205/Kabel%20Jumper%20Universal')
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <DetailProductPageResponsive product={product} getExpanded={getExpanded} handleExpanded={handleExpanded} {...mockdata} />
  return <DetailProductPageWeb setShowDescription={setShowDescription} showDescription={showDescription} product={product} getExpanded={getExpanded} handleExpanded={handleExpanded} {...mockdata} />
}

export default DetailProductPage
  