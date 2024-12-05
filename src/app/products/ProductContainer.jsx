'use client'
import { ComponentContext } from '@/common/ComponentProvider'
import React, { useContext, useEffect } from 'react'

function ProductContainer() {
    const {renderAppBar,renderScreen}=useContext(ComponentContext)
    useEffect(()=>{
        renderAppBar(<p>Product header</p>)
    },[])
  return (
    <div>
      sss
    </div>
  )
}

export default ProductContainer
