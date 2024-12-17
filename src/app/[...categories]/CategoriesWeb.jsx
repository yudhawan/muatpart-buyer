
'use client';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import style from './Categories.module.scss'
// import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useState } from 'react';
import IconComponent from '@/components/IconComponent/IconComponent';
import Link from 'next/link';
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
function CategoriesWeb({params,searchParams}) {
    const [getExpanded, setExpanded] = useState([])
    function handleExpanded(id) {
        if (getExpanded.some(val => val === id)) {
            let tmp = getExpanded.filter(val => val !== id);
            setExpanded(tmp);
        } else {
            setExpanded(prev => [...prev, id]);
        }
    }
    return (
        <div className={style.main}>
            <BreadCrumb classname={style.breadcrumb} data={['Home','Sparepart','Roda dan Ban']} onclick={a=>console.log(a)} />
            <div className='w-full self-center max-h-[250px] max-w-[1000px] mt-4'>
                {/* <ImageSlider baseImages={headerImages}  /> */}
            </div>
            <div className='mt-6 flex justify-between gap-[38px]'>
                <div className="flex flex-col bg-neutral-50 border border-neutral-400 rounded-md p-4 gap-4 w-[264px]">
                    <span className="text-xl text-[#1b1b1b] font-bold">Kategori</span>
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
                <div></div>
            </div>
        </div>
    );
}

export default CategoriesWeb;
