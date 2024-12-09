import React, { useState } from 'react'
import style from './SearchNavbarMobile.module.scss'
import Input from '@/components/Input/Input'
import IconComponent from '@/components/IconComponent/IconComponent'
import Image from 'next/image'
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
    const [getActive,setActive] = useState('name_produk')
    const [getSearch,setSearch] = useState('')
    // const {} = new()
  return (
    <div className='flex flex-col bg-neutral-50 relative'>
        <div className={`bg-neutral-50 absolute -top-4  flex items-center z-[93] -left-4 ${style.tabMenu} shadow-lg`}>
            {
                menus.map(val=><div key={val.id} onClick={()=>setActive(val.id)} className={`${val.id===getActive?'text-primary-700':'text-[#676767]'} font-bold text-sm pt-[10px] pb-[14px] px-10 border-b-2 ${val.id===getActive?'border-primary-700 border-b-2':'border-neutral-200'} w-full whitespace-nowrap`}>{val.name}</div>)
            }
        </div>
        <div className='flex flex-col mt-12 gap-5'>
            <Input 
                placeholder='Cari Produk' 
                value={getSearch} 
                changeEvent={e=>setSearch(e.target.value)} 
                icon={{left:'/icons/search.svg',right:getSearch?<span onClick={()=>setSearch('')}><IconComponent src={'/icons/closes.svg'} /></span>:''}}  />
            <div className='flex flex-col gap-3 '>
                <span className='text-[#000000] text-sm font-semibold'>Promo yang paling banyak dicari</span>
                <span className='h-[1px] w-full bg-neutral-400'></span>
                <Image className='w-full' width={323} height={131} alt='adspr' src={'/img/ads_search_product_name.png'} />
            </div>
        </div>
    </div>
  )
}

export default SearchNavbarMobile
