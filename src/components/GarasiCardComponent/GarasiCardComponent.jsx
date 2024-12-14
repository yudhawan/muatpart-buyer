'use client';
import Image from 'next/image';
import style from './GarasiCardComponent.module.scss'
import IconComponent from '../IconComponent/IconComponent';
import { numberFormatMoney } from '@/libs/NumberFormat';
function GarasiCardComponent({image,name,timeStatus,trucks,products,location,star,soldCount}) {
    return (
        <div className={`${style.main} py-4 px-3 rounded-md gap-2 h-fit border border-neutral-400 flex flex-col`}>
            <div className='flex justify-between items-start'>
                <div className='flex gap-3 items-start'>
                    <div className='w-10 h-10 rounded-full overflow-hidden object-cover'>
                        <Image src={image?image:'/img/chopper.png'} width={40} height={40} alt={name} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-neutral-900 text-xs'>{name}</p>
                        <p className='font-medium text-xs text-neutral-700'>{timeStatus}</p>
                        <div className='flex gap-1 items-center'>
                            <Image width={16} height={16} src={'/icons/mini-truck.svg'} alt='truck' />
                            <p className='font-medium text-xs text-neutral-700'>{trucks}</p>
                        </div>
                    </div>
                </div>
                <span>
                    <IconComponent src={'/icons/three-dots.svg'} />
                </span>
            </div>
            <div className='flex gap-2'>
                {
                    products?.map(val=>{
                        return(
                            <div className='rounded-md overflow-hidden flex flex-col border border-neutral-400 w-24 bg-neutral-50'>
                                <div className='w-full h-24'>
                                    <Image src={val?.image?val?.image:'/img/chopper.png'} width={96} height={96} className='w-full' />
                                </div>
                                <div className='py-3 px-2 text-[10px] font-medium'>
                                    {
                                        numberFormatMoney(val?.price)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex gap-3 items-center'>
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
    );
}

export default GarasiCardComponent;
  