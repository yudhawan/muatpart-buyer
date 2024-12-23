
'use client';
import IconComponent from '@/components/IconComponent/IconComponent';
import style from './DetailPesananMobile.module.scss'
import PaymentInformationMobile from '@/components/PaymentInformationMobile/PaymentInformationMobile';
function DetailPesananMobile({statusPesanan,detailPesanan}) {
    return (
        <div className={`${style.main} bg-neutral-200`}>
            {statusPesanan?.id==='menungguPembayaran'&&<MenungguPembayaran/>}
        </div>
    );
}

export default DetailPesananMobile;

function MenungguPembayaran() {
    return(
        <div className='py-6 px-4 bg-neutral-50 text-neutral-900 flex flex-col w-full'>
            <div className='bg-secondary-100 rounded-md p-3 flex justify-between'>
                <span className='flex flex-col gap-[10px]'>
                    <span className='bold-sm text-warning-900'>Bayar Sebelum</span>
                    <span className='medium-xs'>24 Okt 2024 14:46 WIB</span>
                </span>
                <div className='bg-error-50 rounded-md py-1 px-2 flex items-center gap-1 h-6'>
                    <IconComponent src={'/icons/time.svg'} width={14} height={14} classname={'icon-error-400'} />
                    <span className='semi-sm text-error-400'>01:28:20</span>
                </div>
            </div>
            <PaymentInformationMobile  />
        </div>
    )
}