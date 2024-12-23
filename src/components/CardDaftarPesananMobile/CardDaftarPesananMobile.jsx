
'use client';
import { useEffect, useRef } from 'react';
import style from './CardDaftarPesananMobile.module.scss'
import IconComponent from '../IconComponent/IconComponent';
import Image from 'next/image';
import Button from '../Button/Button';
import { numberFormatMoney } from '@/libs/NumberFormat';

function CardDaftarPesananMobile({
    nomorInvoice,
    tanggalPesan,
    namaToko,
    namaProduk,
    jumlah,
    totalHarga,
    status,
    statusInfo,
    tanggalJatuhTempo,
    jumlahProdukLain,
    informasiTambahan,
    status_pesanan,
    onClick,
}) {
    const statusPesanan = status_pesanan.find(val=>val.id===status)
    const threedots = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (threedots.current && !threedots.current.contains(event.target)) {
                // setIsOpen(false);
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
                    <span className='font-bold text-[10px]'>{nomorInvoice}</span>
                    <span className='font-bold text-[10px]'>{tanggalPesan}</span>
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
                    <span className='font-semibold text-[10px]'>{namaToko}</span>
                </div>
                <div className='flex w-full justify-between gap-3 items-start pb-3 border-b border-b-neutral-400'>
                    <Image width={68} height={68} src={'/img/chopper.png'} alt='image' className='rounded' />
                    <div className='flex flex-col gap-3'>
                        <h1 className='bold-sm'>{namaProduk}</h1>
                        <span className='medium-xs'>INV/20240120/MPM/00001</span>
                        {jumlahProdukLain>1&&<span className='medium-xs text-primary-700 select-none'>{'+'+(jumlahProdukLain-1)} produk lainnya</span>}
                        <span className={`
                            py-1 px-2 semi-sm
                            flex items-center rounded-md justify-center
                            ${statusPesanan.bg?`${statusPesanan.bg}`:''}
                            ${statusPesanan.text?`${statusPesanan.text}`:'text-neutral-900'}
                            `}>{statusPesanan.status}</span>
                    </div>
                    <span className='medium-xs text-neutral-600'>{jumlah>1?`+${jumlah}`:jumlah}</span>
                </div>
                {statusInfo?.text&&<div className={`
                    p-3 rounded-md flex flex-col gap-[10px]
                    text-${statusInfo?.textColor}
                    bg-${statusInfo?.bg}
                    `}>
                        <span className='semi-xs'>{statusInfo?.text}</span>
                        {statusInfo?.date&&<span className='semi-xs'>{statusInfo?.date}</span>}
                    </div>}
                <div className='flex flex-col gap-2'>
                    <span className='medium-xs'>Total Pesanan</span>
                    <span className='bold-xs'>{numberFormatMoney(totalHarga)}</span>
                </div>
                {
                    typeof statusPesanan.action_button==='string'?
                    <Button onClick={()=>onClick(statusPesanan)} Class='!w-full !max-w-full'>{statusPesanan.action_button}</Button>:
                    <div className='w-full gap-2 flex justify-between items-center'>
                        <Button onClick={()=>onClick({button:'left',...statusPesanan})} Class='!max-w-full !w-full' color='primary_secondary'>{statusPesanan.action_button?.left}</Button>
                        <Button onClick={()=>onClick({button:'right',...statusPesanan})} Class='!max-w-full !w-full'>{statusPesanan.action_button?.right}</Button>
                    </div>
                }
            </section>
        </div>
    );
}

export default CardDaftarPesananMobile;
  