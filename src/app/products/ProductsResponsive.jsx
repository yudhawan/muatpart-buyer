
import { useHeader } from '@/common/ResponsiveContext'
import React, { useEffect, useMemo, useState } from 'react'
import style from './Products.module.scss'
import Button from '@/components/Button/Button'
import IconComponent from '@/components/IconComponent/IconComponent'
import FilterScreenProduct from './screens/FilterScreenProduct'
import LokasiScreenProduct from './screens/LokasiScreenProduct'
import CategoryScreenProduct from './screens/CategoryScreenProduct'
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import BrandScreenProduct from './screens/BrandScreenProduct'
import DataNotFound from '@/components/DataNotFound/DataNotFound'
import Input from '@/components/Input/Input'
import { mockProductsData } from '@/containers/HomePage/mock'
import ProductComponent from '@/components/ProductComponent/ProductComponent'
import GarasiCardComponent from '@/components/GarasiCardComponent/GarasiCardComponent'
import { categoriesDummy } from './screens/mockcategories'
function ProductsResponsive({products}) {
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
  const [getState,setState]=useState({
    email:'',
    desc:''
  })
  
  const actionFilter = useMemo(()=>{
    return <ButtonBottomMobile textLeft={'Reset'} textRight={'Terapkan'} onClickLeft={()=>{}} onClickRight={()=>{}} />
  },[screen])
  useEffect(()=>{
    setAppBar({
      appBarType:'main_compact',
    })
    setSearch({
      placeholder:'Cari Produk'
    })
    setMenu(menus[0])
  },[])
  
  useEffect(()=>{
    if(screen==='location') {
      setAppBar({
        appBarType:'header_search_secondary',
        onBack:()=> setScreen('filter'),
        shadow:true
      })
    }
    if(screen==='filter'){
      setAppBar({
        appBarType:'header_title_modal_secondary',
        title:'Filter',
        onAction:()=>console.log('reset'),
        onBack:()=>clearScreen()
      })
    }
    if(screen==='category'){
      setAppBar({
        appBarType:'header_title_modal_secondary',
        title:'Kategori',
        renderActionButton:<span className='w-8 h-2'></span>,
        withSearchBottom:'category',
        onBack:()=>{
          setScreen('filter')
          setAppBar({withSearchBottom:false})
        }
      })
    }
    if(screen==='brand') {
      setAppBar({
        appBarType:'header_search_secondary',
        onBack:()=> setScreen('filter'),
        shadow:true
      })
    }
  },[screen])

  if(screen==='filter') return <FilterScreenProduct isToko={getMenu?.id==='toko'} textLeft={getMenu?.id==='toko'?'Reset':''} textRight={getMenu?.id==='toko'?'Terapkan':''} />
  if(screen==='location') return <LokasiScreenProduct actionFilter={actionFilter} />
  if(screen==='category') return <CategoryScreenProduct actionFilter={actionFilter} categories={categoriesDummy} />
  if(screen==='brand') return <BrandScreenProduct actionFilter={actionFilter} />
  // main screen
  return (
    <div className={style.main}>
      <div className={`bg-neutral-50  flex items-center ${style.tabMenu} shadow-md`}>
          {
              menus.map(val=><div key={val.id} onClick={()=>setMenu(val)} className={`${val.id===getMenu?.id?'text-[#c22716]':'text-neutral-700'} font-bold text-sm pt-4 pb-[11px] border-b-2 ${val.id===getMenu?.id?'border-[#c22716] border-b-2':'border-neutral-200'} w-[50%] whitespace-nowrap text-center`}>{val.name}</div>)
          }
      </div>
      <div className='containerMobile flex gap-2 p-4 bg-[#ffffff]'>
          <button  onClick={()=>{
            setAppBar({
              appBarType:'header_title_modal_secondary',
              title:'Filter',
              onAction:()=>console.log('reset'),
              onBack:()=>clearScreen()
            })
            setScreen('filter')
            setSearch({
              placeholder:'Cari Produk'
            })
          }} className={`${style.filterButton} ${!products?'!text-neutral-600':''}`} >
            <span>Filter</span>
            <IconComponent classname={`${products?style.iconFilter:style.iconFilterDisable}`} src='/icons/filter.svg' />
          </button>
          <button  className={`${style.filterButton} ${!products?'!text-neutral-600':''}`} >
            <span>Urutkan</span>
            <IconComponent classname={`${products?style.iconFilter:style.iconFilterDisable}`} src='/icons/sorting.svg' />
          </button>
      </div>
      <div className='mt-4 flex flex-col gap-2 pb-5'>
        {/* list products */}
        {
          products?
          <></>
          :<>
          <DataNotFound textClass={'!font-semibold !text-sm !text-neutral-600 !w-[111px]'} title='Keyword 
  Tidak Ditemukan' />
          <div className='flex flex-col gap-6 px-4 bg-neutral-50 py-5'>
            <div className={`flex gap-6 flex-col`}>
              <div className='flex flex-col gap-4'>
                <p className='font-semibold text-sm text-neutral-900'>Beritahu kami apa yang kamu cari</p>
                <p className='font-medium text-sm text-neutral-900'>Masukkan kamu akan membantu muatparts dalam mengoptimalkan hasil pencarian untuk menemukan variasi produk yang lebih luas</p>
              </div>
              <div className={`${getMenu?.id==='produk'?'flex-col':'flex-col-reverse'} flex gap-6`}>
                <div className='flex flex-col gap-4'>
                  <span className='font-semibold text-sm text-neutral-900 flex gap-1'>Email <p className='text-[10px]'>{'(Optional)'}</p></span>
                  <Input placeholder='Contoh : brikobatubata@mail.com' value={getState.email} changeEvent={(e)=>setState(prev=>({...prev,email:e.target.value}))} />
                </div>
                <div className='flex flex-col gap-4'>
                  <p className='font-semibold text-sm text-neutral-900'>Deskripsi Produk</p>
                  <p className='font-semibold text-sm text-neutral-900'>Label *</p>
                  <textarea className='border border-neutral-600 rounded-md py-[11px] px-3 placeholder:text-sm placeholder:font-semibold placeholder:text-neutral-600 h-[62px] outline-none' placeholder='Mohon deskripsikan produk yang kamu tidak temukan pada muatparts atau berikan saran kepada tim muatparts'></textarea>
                </div>
              </div>
            </div>
            <Button Class='self-end h-7'>Kirim</Button>
          </div>
          <div className='flex flex-col gap-4 bg-neutral-50 px-4 pt-4'>
            {
              getMenu?.id==='produk'?
              <span className='font-semibold text-base text-neutral-900'>Rekomendasi Produk Lain</span>
              :<span className='font-semibold text-base text-neutral-900'>Rekomendasi Penjual lain untuk kamu</span>
            }
            
            {/* list product/garasi rekomendasi */}
            <div className='grid grid-cols-2 gap-2'>
              {
                (getMenu?.id==='produk')&& mockProductsData?.products.map(val=><ProductComponent key={val.id} {...val} />)
              }
            </div>
            <div className='flex flex-col gap-2'>
              {
                (getMenu?.id==='toko')&& mockProductsData?.products.map(val=><GarasiCardComponent key={val.id} image={val.image} name={val.productName} timeStatus={val.warranty} trucks={val.storeName} location={val.location} soldCount={val.soldCount} star={val.star} products={mockProductsData?.products?.slice(0,3)} />)
              }
            </div>
          </div>
          </>
        }
      </div>

    </div>
  )
}

export default ProductsResponsive
  