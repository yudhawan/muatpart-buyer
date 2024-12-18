
'use client';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import style from './Categories.module.scss'
import { useState } from 'react';
import IconComponent from '@/components/IconComponent/IconComponent';
import Link from 'next/link';
import { categoriesZustand } from '@/store/products/categoriesZustand';
import Button from '@/components/Button/Button';
import Image from 'next/image';
const headerImages = [
    {
      src: "https://placehold.co/500x250/orange/white",
      alt: "Slider image 1",
    },
    {
      src: "https://placehold.co/500x250/purple/white",
      alt: "Slider image 2",
    },
    {
      src: "https://placehold.co/500x250/green/white",
      alt: "Slider image 3",
    },
  ];
function CategoriesWeb({params,searchParams,categories}) {
    const [getExpanded, setExpanded] = useState([])
    const {categoryFamily}=categoriesZustand()
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
                <BreadCrumb disableClick classname={style.breadcrumb} data={[{id:'home',name:'Home'},...categoryFamily?.map(val=>({id:val?.id,name:val?.value}))]} onclick={a=>console.log(a)} />
                <div className='w-full self-center max-h-[250px] max-w-[1000px] mt-4'>
                    {/* <ImageSlider baseImages={headerImages}  /> */}
                </div>
                <div className='mt-6 flex justify-between gap-[38px]'>
                    <div className="flex flex-col bg-neutral-50 border border-neutral-400 rounded-md p-4 gap-4 w-[264px]">
                        <span className="text-xl text-[#1b1b1b] font-bold">Kategori {categoryLabel}</span>
                        <div className='flex flex-col divide-y divide-neutral-400'>
                            <div className="flex flex-col w-full gap-4 pt-4">
                                <div
                                    className="flex items-center w-full justify-between cursor-pointer"
                                    onClick={() => handleExpanded('Jarak')}
                                >
                                    <span className="text-xs text-neutral-900 font-semibold">Jarak</span>
                                    <IconComponent
                                        src={`${
                                            getExpanded.some(a => a === 'Jarak')
                                                ? '/icons/chevron-up.svg'
                                                : '/icons/chevron-down.svg'
                                        }`}
                                    />
                                </div>
                                <div
                                    style={{
                                        maxHeight: getExpanded.some(a => a === 'Jarak') ? '300px' : '0px',
                                        overflow: 'hidden',
                                    }}
                                    className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                                >
                                    <Link href={'/'}>test</Link>
                                    <Link href={'/'}>test</Link>
                                    <Link href={'/'}>test</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        <h1 className='text-[18px] font-bold text-neutral-900'>Rekomendasi Produk yang Banyak Dicari</h1>
                        <div className='flex flex-col gap-4'>
                            {/* fetch product */}
                            <div className='flex flex-col gap-3'>
                                <div className='flex gap-4 item-center'>
                                    <span className='font-bold text-neutral-900 text-sm'></span>
                                    <span className='text-[#176CF7] font-bold text-xs cursor-pointer'>Lihat Semua</span>
                                </div>
                            </div>
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
                        <Image src={'/img/plus1.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Jaminan Produk Original</span>
                    </div>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image src={'/img/plus2.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Dapat Mengirim RFQ</span>
                    </div>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image src={'/img/plus3.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Gratis Tools Pengaturan Stock di Stockist</span>
                    </div>
                    <div className='flex flex-col gap-[9px] rounded-xl p-[14px] bg-neutral-50'>
                        <Image src={'/img/plus4.png'} width={36} height={36} />
                        <span className='font-bold text-xs text-[#176CF7]'>Voucher Eksklusif</span>
                    </div>                
                </div>
            </div>
        </div>
    );
}

export default CategoriesWeb;
  