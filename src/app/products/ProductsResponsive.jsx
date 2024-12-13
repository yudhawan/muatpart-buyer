
import { useHeader } from '@/common/ResponsiveContext'
import React, { useEffect, useState } from 'react'
import style from './Products.module.scss'
import Button from '@/components/Button/Button'
import IconComponent from '@/components/IconComponent/IconComponent'
import FilterScreenProduct from './screens/FilterScreenProduct'
function ProductsResponsive() {
  const menus=[
    {
        id:'produk',
        name:'Produk'
    },
    {
        id:'toko',
        name:'Toko'
    },
  ]
  const {
    appbar,
    setAppBar, 
    clearScreen,
    setSearch,
    setScreen,
    screen
  }=useHeader()
  const [getMenu,setMenu]=useState()
  function AppbarFilter() {
    setAppBar({
      appBarType:'titleModalSecondary',
      title:'Filter',
      onAction:()=>console.log('reset'),
      onBack:()=>clearScreen()
    })
  }
  useEffect(()=>{
    setAppBar({
      appBarType:'mainCompact',
    })
    setSearch({
      placeholder:'Cari Produk'
    })
    setMenu(menus[0])
  },[])

  // useEffect(()=>{
  //   if(screen==='lokasi') AppbarFilter()
  // },[screen])

  if(screen==='filter') return <FilterScreenProduct/>
  if(screen==='lokasi') return <>lokasi</>
  // main screen
  return (
    <div className={style.main}>
      <div className={`bg-neutral-50  flex items-center ${style.tabMenu} shadow-md`}>
          {
              menus.map(val=><div key={val.id} onClick={()=>setMenu(val)} className={`${val.id===getMenu?.id?'text-[#c22716]':'text-neutral-700'} font-bold text-sm pt-4 pb-[11px] border-b-2 ${val.id===getMenu?.id?'border-[#c22716] border-b-2':'border-neutral-200'} w-[50%] whitespace-nowrap text-center`}>{val.name}</div>)
          }
      </div>
      <div className='containerMobile flex gap-2 p-4 bg-[#ffffff]'>
          <button onClick={()=>{
            AppbarFilter()
            setScreen('filter')
            setSearch({
              placeholder:'Cari Produk'
            })
          }} className={style.filterButton} >
            <span>Filter</span>
            <IconComponent classname={style.iconFilter} src='/icons/filter.svg' />
          </button>
          <button className={style.filterButton} >
            <span>Urutkan</span>
            <IconComponent classname={style.iconFilter} src='/icons/sorting.svg' />
          </button>
          <div className='mt-4'>
            {/* list products */}
          </div>
      </div>

    </div>
  )
}

export default ProductsResponsive
  