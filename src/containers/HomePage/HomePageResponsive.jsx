import { useHeader } from '@/common/ResponsiveContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ProductComponent from '@/components/ProductComponent/ProductComponent'
import style from './HomePage.module.scss'
import Bubble from '@/components/Bubble/Bubble'
import categories from './mock'
import ScreenSubCategories from './ScreenSubCategories'
function HomePageResponsive({lastSeenProducts}) {
  const {
    setAppBar, 
    clearScreen,// reset appBar
    setScreen, // set screen
    screen, // get screen,
    setGlobalPadding
  }=useHeader()
  useEffect(()=>{
    setGlobalPadding(false)
  },[])
  const [getCategory,setCategory]=useState(null)
  if (screen==='screenSubCategories') return <ScreenSubCategories data={getCategory} />
  // main screen
  return (
    <div className="flex flex-col pb-6">
      {/* Carousel */}
      <section>carousel</section>
      {/* Kategori */}
      <section className='flex flex-col gap-4 py-4 px-4'>
        <h1 className='text-base text-neutral-900 font-semibold'>Kategori</h1>
        <div className='flex gap-[6px]'>
          {categories.map(val=><div key={val.id} className='flex w-[46px] flex-col gap-1 justify-center' onClick={()=>{
            setCategory(val)
            setScreen('screenSubCategories')
            setAppBar({
              appBarType:'titleModalSecondary',
              title:'Kategori '+val.name,
              onBack:()=>clearScreen(),
              renderActionButton:<span className='w-4 bg-transparent'></span>
            })
          }}>
            <div className='border border-[#d7d7d7] rounded-md overflow-hidden w-12 h-12'>
              <Image src={'/img/gojek.png'} width={48} height={48} className='w-full h-full object-contain' alt={val.name} />
            </div>
            <span className='text-[#1b1b1b] h-7 text-[10px] font-medium line-clamp-2 text-center'>{val.name}</span>
          </div>)}
        </div>
      </section>
      {/* Terakhir Dilihat */}
      <section className={`flex flex-col gap-4 w-full my-6 pl-4`}>
        <h1 className='text-neutral-900 font-semibold text-base'>Terakhir Dilihat</h1>
        <div className={`${style.sectionHideScroll} w-full flex gap-2 overflow-x-auto`}>
          {
            lastSeenProducts.products.map(val=>{
              return <ProductComponent key={val.id} {...val} />
            })
          }
        </div>
      </section>
      {/* Carousel */}
      <section>carousel</section>
      {/* Buble */}
      <section className={`${style.sectionHideScroll} flex gap-2 w-full overflow-x-auto py-4 pl-4`}>
        <Bubble classname={`py-2 px-3 text-sm font-medium bg-primary-50 !max-w-none whitespace-nowrap`}>Produk yang banyak dikunjungi</Bubble>
        <Bubble classname={`py-2 px-3 text-sm font-medium !bg-neutral-200 !border-neutral-200 !text-neutral-900 !w-fit !max-w-none whitespace-nowrap`}>Mungkin kamu juga suka</Bubble>
        <Bubble classname={`py-2 px-3 text-sm font-medium !bg-neutral-200 !border-neutral-200 !text-neutral-900 !w-fit !max-w-none whitespace-nowrap`}>Mungkin kamu juga suka</Bubble>
      </section>
      {/* list products */}
      <section className={`h-fit ${style.listProducts} p-4`}>
        {
          lastSeenProducts.products.map(val=>{
            return <ProductComponent key={val.id} {...val} />
          })
        }
      </section>
      {/* carousel */}
      <section>carousel</section>
      {/* keuntungan */}
      <section className='flex flex-col gap-[84px]'>
        <h1 className='text-xl text-neutral-900 font-bold text-center'>Keuntungan belanja di muatparts</h1>
        <div className='w-full bg-neutral-50 rounded-t-[40px] flex justify-center items-center px-4'>
          <div className='grid grid-cols-2 gap-6 -mt-12'>
            <div className='flex flex-col justify-center gap-3 items-center'>
              <Image src={'/img/keuntungan-1.png'} alt='keuntungan' width={100} height={100} />
              <p className='text-center text-xs text-neutral-900 font-semibold'>Layanan pengembalian 7 hari setelah pesanan selesai</p>
            </div><div className='flex flex-col justify-center gap-3 items-center'>
              <Image src={'/img/keuntungan-2.png'} alt='keuntungan' width={100} height={100} />
              <p className='text-center text-xs text-neutral-900 font-semibold'>Penjual yang Telah Bergabung</p>
            </div><div className='flex flex-col justify-center gap-3 items-center'>
              <Image src={'/img/keuntungan-3.png'} alt='keuntungan' width={100} height={100} />
              <p className='text-center text-xs text-neutral-900 font-semibold'>Layanan pengembalian 7 hari setelah pesanan selesai</p>
            </div><div className='flex flex-col justify-center gap-3 items-center'>
              <Image src={'/img/keuntungan-4.png'} alt='keuntungan' width={100} height={100} />
              <p className='text-center text-xs text-neutral-900 font-semibold'>Layanan pengembalian 7 hari setelah pesanan selesai</p>
            </div>
          </div>
        </div>
      </section>
      {/* carousel */}
      <section className='flex flex-col bg-neutral-50 pt-[60px]'>
        <h1 className='text-xl text-neutral-900 font-bold text-center'>Penjual yang Telah Bergabung</h1>
        {/* carousel */}
      </section>
    </div>
  )
}

export default HomePageResponsive