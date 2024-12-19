
'use client';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import style from './Categories.module.scss'
import { useState } from 'react';
import IconComponent from '@/components/IconComponent/IconComponent';
import Link from 'next/link';
import { categoriesZustand } from '@/store/products/categoriesZustand';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import ProductComponent from '@/components/ProductComponent/ProductComponent';
import MultipleItems from '@/components/ReactSlick/MultipleItems';
const bannerImages = [
    "https://placehold.co/1000x250/red/white.png",
    "https://placehold.co/1000x250/green/white.png",
    "https://placehold.co/1000x250/blue/white.png",
  ];
function CategoriesWeb({params,searchParams,products}) {
    const [getExpanded, setExpanded] = useState([])
    const {categoryFamily,categories:cats,getSubAndItem}=categoriesZustand()
    function handleExpanded(id) {
        if (getExpanded.some(val => val === id)) {
            let tmp = getExpanded.filter(val => val !== id);
            setExpanded(tmp);
        } else {
            setExpanded(prev => [...prev, id]);
        }
    }
    const categoryLabel = categoryFamily?.map(val=>val?.value)?.toString().replace(","," dan ")
    
    return (
        <div className={style.main}>
            <div className='w-full max-w-[1280px] m-auto'>
                <BreadCrumb maxWidth={'100%'} disableClick classname={style.breadcrumb} data={[{id:'home',name:'Home'},...categoryFamily?.map(val=>({id:val?.id,name:val?.value}))]} onclick={a=>console.log(a)} />
                <div className='w-full h-auto flex justify-center'>
                    <div className='w-full max-h-[250px] max-w-[1000px] mt-4'>
                        <MultipleItems 
                            items={bannerImages} 
                            settings={{
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 3000,
                                dots: true,
                            }}
                            size={1000}
                            className="rounded-xl" 
                        />
                    </div>
                </div>
                <div className='mt-6 flex justify-between gap-[38px]'>
                    <div className="flex flex-col bg-neutral-50 border border-neutral-400 rounded-md p-4 gap-4 w-[264px] h-fit">
                        <span className="text-xl text-[#1b1b1b] font-bold">Kategori {categoryLabel}</span>
                        <div className='flex flex-col '>
                            {getSubAndItem?.map(val=><div key={val?.id} className="flex flex-col w-full gap-4 pt-4 pb-2 border-b border-neutral-400">
                                <div
                                    className="flex items-center w-full justify-between cursor-pointer"
                                    onClick={() => handleExpanded(val?.id)}
                                >
                                    <span className="text-xs text-neutral-900 font-semibold">{val?.value}</span>
                                    {!!(val?.children?.length)&&<IconComponent
                                        src={`${
                                            getExpanded.some(a => a === val?.id)
                                                ? '/icons/chevron-up.svg'
                                                : '/icons/chevron-down.svg'
                                        }`}
                                    />}
                                </div>
                                {getExpanded.some(a => a === val?.id)&&<div
                                    className="flex flex-col gap-4 h-fit"
                                >
                                    {
                                        val?.children?.map(child=><Link className='text-neutral-900 text-xs font-medium' key={child?.id} href={'/'}>{child?.value}</Link>)
                                    }
                                </div>}
                            </div>)}
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        <h1 className='text-[18px] font-bold text-neutral-900'>Rekomendasi Produk yang Banyak Dicari</h1>
                        <div className='flex flex-col gap-4'>
                            {products?.map(val=><div key={val?.subcategoryID} className='flex flex-col gap-3'>
                                <div className='flex gap-4 items-baseline'>
                                    <span className='font-bold text-neutral-900 text-sm'>{val?.subcategory}</span>
                                    <span className='text-[#176CF7] font-bold text-xs cursor-pointer'>Lihat Semua</span>
                                </div>
                                <div className='w-full flex gap-3'>
                                    {
                                        val?.products?.map((prod,i)=><ProductComponent key={i} {...prod} />)
                                    }
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.muatPlus+' h-[320px] relative !py-10 !px-[140px] flex !flex-row !justify-between overflow-hidden'}>
                <Image src={'/img/muatplus-garis-web.png'} width={1688} height={815} alt='plus' className='absolute -bottom-[40px] opacity-5 right-0' />
                <div className='flex flex-col gap-6'>
                    <p className='text-neutral-50 text-xl font-medium'>Dapatkan keuntungan lebih
                dengan berlangganan membership di</p>
                    <div className='flex gap-2 item-center'>
                        <IconComponent src='/icons/muatplu-shield.svg' width={40} height={40} />
                        <p className='font-bold text-neutral-50 text-[32px]'>membership di muatparts +PLUS</p>
                    </div>
                    <Button color='primary_secondary' Class='h-8 !border-none'>Pelajari Selengkapnya</Button>
                </div>
                <div className='grid grid-cols-2 gap-[9px]'>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image alt='p' src={'/img/plus1.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Jaminan Produk Original</span>
                    </div>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image alt='p' src={'/img/plus2.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Dapat Mengirim RFQ</span>
                    </div>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image alt='p' src={'/img/plus3.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Gratis Tools Pengaturan Stock di Stockist</span>
                    </div>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image alt='p' src={'/img/plus4.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Voucher Eksklusif</span>
                    </div>                
                </div>
            </div>
        </div>
    );
}

export default CategoriesWeb;
  