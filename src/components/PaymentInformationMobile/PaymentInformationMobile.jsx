
'use client';
import Image from 'next/image';
import style from './PaymentInformationMobile.module.scss'
import IconComponent from '../IconComponent/IconComponent';
import { numberFormatMoney } from '@/libs/NumberFormat';
import { useEffect, useState } from 'react';
import ToastApp from '../ToastApp/ToastApp';
function PaymentInformationMobile({bankLogo,bankName,amount,bankAccount}) {
    const [success,setSuccess]=useState('')
    function CopyClipboard(val,id) {
        navigator.clipboard.writeText(val).then(()=>setSuccess(id))
    }
    useEffect(()=>{
        if(success){
            setTimeout(()=>{setSuccess('')},[800])
        }
    },[success])
    return (
        <div className={`${style.main} bg-neutral-50 containerMobile pb-6 flex flex-col gap-6`}>
            <ToastApp show={success} onClose={()=>setSuccess('')} text={`${success} berhasil disalin`} />
            <div className='flex flex-col gap-4'>
                <span className='medium-sm text-neutral-600'>Opsi Pembayaran</span>
                <div className='medium-sm text-neutral-900 flex items-center gap-3'>
                    <Image src={`${bankLogo?bankLogo:'/img/chopper.png'}`} width={24} height={24} alt='logo bank' className='rounded' />
                    <span>{bankName}</span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <span className='medium-sm text-neutral-600'>Nomor Virtual Account</span>
                <div className='medium-sm text-neutral-900 flex items-center gap-1'>
                    <span className='text-primary-700'>{bankAccount}</span>
                    <span className='select-none' onClick={()=>CopyClipboard(bankAccount,'Nomor Virtual Account')}>
                        <IconComponent src={'/icons/copy-outline-blue.svg'} />
                    </span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <span className='medium-sm text-neutral-600'>Total Tagihan</span>
                <div className='medium-sm text-neutral-900 flex items-center gap-1'>
                    <span className='text-primary-700'>{numberFormatMoney(amount)}</span>
                    <span className='select-none' onClick={()=>CopyClipboard(amount,'Total Tagihan')}>
                        <IconComponent src={'/icons/copy-outline-blue.svg'} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PaymentInformationMobile;
  