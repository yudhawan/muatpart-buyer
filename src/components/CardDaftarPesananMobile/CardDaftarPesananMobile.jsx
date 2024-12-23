
'use client';
import { useEffect, useRef } from 'react';
import style from './CardDaftarPesananMobile.module.scss'
import IconComponent from '../IconComponent/IconComponent';
import Image from 'next/image';
import Button from '../Button/Button';
const status_pesanan = [
    {
        status:'Menunggu Pembayaran',
        bg:'bg-warning-900',
        text:'text-warning-900',
        action_button:'Detail Pesanan'
    },
    {
        status:'Menunggu Direspon',
        bg:'bg-warning-900',
        text:'text-warning-900',
        action_button:'Detail Pesanan'
    },
    {
        status:'Dikemas',
        bg:'bg-primary-50',
        text:'text-primary-700',
        action_button:'Detail Pesanan'
    },
    {
        status:'Dikirim',
        bg:'bg-primary-50',
        text:'text-primary-700',
        action_button:'Lacak Pesanan'
    },
    {
        status:'Tiba di Tujuan',
        bg:'bg-success-50',
        text:'text-success-400',
        action_button:'Lacak Pesanan'
    },
    {
        status:'Dibatalkan Penjual',
        bg:'bg-error-50',
        text:'text-error-400',
        action_button:'Detail Pesanan'
    },
    {
        status:'Dibatalkan Pembeli',
        bg:'bg-error-50',
        text:'text-error-400',
        action_button:'Detail Pesanan'
    },
    {
        status:'Dibatalkan Sistem',
        bg:'bg-error-50',
        text:'text-error-400',
        action_button:'Detail Pesanan'
    },
    {
        status:'Dikomplain',
        bg:'bg-error-400',
        text:'text-error-50',
        action_button:'Detail Komplain'
    },
    {
        status:'Pengembalian Dana Selesai',
        bg:'bg-success-400',
        text:'text-success-50',
        action_button:'Detail Pesanan'
    },
    {
        status:'Selesai',
        bg:'bg-success-400',
        text:'text-success-50',
        action_button:{
            left:'Berikan Ulasan',
            right:'Beli Lagi'
        }
    },
    {
        status:'Komplain Selesai',
        bg:'bg-success-400',
        text:'text-success-50',
        action_button:{
            left:'Berikan Ulasan',
            right:'Beli Lagi'
        }
    },
]
function CardDaftarPesananMobile({
    invoice,
    date
}) {
    const statusPesanan = status_pesanan.find(val=>val.status==='Dikirim')
    const threedots = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (threedots.current && !threedots.current.contains(event.target)) {
                setIsOpen(false);
                // setDatepicker(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className={`${style.main} flex flex-col w-full text-neutral-900 p-4 bg-neutral-50 gap-3`}>
            <section className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-[10px]'>INV/20240124/MPM/000004</span>
                    <span className='font-bold text-[10px]'>25 Jan 2024 13:00 WIB</span>
                </div>
                <div className='flex flex-col gap-[2px] select-none cursor-pointer relative' ref={threedots}>
                    <span className='w-[5px] h-[5px] rounded-full bg-neutral-700'></span>
                    <span className='w-[5px] h-[5px] rounded-full bg-neutral-700'></span>
                    <span className='w-[5px] h-[5px] rounded-full bg-neutral-700'></span>
                </div>
            </section>
            <span className='w-full h-[1px] bg-neutral-400'></span>
            <section className='flex flex-col gap-3'>
                <div className='flex gap-[3px]'>
                    <IconComponent src={'/icons/product-house.svg'} />
                    <span className='font-semibold text-[10px]'>Priority Tire</span>
                </div>
                <div className='flex w-full justify-between gap-3 items-start pb-3 border-b border-b-neutral-400'>
                    <Image width={68} height={68} src={'/img/chopper.png'} alt='image' className='rounded' />
                    <div className='flex flex-col gap-3'>
                        <h1 className='bold-sm'>Kampas Kopling Quester (Disc Clutch) N3100-NA04AD</h1>
                        <span className='medium-xs'>INV/20240120/MPM/00001</span>
                        <span className='medium-xs text-primary-700 select-none'>+1 produk lainnya</span>
                        <span className={`
                            py-1 px-2
                            flex items-center rounded-md
                            ${statusPesanan.bg?`bg-${statusPesanan.bg}`:''}
                            ${statusPesanan.text?`text-${statusPesanan.text}`:'text-neutral-900'}
                            `}>{statusPesanan.status}</span>
                    </div>
                    <span className='medium-xs text-neutral-600'>+20</span>
                </div>
                <div className={`
                    p-3 rounded-md flex flex-col gap-[10px]
                    `}>
                        <span className='semi-xs'></span>
                        <span className='semi-xs'></span>
                    </div>
                <div className='flex flex-col gap-2'>
                    <span className='medium-xs'></span>
                    <span className='bold-xs'></span>
                </div>
                {
                    typeof statusPesanan.action_button==='string'?
                    <Button Class='!w-full !max-w-full'>{statusPesanan.action_button}</Button>:
                    <div className='w-full gap-2'>
                        <Button color='primary_secondary'>{statusPesanan.action_button?.left}</Button>
                        <Button>{statusPesanan.action_button?.right}</Button>
                    </div>
                }
            </section>
        </div>
    );
}

export default CardDaftarPesananMobile;
  