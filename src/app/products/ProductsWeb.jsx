'use client';
import { useEffect, useState } from 'react';
import style from './Products.module.scss';
import IconComponent from '@/components/IconComponent/IconComponent';
import Dropdown from '@/components/Dropdown/Dropdown';
import FilterProductsWeb from '@/containers/FilterProductsWeb/FilterProductsWeb';
import { hightlightText } from '@/libs/TypographServices';
import { mockProductsData } from '@/containers/HomePage/mock';
import ProductComponent from '@/components/ProductComponent/ProductComponent';
import GarasiCardComponent from '@/components/GarasiCardComponent/GarasiCardComponent';

function ProductsWeb({getFilterProduct, handleInput}) {
    const [getMenuActive,setMenuActive]=useState('')
    useEffect(()=>{
        setMenuActive('produk')
    },[])
    return (
        <div className={`${style.main} ${style.web}`}>
            {/* Filter */}
            <FilterProductsWeb/>

            {/* List Products */}
            <div className="flex flex-col w-full gap-4">
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <div onClick={()=>setMenuActive('produk')} className={`select-none cursor-pointer flex items-center px-6 gap-2 border-b-2 ${getMenuActive==='produk'?'border-primary-700':'border-neutral-50'} `}>
                            <IconComponent width={24} height={24} classname={`${getMenuActive==='produk'?style.iconActive:''}`} src={'/icons/product-web.svg'} />
                            <span className={`${getMenuActive==='produk'?'text-primary-700':'text-neutral-900'} text-base font-semibold`}>Produk</span>
                        </div>
                        <span className='w-[1px] h-[80%] bg-neutral-400'></span>
                        <div onClick={()=>setMenuActive('toko')} className={`select-none cursor-pointer flex items-center px-6 gap-2 border-b-2 ${getMenuActive==='toko'?'border-primary-700':'border-neutral-50'}`}>
                            <IconComponent width={24} height={24} classname={`${getMenuActive==='toko'?style.iconActive:''}`} src={'/icons/toko-web.svg'} />
                            <span className={`${getMenuActive==='toko'?'text-primary-700':'text-neutral-900'} text-base font-semibold`}>Toko</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-6'>
                        <span className='text-sm font-medium text-[#1b1b1b]'>Hasil Pencarian <b className='font-bold'>“Ban”</b> (400 Produk)</span>
                        <span className='flex gap-2 items-center border border-neutral-600 rounded-md pl-3'>
                            <IconComponent src={'/icons/sorting.svg'} />
                            <Dropdown classname={'!border-none'} placeholder='Paling Relevan' />
                        </span>
                    </div>
                </div>
                {getMenuActive==='produk'&&<div className='flex flex-wrap gap-3'>
                    {
                        mockProductsData.products.map(val=> <ProductComponent key={val.id} {...val} />)
                    }
                </div>}
                {getMenuActive==='toko'&&<div className='flex flex-wrap gap-3'>
                    {
                        mockProductsData?.products.map(val=><GarasiCardComponent key={val.id} image={val.image} name={val.productName} timeStatus={val.warranty} trucks={val.storeName} location={val.location} soldCount={val.soldCount} star={val.star} products={mockProductsData?.products?.slice(0,4)} />)
                    }
                </div>}
            </div>
        </div>
    );
}

export default ProductsWeb;
