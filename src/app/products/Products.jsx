
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import ProductsResponsive from './ProductsResponsive'
import ProductsWeb from './ProductsWeb'
import SWRHandler from '@/services/useSWRHook'

function Products() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <ProductsResponsive/>
  return <ProductsWeb/>
}

export default Products
  