
'use client';
import Image from 'next/image';
import style from './PaymentInformationMobile.module.scss'
import IconComponent from '../IconComponent/IconComponent';
import { numberFormatMoney } from '@/libs/NumberFormat';
function PaymentInformationMobile({bankLogo,bankName,amount,bankAccount}) {
    return (
        <div className={`${style.main} bg-neutral-50 containerMobile pb-6 flex flex-col gap-6`}>
            <div className='flex flex-col gap-4'>
                <span className='medium-sm text-neutral-600'>Opsi Pembayaran</span>
                <div className='medium-sm text-neutral-900 flex items-center gap-3'>
                    <Image src={`${bankLogo?bankLogo:'/img/chopper.png'}`} width={24} height={24} alt='logo bank' className='rounded' />
                    <span>{bankName}</span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <span className='medium-sm text-neutral-600'>Opsi Pembayaran</span>
                <div className='medium-sm text-neutral-900 flex items-center gap-1'>
                    <span className='text-primary-700'>{bankAccount}</span>
                    <span className='select-none'>
                        <IconComponent src={'/icons/copy-outline-blue.svg'} />
                    </span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <span className='medium-sm text-neutral-600'>Opsi Pembayaran</span>
                <div className='medium-sm text-neutral-900 flex items-center gap-1'>
                    <span className='text-primary-700'>{numberFormatMoney(amount)}</span>
                    <span className='select-none'>
                        <IconComponent src={'/icons/copy-outline-blue.svg'} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PaymentInformationMobile;
  