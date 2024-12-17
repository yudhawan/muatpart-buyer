
'use client'
import { viewport } from '@/store/viewport'
import React, { useEffect, useState } from 'react'
import CategoriesResponsive from './CategoriesResponsive'
import CategoriesWeb from './CategoriesWeb'
import SWRHandler from '@/services/useSWRHook'
import { categoriesZustand } from '@/store/products/categoriesZustand'
import { useRouter } from 'next/navigation'

function Categories({params,searchParams}) {
  const router=useRouter()
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const categoriesParams = params?.categories?.slice(1)
  const {data} = useSWRHook(process.env.NEXT_PUBLIC_GLOBAL_API+`/muatparts/product/category/${categoriesParams[0]}/${categoriesParams[1]}`)

  const {categoryFamily,generateCategoryFamily} =categoriesZustand()
  useEffect(()=>{
    generateCategoryFamily(categoriesParams)
  },[params])
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <CategoriesResponsive/>
  return <CategoriesWeb params={params} searchParams={searchParams} categories={data??[]} />
}

export default Categories
  