
import { useHeader } from '@/common/ResponsiveContext'
import React, { useEffect } from 'react'
import style from './Categories.module.scss'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import IconComponent from '@/components/IconComponent/IconComponent'
function CategoriesResponsive() {
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
    if(screen==='example4'){
      setAppBar({
        title:'Example 4',
        appBarType:'header_search_secondary',
        onBack:()=>setScreen('example3')
      })
      setSearch({
        placeholder:'Pencarian Example 4'
      })
    }
  },[screen])
  
  if (screen==='example4') return (
    <div className=' flex flex-col'>
      <p>Example 4</p>
    </div>
  )
  // main screen
  return (
    <div className={style.main+' !pt-0 pb-6'}>
      {/* carousel */}
      <div className='containerMobile !py-4 flex flex-col gap-[22px]'>
        {/* rekomendasi produk */}
        <div className='flex w-full justify-between items-center'>
          <span className='font-bold text-neutral-900 text-[18px]'>Rekomendasi Produk</span>
          <Button Class='!bg-neutral-50 border !border-neutral-600 !rounded-md !text-sm !font-semibold !text-neutral-900 h-8' iconRight={'/icons/chevron-right.svg'}>Kategori</Button>
        </div>
        {/* list product */}
        <div className='flex flex-col gap-6'>
          {/* fetch product */}
          <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-3'>
                  <div className='flex gap-4 item-center'>
                      <span className='font-bold text-neutral-900 text-sm'></span>
                      <span className='text-[#176CF7] font-bold text-xs cursor-pointer'>Lihat Semua</span>
                  </div>
              </div>
              <div className='flex gap-2'>

              </div>
          </div>
        </div>
      </div>
      <div className={style.muatPlus}>
        <div className='flex flex-col gap-3 items-center'>
          <p className='text-neutral-50 text-base font-medium'>Dapatkan keuntungan lebih
          dengan berlangganan membership di</p>
          <div className='flex gap-2 item-center'>
            <IconComponent src='/icons/muatplu-shield.svg' width={40} height={40} />
            <p className='font-bold text-neutral-50 text-2xl'>muatparts +PLUS</p>
          </div>
          <Button color='primary_secondary' Class='h-7 !border-none'>Pelajari Selengkapnya</Button>
        </div>
        <div className='grid grid-cols-2 gap-[9px]'>
          <div className='flex flex-col gap-[9px] rounded p-[14px] bg-neutral-50'>
            <Image src={'/img/plus1.png'} width={36} height={36} />
            <span className='font-bold text-xs text-[#176CF7]'>Jaminan Produk Original</span>
          </div>
          <div className='flex flex-col gap-[9px] rounded p-[14px] bg-neutral-50'>
            <Image src={'/img/plus2.png'} width={36} height={36} />
            <span className='font-bold text-xs text-[#176CF7]'>Dapat Mengirim RFQ</span>
          </div>
          <div className='flex flex-col gap-[9px] rounded p-[14px] bg-neutral-50'>
            <Image src={'/img/plus3.png'} width={36} height={36} />
            <span className='font-bold text-xs text-[#176CF7]'>Gratis Tools Pengaturan Stock di Stockist</span>
          </div>
          <div className='flex flex-col gap-[9px] rounded p-[14px] bg-neutral-50'>
            <Image src={'/img/plus4.png'} width={36} height={36} />
            <span className='font-bold text-xs text-[#176CF7]'>Voucher Eksklusif</span>
          </div>
          
        </div>
        <Image src={'/img/muatplus-garis.png'} width={1688} height={815} alt='plus' className='absolute -bottom-[30%] opacity-5 -right-0' />
      </div>


    </div>
  )
}

export default CategoriesResponsive
  