import React from 'react'
import style from './ProductComponent.module.scss'
import Image from 'next/image'
import IconComponent from '../IconComponent/IconComponent'
import { numberFormatMoney } from '@/libs/NumberFormat'

function ProductComponent({
    id,
    image,
    favorite,
    productName,
    storeName,
    price,
    stock,
    discount,
    star,
    quality,
    location,
    soldCount,
    warranty
}) {
  return (
    <div className={style.main}>
      <div className={style.sectionTop}>
        <span className='w-7 h-7 rounded-full bg-neutral-50 grid place-content-center'>
            <IconComponent src={'/icons/headrt-outline.svg'} classname={favorite?style.favorite:''} />
        </span>
        <Image src={image?image:'/img/chopper.png'} width={160} height={160} alt={productName}  className='inset-0 absolute rounded-t-md'/>
      </div>
      <div className={`relative ${quality?'pt-11':'pt-4'} pb-4 px-2 gap-2 flex flex-col`}>
        {quality?<span className='bg-warning-100 py-1 px-2 rounded-r-[20px] text-xs font-semibold text-warning-900 absolute top-3 left-0'>Kualitas : OEM</span>:''}
        <h1 className='text-xs font-medium text-neutral-900 w-full line-clamp-2'>Komponen Mesin Truk Filter Udara Elemen Udara</h1>
        {
            discount?
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <strike className='text-neutral-600 text-[10px] font-medium'>{price}</strike>
                    
                    <p className='text-[10px] font-semibold text-error-400'>{discount}% OFF</p>
                </div>
                <h1 className='text-neutral-900 text-sm font-bold'>{numberFormatMoney(Math.ceil(price-((price*discount)/100)))}</h1>
            </div>:
            <h1 className='text-neutral-900 text-sm font-bold'>{numberFormatMoney(price)}</h1>
        }
        <div className='flex gap-1 items-center'>
            <Image src={'/icons/gift.svg'} width={16} height={16} alt='gift' />
            <span className='text-neutral-700 font-medium text-[12px]'>{warranty}</span>
        </div>
        <div className='flex gap-1 items-center'>
            <Image src={'/icons/product-house.svg'} width={16} height={16} alt='house' />
            <span className='text-neutral-700 font-medium text-[12px]'>{storeName}</span>
        </div>
        <div className='flex gap-1 items-center'>
            <Image src={'/icons/product-marker.svg'} width={16} height={16} alt='location' />
            <span className='text-neutral-700 font-medium text-[12px]'>{location}</span>
        </div>
        <div className='flex gap-1 items-center'>
            <Image src={'/icons/product-star.svg'} width={16} height={16} alt='star' />
            <span className='text-neutral-700 font-medium text-[12px]'>{star} &#183; Terjual {soldCount}</span>
        </div>
        
      </div>
    </div>
  )
}

export default ProductComponent
