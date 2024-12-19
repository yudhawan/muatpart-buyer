
'use client'
import { viewport } from '@/store/viewport'
import React, { useEffect, useState } from 'react'
import CategoriesResponsive from './CategoriesResponsive'
import CategoriesWeb from './CategoriesWeb'
import SWRHandler from '@/services/useSWRHook'
import { categoriesZustand } from '@/store/products/categoriesZustand'
import { useRouter } from 'next/navigation'

function CategoriesPage({params,searchParams,allCategories}) {
  const router=useRouter()
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const categoriesParams = params?.slice(1)
  const {data,error,isLoading} = useSWRHook(process.env.NEXT_PUBLIC_GLOBAL_API+`/muatparts/product/category/${categoriesParams[0]}/${categoriesParams[1]}`)
  const {categories,generateCategoryFamily,getSubAndItem,setSubAndItem} =categoriesZustand()
  const generateSubItem = categories?.find(val=>val?.id===categoriesParams[0])?.['children']?.find(a=>a.id===categoriesParams[1])
  useEffect(()=>{
    generateCategoryFamily(categoriesParams)
  },[params])
  useEffect(()=>{
    setSubAndItem(generateSubItem?.children)
  },[categories])
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <CategoriesResponsive/>
  return <CategoriesWeb params={categoriesParams} searchParams={searchParams} products={data?.Data??[]} />
}

export default CategoriesPage
  