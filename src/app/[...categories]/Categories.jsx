
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import CategoriesResponsive from './CategoriesResponsive'
import CategoriesWeb from './CategoriesWeb'
import SWRHandler from '@/services/useSWRHook'

function Categories({params,searchParams}) {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <CategoriesResponsive/>
  return <CategoriesWeb params={params} searchParams={searchParams} />
}

export default Categories
  