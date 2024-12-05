"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './HomeContainer.module.scss'
import { ComponentContext } from '@/common/ComponentProvider'
import { useRouter } from 'next/navigation'
function HomeContainer() {
    const router = useRouter()
    const [geta,seta]=useState('')
    const {renderAppBar,renderScreen}=useContext(ComponentContext)
    useEffect(()=>{
        renderAppBar(<p>Home header</p>)
    },[])
  return (
    <div className={`${style.main} mt-20`}>
      sad
      <button onClick={()=>router.push('/products')}>produk</button>
      <button onClick={()=>renderScreen(<ChilHome a={'sceeen terrrr'} test={()=>console.log('ilham terr')} />)}>render a new screen</button>
    </div>
  )
}

export default HomeContainer

export const ChilHome = ({a,test})=>{
    return <div className='mt-20'>
        {a}
        <button onClick={test}>test</button>
    </div>
}