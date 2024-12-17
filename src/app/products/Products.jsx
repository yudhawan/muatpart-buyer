
'use client'
import { viewport } from '@/store/viewport'
import React, { useContext, useState } from 'react'
import ProductsResponsive from './ProductsResponsive'
import ProductsWeb from './ProductsWeb'
import SWRHandler from '@/services/useSWRHook'
import { filterProduct } from '@/store/products/filter'
import ZustandHandler from '@/libs/handleZustand'
import { useHeader } from '@/common/ResponsiveContext'
import { brands, models, types,  years } from './screens/mockcdata'
function Products({allCategories,searchParams}) {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  // const {data:fetchCategories} = useSWRHook(process.env.NEXT_PUBLIC_GLOBAL_API+'muatparts/product/category')
  const {isMobile} = viewport()
  const getFilterProduct = filterProduct()
  const {handleInput} = new ZustandHandler(getFilterProduct)
  const {search,setSearch} = useHeader()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <ProductsResponsive getFilterProduct={getFilterProduct} handleInput={handleInput} search={search} setSearch={setSearch} products={[]} kompabilitas={{brand:brands,type:types,year:years,model:models}} allCategories={allCategories?.Data??[]} />
  return <ProductsWeb/>
}

export default Products
  