
'use client';
import IconComponent from '@/components/IconComponent/IconComponent';
import style from './DetailPesananMobile.module.scss'
import PaymentInformationMobile from '@/components/PaymentInformationMobile/PaymentInformationMobile';
import CardProductPesanan from '@/components/CardProductPesanan/CardProductPesanan';
import { numberFormatMoney } from '@/libs/NumberFormat';
import Button from '@/components/Button/Button';
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile';
import { useHeader } from '@/common/ResponsiveContext';
import ModalComponent from '@/components/Modals/ModalComponent';
import RadioButton from '@/components/Radio/RadioButton';
import { useState } from 'react';
import Input from '@/components/Input/Input';
function DetailPesananMobile({statusPesanan,detailPesanan,handleTerapkan}) {
    return (
        <div className={`${style.main} bg-neutral-200 flex flex-col gap-2 pb-20`}>
            {
                statusPesanan?.id==='menungguPembayaran'&&<MenungguPembayaran detailPesanan={detailPesanan} handleTerapkan={handleTerapkan}/>
            }
        </div>
    );
}

export default DetailPesananMobile;

function MenungguPembayaran({detailPesanan,handleTerapkan}) {
    const [showCancel,setShowCancel]=useState(false)
    const [cancelReason,setCancelReason]=useState('')
    const [getReason,setReason]=useState('')
    const [getValidation,setValidation]=useState('')
    const {setScreen}=useHeader()
    return(
        <>
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
                <PaymentInformationMobile amount={detailPesanan?.totalTagihan} bankAccount={detailPesanan?.nomorVA} bankName={detailPesanan?.metodePembayaran} />
            </div>
            {
                detailPesanan?.detailToko?.map((val,i)=>{
                    return(
                        <div key={i} className='containerMobile flex flex-col gap-6 bg-neutral-50 text-neutral-900 pb-6'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-1'>
                                    <IconComponent src={'/icons/product-house.svg'} />
                                    <span className='semi-sm'>{val?.namaToko}</span>
                                </div>
                                <span className='bg-neutral-200 h-6 rounded-md text-neutral-700 flex items-center gap-2 px-3'>
                                    <IconComponent src={'/icons/marker-outline.svg'} />
                                    <span className='medium-xs'>{val.alamat}</span>
                                </span>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <span className='medium-sm text-neutral-600'>Nomor Invoice</span>
                                <span className='medium-sm text-primary-700 flex items-center gap-1'>
                                    <span>{val?.nomorInvoice}</span>
                                    <IconComponent src={'/icons/download.svg'} classname={'icon-blue'} />
                                </span>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <span className='medium-sm text-neutral-600'>Kurir</span>
                                <span className='medium-sm '>{val?.kurir}</span>
                            </div>
                            <div className='flex flex-col gap-4 pb-6 border-b border-neutral-400'>
                                <span className='medium-sm text-neutral-600'>Alamat</span>
                                <span className='semi-sm '>{val?.alamatPengiriman?.namaGudang}</span>
                                <span className='medium-sm '>{val?.alamatPengiriman?.pic}</span>
                                <span className='medium-sm '>{val?.alamatPengiriman?.alamatLengkap}</span>
                                {val?.alamatPengiriman?.catatan&&<span className='medium-sm '>Catatan: {val?.alamatPengiriman?.catatan}</span>}
                            </div>
                            <div className='flex flex-col gap-6'>
                                <span className='medium-sm'>Detail produk</span>
                                <div className='flex flex-col border-b border-neutral-400'>
                                    {
                                        val?.detailProduk?.map((product,i)=>{
                                            return (
                                                <CardProductPesanan 
                                                classname={'pb-8'}
                                                key={i} 
                                                name={product?.nama}
                                                varian={product?.keterangan}
                                                afterPrice={product?.harga}
                                                beforePrice={product?.harga}
                                                catatan={product?.catatan}
                                                quantity={product?.jumlah}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 text-neutral-900'>
                                <div className='flex justify-between items-center semi-sm'>
                                    <span>Sub Total</span>
                                    <span>{numberFormatMoney(val?.summaryBiaya?.subTotal)}</span>
                                </div>
                                <div className='flex flex-col gap-4 medium-xs'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-neutral-600'>Total Harga (${val?.detailProduk?.length} produk)</span>
                                        <span>{numberFormatMoney(val?.summaryBiaya?.totalHarga)}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-neutral-600'>Biaya Pengiriman ({val?.kurir} - {val?.summaryBiaya?.beratTotal} kg)</span>
                                        <span>{numberFormatMoney(val?.summaryBiaya?.biayaPengiriman)}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-neutral-600'>Biaya Asuransi Pengiriman</span>
                                        <span>{numberFormatMoney(14000)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className='flex flex-col gap-6 text-neutral-900 bg-neutral-50 py-6 px-4'>
                <div className='w-full flex justify-between items-center semi-sm'>
                    <span>Total Pesanan</span>
                    <span>{numberFormatMoney(detailPesanan?.totalTagihan)}</span>
                </div>
                <div className='w-full flex justify-between items-center medium-xs'>
                    <span className='text-neutral-600'>Biaya Aplikasi</span>
                    <span>{numberFormatMoney(detailPesanan?.biayaAplikasi)}</span>
                </div>
                <span className='w-full h-[1px] bg-neutral-400'></span>
                <div className='w-full flex justify-between items-center semi-sm'>
                    <span>Total Tagihan</span>
                    <span className='bold-base'>{numberFormatMoney(detailPesanan?.totalTagihan)}</span>
                </div>
                <Button color='error_secondary' Class='!w-full !max-w-full' onClick={()=>setShowCancel(true)}>Batalkan Pesanan</Button>
            </div>
            <ButtonBottomMobile classname={'py-3 px-4'}>
                <Button onClick={()=>setScreen('cara_pembayaran')} Class='!w-full !max-w-full'>Lihat Cara bayar</Button>
            </ButtonBottomMobile>
            <ModalComponent full type='BottomSheet' title='Pilih Alasan Pembatalan' isOpen={showCancel} setClose={()=>setShowCancel(false)}>
                <div className='containerMobile w-full semi-sm gap-4 flex flex-col max-h-[339px] overflow-y-auto'>
                    <div className='pb-4 border-b border-neutral-400 flex w-full justify-between items-center select-none' onClick={()=>setCancelReason('Penjual tidak menjawab chat')}>
                        <span>Penjual tidak menjawab chat</span>
                        <RadioButton label={''} checked={cancelReason==='Penjual tidak menjawab chat'} />
                    </div>
                    <div className='pb-4 border-b border-neutral-400 flex w-full justify-between items-center select-none' onClick={()=>setCancelReason('Penjual membutuhkan waktu lama untuk mengirimkan pesanan')}>
                        <span>Penjual membutuhkan waktu lama untuk mengirimkan pesanan</span>
                        <RadioButton label={''} checked={cancelReason==='Penjual membutuhkan waktu lama untuk mengirimkan pesanan'} />
                    </div>
                    <div className='pb-4 border-b border-neutral-400 flex w-full justify-between items-center select-none' onClick={()=>setCancelReason('Pembeli berubah pikiran')}>
                        <span>Pembeli berubah pikiran</span>
                        <RadioButton label={''} checked={cancelReason==='Pembeli berubah pikiran'} />
                    </div>
                    <div className='pb-4 border-b border-neutral-400 flex w-full justify-between items-center select-none' onClick={()=>setCancelReason('Pembeli menemukan produk dengan harga yang lebih rendah')}>
                        <span>Pembeli menemukan produk dengan harga yang lebih rendah</span>
                        <RadioButton label={''} checked={cancelReason==='Pembeli menemukan produk dengan harga yang lebih rendah'} />
                    </div>
                    <div className='pb-4 border-b border-neutral-400 flex w-full justify-between items-center select-none' onClick={()=>setCancelReason('Pembeli ingin mengubah rincian dan membuat pesanan baru')}>
                        <span>Pembeli ingin mengubah rincian dan membuat pesanan baru</span>
                        <RadioButton label={''} checked={cancelReason==='Pembeli ingin mengubah rincian dan membuat pesanan baru'} />
                    </div>
                    <div className='flex flex-col'>
                        <div className='pb-4 flex w-full justify-between items-center select-none' onClick={()=>setCancelReason('Lainnya')}>
                            <span>Lainnya</span>
                            <RadioButton label={''} checked={cancelReason==='Lainnya'} />
                        </div>
                        {cancelReason==='Lainnya'&&<Input value={getReason} changeEvent={e=>{
                            if(e.target.value){
                                setValidation('')
                                setReason(e.target.value)
                            }
                        }} placeholder='Masukkan Alasan Pembatalan' classInput={'!w-full'} classname={`!w-full !max-w-full h-8 ${getValidation?'input-error':''}`} />}
                        <span className='medium-xs text-error-400 mt-3'>{getValidation}</span>
                    </div>
                    <Button disabled={!cancelReason} Class='!w-full !max-w-full mb-4' onClick={()=>{
                        if(cancelReason==='Lainnya'&&!getReason){
                            setValidation('Alasan Pembatalan wajib diisi')
                        }else{
                            handleTerapkan()
                        }
                    }}>Terapkan</Button>
                </div>
            </ModalComponent>
        </>
    )
}