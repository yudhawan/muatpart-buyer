
import { useHeader } from '@/common/ResponsiveContext'
import React, { useEffect } from 'react'
import style from './DetailProductPage.module.scss'
import { numberFormatMoney } from '@/libs/NumberFormat'
import IconComponent from '@/components/IconComponent/IconComponent'
import Image from 'next/image'
import Button from '@/components/Button/Button'
function DetailProductPageResponsive({
  product,
  ID,
  Photo,
  Favorite,
  Name,
  Store,
  PriceBeforeDiscount,
  PriceAfterDiscount,
  Discount,
  Rating,
  ReviewCount,
  SalesType,
  Views,
  Quality,
  City,
  SoldCount,
  Bonus,
  CreatedAt,
}) {
  const {
    appBarType, //pilih salah satu : 'header_title_secondary' || 'header_search_secondary' || 'default_search_navbar_mobile' || 'header_search' || 'header_title'
    appBar, // muncul ini : {onBack:null,title:'',showBackButton:true,appBarType:'',appBar:null,header:null}
    renderAppBarMobile, // untuk render komponen header mobile dengan memasukkanya ke useEffect atau by trigger function / closer
    setAppBar, // tambahkan payload seperti ini setAppBar({onBack:()=>setScreen('namaScreen'),title:'Title header',appBarType:'type'})
    handleBack, // dipanggil di dalam button di luar header, guna untuk kembali ke screen sebelumnya 
    clearScreen,// reset appBar
    setScreen, // set screen
    screen, // get screen,
    search, // {placeholder:'muatparts',value:'',type:'text'}
    setSearch, // tambahkan payload seperti ini {placeholder:'Pencarian',value:'',type:'text'}
  }=useHeader()
  useEffect(()=>{
    setAppBar({
      appBarType:'compact',
      renderActionButton:<div className='flex gap-2'>
        <span className='flex flex-col z-30 justify-center items-center gap-[2px] select-none cursor-pointer' onClick={()=>console.log('asuuuu')}>
          <IconComponent classname={'chevron-white'} width={20} height={20} src={'/icons/share.svg'} />
          <span className='font-semibold text-neutral-50 text-[10px]'>Bagikan</span>
        </span>
        <span className='flex flex-col z-30 justify-center items-center gap-[2px] select-none cursor-pointer' onClick={()=>console.log('asuuuu')}>
          <IconComponent width={20} height={20} src={'/icons/cart-outline.svg'} />
          <span className='font-semibold text-neutral-50 text-[10px]'>Troli</span>
        </span>
      </div>
    })
    setSearch({
      placeholder:'Cari Produk'
    })
  },[])
 
  if (screen==='example4') return (
    <div className=' flex flex-col'>
      <p>Example 4</p>
    </div>
  )
  // main screen
  return (
    <div className={''}>
      {/* image slider */}
      <div className='flex flex-col gap-2 text-neutral-900 bg-neutral-200'>
        <SectionCard>
          {Discount ? (
              <div className='flex gap-2'>
                <h1 className="text-neutral-900 text-sm font-bold">
                    {PriceAfterDiscount}
                </h1>
                <div className="flex gap-1 items-center">
                    <strike className="text-neutral-600 text-[10px] font-medium">
                    {PriceBeforeDiscount}
                    </strike>
                    <p className={style.discount}>{Discount}</p>
                </div>
              </div>
          ) : (
              <h1 className="text-neutral-900 text-sm font-bold">
              {numberFormatMoney(PriceBeforeDiscount??0)}
              </h1>
          )}
          <div className='flex items-center'>
            <h1 className='font-semibold text-base w-fit'>Hub Bolt Kit Standar RR (Stud+Nut) dengan Hub Reduction</h1>
            <span className='w-7 h-7 bg-neutral-200 rounded-full flex justify-center items-center select-none cursor-pointer' onClick={()=>{}}>
              <IconComponent src={'/icons/heart-outline.svg'} />
            </span>
          </div>
          <span className='font-medium text-xs flex'>
              <span className='flex items-center gap-1'>Terjual <span className='text-neutral-700'>{SoldCount>99?'99+':SoldCount}</span> &#183; <span className='py-2 px-3 flex gap-1 items-center bg-neutral-200 rounded-[24px]'><Image src={"/icons/product-star.svg"} width={16} height={16} alt="Rating"/> {Rating} <span className='text-neutral-700'>(16)</span></span></span>
          </span>
          {Bonus&&<div className='flex flex-wrap gap-2 border-b border-neutral-400 pb-4 text-neutral-900'>
              <span className='text-xs font-medium text-neutral-600'>Bonus</span>
              <div className='flex overflow-auto gap-[7px]'>
                  {Bonus.map(val=><div className='bg-success-50 py-1 px-2 rounded-md text-success-400 font-semibold text-xs'>{val?.name}</div>)}
              </div>
          </div>}
        </SectionCard>
        <SectionCard>
          <span className='text-sm font-semibold'>Cek Kompatibilitas</span>
          <Button Class='!h-8 !p-3 !border !border-neutral-600 !rounded-md !max-w-none !w-full !text-neutral-600 !font-semibold !text-sm !bg-neutral-50 !justify-between' iconRight={'/icons/chevron-right.svg'}>Kendaraan Saya</Button>
        </SectionCard>
        <SectionCard>
          <span className='text-sm font-semibold'>Ukuran Ban : 100-R2</span>
          <div className='flex flex-wrap gap-2 pb-3 border-b border-neutral-400'>
            <span className='h-[30px]  font-medium text-sm text-primary-700 py-2 px-3 bg-primary-50 border border-primary-700 flex justify-center items-center rounded-[24px] select-none cursor-pointer'>asss</span>
          </div>
          <div className='flex w-full justify-between items-center'>
            <span className='text-sm font-semibold'>Pesan Multi-Varian/Alamat?</span>
            <span className='text-sm font-medium text-primary-700 select-none cursor-pointer'>Klik di sini</span>
          </div>
        </SectionCard>
        <SectionCard>
          <span className='text-sm font-semibold'>Informasi Produk</span>
          <div className='w-full grid grid-cols-2 gap-4'>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Nomor OEM</span>
            <span className='font-medium text-xs'>49 303 53 121</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Nomor OE</span>
            <span className='font-medium text-xs'>1421022, LE 29 005 x</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Asal Produksi</span>
            <span className='font-medium text-xs'>Indonesia</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Tahun Produksi</span>
            <span className='font-medium text-xs'>08/2017</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Garansi Merchant</span>
            <span className='font-medium text-xs'>30 hari</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>SKU</span>
            <span className='font-medium text-xs'>4011558192501</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Material</span>
            <span className='font-medium text-xs'>Alumunium</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Tipe Produk</span>
            <span className='font-medium text-xs'>Assembly</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Penempatan Dikendaraan</span>
            <span className='font-medium text-xs'>Assembly</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Barang yang Disertakan</span>
            <span className='font-medium text-xs'>Seal</span>
          </div>
        </SectionCard>
        <SectionCard>
          <span className='text-sm font-semibold'>Detail Produk</span>
          <div className='w-full grid grid-cols-2 gap-4'>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Nomor OEM</span>
            <span className='font-medium text-xs'>49 303 53 121</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Nomor OE</span>
            <span className='font-medium text-xs'>1421022, LE 29 005 x</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Asal Produksi</span>
            <span className='font-medium text-xs'>Indonesia</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Tahun Produksi</span>
            <span className='font-medium text-xs'>08/2017</span>
            <span className='text-neutral-600 font-medium text-xs w-[150px]'>Garansi Merchant</span>
            <span className='font-medium text-xs'>30 hari</span>
          </div>
          <span className='flex justify-end gap-2 items-center text-primary-700 select-none cursor-pointer text-sm font-medium' onClick={()=>{}}>
            <span>Lihat Selengkapnya</span>
            <IconComponent classname={'chevron-blue'} src={`/icons/chevron-down.svg`} width={12} height={12} />
          </span>
          <span className='text-sm font-semibold'>Detail Produk</span>
          <p className='line-clamp-6 font-normal text-sm'>Peralatan asli nomor komponen 142 1022
Menyaring partikel berbahaya seperti debu, serbuk sari, pasir, jelaga, atau bahkan tetesan air dari air masuk
 Kertas timbul khusus untuk stabilitas lipatan yang baik dan mengurangi kebisingan masuk
Menyeimbangkan aliran udara menuju pengukur aliran udara dan menutup komponen yang berdekatan

Menyeimbangkan aliran udara menuju pengukur aliran udara dan menutup komponen yang berdekatan</p>
          <span className='flex justify-end gap-2 items-center text-primary-700 select-none cursor-pointer text-sm font-medium' onClick={()=>{}}>
            <span>Lihat Selengkapnya</span>
            <IconComponent classname={'chevron-blue'} src={`/icons/chevron-down.svg`} width={12} height={12} />
          </span>
        </SectionCard>
        <SectionCard>
          <Button Class='!h-8 !p-3 !border-none !rounded-md !max-w-none !w-full !text-neutral-900 !font-semibold !text-sm !bg-neutral-50 !justify-between' iconRight={'/icons/chevron-right.svg'}>Kompatibilitas</Button>
        </SectionCard>
        <SectionCard>
          <div className='flex gap-2 text-neutral-900'>

              <div className='w-11 h-11 rounded-full border border-neutral-500 overflow-hidden'>
                  <Image src={'/img/chopper.png'} width={44} height={44} objectFit='cover' />
              </div>
              <div className='flex flex-col gap-2'>
                  <p className='font-semibold text-sm'>SparePro</p>
                  <span className='font-medium text-xs gap-1 flex text-neutral-600'>
                      <span>Online</span>
                      <span>2 Jam yang lalu</span>
                  </span>
              </div>
          </div>
          <div className='flex gap-1 text-xs'>
              <Image src={"/icons/product-star.svg"} width={16} height={16} alt="Rating"/>
              <span>4,9</span>
              <span>(1.200 rating)</span>
          </div>
        </SectionCard>
        <SectionCard>
          <div className='flex flex-col gap-4 text-neutral-900 text-xs font-medium'>
              <div className='border-b border-neutral-400 pb-4 flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <Image src={'/icons/marker-outline.svg'} width={16} height={16} alt='marker' />
                    <span className='text-neutral-600'>Lokasi  Penjual</span>
                    <span>Kota Surabaya</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <Image src={'/icons/time.svg'} width={16} height={16} alt='marker' />
                    <span className='text-neutral-600'>Jam Operasional</span>
                    <span className='text-success-400'>Buka</span>
                    &#183; 
                    <span>08:00 - 12:00</span>
                    <span className='cursor-pointer'>
                        <IconComponent src={'/icons/chevron-down.svg'} />
                    </span>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                  <div className='flex gap-2 items-center'>
                      <Image src={'/icons/truck-outline.svg'} width={16} height={16} alt='marker' />
                      <span className='text-neutral-600'>Opsi Pengiriman</span>
                  </div>
                  <div className='flex gap-2 ml-6'>
                      <span>JNE : mulai Rp12.000 </span>
                      <span className='text-neutral-600'>(est. tiba 02 Feb 2024 - 05 Feb 2024)</span>
                  </div>
                  <div className='flex gap-2 ml-6'>
                      <span>JNT : mulai Rp6.000</span>
                      <span className='text-neutral-600'>(est. tiba 02 Feb 2024)</span>
                  </div>
                  <span className='text-primary-700 text-xs font-medium ml-6'>Lihat Opsi Pengiriman Lainnya</span>
                  <Button Class='ml-6 !bg-primary-50 !text-xs !font-semibold !rounded-md !py-1 !px-2 !w-[calc(100% - 24px)] !max-w-none !border-none' color='primary_secondary'>Wajib Asuransi Pengiriman</Button>
              </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

export default DetailProductPageResponsive

export const SectionCard =({children})=>{
  return (
    <div className='py-6 px-4 bg-neutral-50 flex flex-col gap-4 text-neutral-900'>
      {children}
    </div>
  )
}