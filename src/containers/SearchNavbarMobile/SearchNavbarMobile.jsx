import React, { useState } from 'react'
import style from './SearchNavbarMobile.module.scss'
import Input from '@/components/Input/Input'
import IconComponent from '@/components/IconComponent/IconComponent'
import Image from 'next/image'
import SWRHandler from '@/services/useSWRHook'
import Button from '@/components/Button/Button'
function SearchNavbarMobile() {
    const menus=[
        {
            id:'name_produk',
            name:'Nama Produk'
        },
        {
            id:'type_of_transportation',
            name:'Jenis Kendaraan'
        },
    ]
    const [getTransportations,setTransportations] = useState({
        "transportation":{
            name:'Kendaraan',
            value:'Truk'
        },
        "brand":{
            name:'Pilih Brand',
            value:''
        },
        "year":{
            name:'Kendaraan',
            value:''
        },
        "model":{
            name:'Kendaraan',
            value:''
        },
        "type":{
            name:'Kendaraan',
            value:''
        },
        "key_query":{
            name:'Kendaraan',
            value:''
        },
        
    })  
    const [getActive,setActive] = useState('name_produk')
    const [getSearch,setSearch] = useState('')
    const {useSWRHook} = new SWRHandler()
    const url = (getActive==='name_produk'&&getSearch)?'url_api_pencarian_produk':'url_type_of_transportation'
    // const {data} = useSWRHook(url)
  return (
    <div className='flex flex-col bg-neutral-50 '>
        <div className={`bg-neutral-50  flex items-center ${style.tabMenu} shadow-md`}>
            {
                menus.map(val=><div key={val.id} onClick={()=>setActive(val.id)} className={`${val.id===getActive?'text-primary-700':'text-[#676767]'} font-bold text-sm pt-[10px] pb-[14px] px-10 border-b-2 ${val.id===getActive?'border-primary-700 border-b-2':'border-neutral-200'} w-[50%] whitespace-nowrap`}>{val.name}</div>)
            }
        </div>
        <div className='flex flex-col gap-5 containerMobile !pt-[80px]'>
            {(getActive==='name_produk')&&<Input 
                placeholder='Cari Produk' 
                value={getSearch} 
                changeEvent={e=>setSearch(e.target.value)} 
                icon={{left:'/icons/search.svg',right:getSearch?<span onClick={()=>setSearch('')}><IconComponent src={'/icons/closes.svg'} /></span>:''}}  />}
            {
                (getActive==='name_produk'&&getSearch)?
                <div></div>
                :getActive==='name_produk'?<div className='flex flex-col gap-3 '>
                    <span className='text-[#000000] text-sm font-semibold'>Promo yang paling banyak dicari</span>
                    <span className='h-[1px] w-full bg-neutral-400'></span>
                    <Image className='w-full' width={323} height={131} alt='adspr' src={'/img/ads_search_product_name.png'} />
                </div>:''
            }
            {
                (getActive==='type_of_transportation')&&
                <div className='flex flex-col gap-5'>
                    {
                        Object.entries(getTransportations).map((val,idx)=>{
                            return <Button 
                            key={idx}
                            iconLeft={<span className={`${val[1]['value']?'bg-primary-700':'bg-neutral-700'} rounded-full w-4 h-4 text-neutral-50 font-bold text-[10px] grid place-content-center`} >{idx+1}</span>}
                            iconRight={'/icons/chevron-down.svg'}
                            Class={`!all-none h-8 border border-neutral-600 rounded-md !bg-neutral-50 !w-full max-w-none justify-between !px-3 ${val[1]['value']?'!text-neutral-900':'!text-neutral-600'} font-semibold text-sm relative`}><span className='absolute top-[6px] left-[48px]'>{val[1]["value"]?val[1]["value"]:val[1]['name']}</span></Button>
                        })
                    }
                    
                </div>
            }
            {getActive==='type_of_transportation'&&<div className='fixed bottom-0 left-0 bg-white w-full h-[64px] py-3 px-4'>
                <Button Class='w-full max-w-none'>Cari Suku Cadang</Button>
            </div>}
        </div>
    </div>
  )
}

export default SearchNavbarMobile
