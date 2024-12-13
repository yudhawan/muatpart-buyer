
'use client';
import Input from '@/components/Input/Input';
import style from './LocationNavbarMobile.module.scss'
import { useContext } from 'react';
import { ResponsiveContext } from '@/common/ResponsiveContext';
import IconComponent from '@/components/IconComponent/IconComponent';
function LocationNavbarMobile() {
    const {setAppBar,screen,setScreen,clearScreen,setSearch}=useContext(ResponsiveContext)
    if(screen==='cari_lokasi') return <div className='containerMobile pt-5'>
        <ul className='list-none flex flex-col gap-3'>
            <li>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <IconComponent width={24} height={24} src={'/icons/marker-outline.svg'} />
                        <span className='font-semibold text-sm text-neutral-700'>Jl. Kedung Malang 28B, Kedungdoro</span>
                    </div>
                    <IconComponent width={24} height={24} src={'/icons/bookmark-outline.svg'}/>
                </div>
            </li>
        </ul>
    </div>
    return (
        <div className={style.main+' px-4 py-5 flex flex-col gap-4'}>
            <span className='text-sm font-semibold text-neutral-900'>Masukkan alamat/kelurahan/kode pos pengiriman kamu</span>
            <Input classname={'bg-neutral-50'} focusEvent={()=>{
                setScreen('cari_lokasi')
                setAppBar({
                    appBarType:'search',
                    onBack:()=>{
                        clearScreen()
                        setAppBar({
                            appBarType:'title',
                            title:'Ke mana pesanan mau dikirim?',
                            defaultType:'defaultLocationNavbarMobile',
                            onBack:()=>clearScreen()
                        })
                    }
                })
                setSearch({
                    placeholder:'Cari Lokasi Kamu'
                })
            }} placeholder='Cari Lokasi Kamu' icon={{left:'/icons/search.svg'}} />
            <span className='text-xs font-medium text-neutral-900'>dengan memilih lokasi yang sesuai, kamu dapat membantu muatparts untuk merekomendasikan produk yang berada di sekitar kamu</span>
            <span className='w-full gap-3 flex item-center justify-between'>
                <span className='bg-neutral-400 w-full h-[1px] self-center'></span>
                <span className='text-neutral-400 text-xs'>atau</span>
                <span className='bg-neutral-400 w-full h-[1px] self-center'></span>
            </span>
            <span className='text-sm font-semibold text-neutral-900'><span className='text-primary-700'>Masuk</span> untuk melihat alamat yang telah kamu simpan</span>
        </div>
    );
}

export default LocationNavbarMobile;
  