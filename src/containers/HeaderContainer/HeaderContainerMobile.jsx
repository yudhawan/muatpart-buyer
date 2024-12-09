import React, { useContext, useEffect, useRef } from 'react'
import style from './HeaderContainer.module.scss'
import Image from 'next/image'
import IconComponent from '@/components/IconComponent/IconComponent'
import Input from '@/components/Input/Input'
import { headerProps } from './headerProps'
import { ResponsiveContext } from '@/common/ResponsiveContext'
function HeaderContainerMobile({
    renderAppBarMobile,
    type
}) {
  const {setHeaderHeight,searchTitle,setSearch} = headerProps()
  const headerRef = useRef(null)
  const {setAppBarTypeMobile,appBarType} = useContext(ResponsiveContext)
  useEffect(()=>{
      if(headerRef?.current?.offsetHeight) setHeaderHeight?.(headerRef?.current?.offsetHeight)
  },[appBarType])
  return (
    <header className={style.main} ref={headerRef}>
      {
      type?<HeaderMainSearchMobile type={type} title={searchTitle}/>
      :<div className='bg-[#c22716] relative w-full h-auto max-h-[88px] p-4 pb-3'>
        {
            renderAppBarMobile?
            renderAppBarMobile
            :<div className='flex flex-col'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='w-6 h-6 rounded-full bg-neutral-50 flex justify-center items-center cursor-pointer'>
                    <IconComponent src={'/icons/chevron-left.svg'} classname={style.iconBackRed} />
                  </span>
                  <Input onFocus={()=>{
                    setSearch('searchTitle','Cari berdasarkan')
                    setAppBarTypeMobile('defaultTitleMain')}} classname={style.inputMobile} placeholder='Cari Produk' icon={{left:'/icons/search.svg'}} />
                </div>
                <div className='flex gap-4 items-start'>
                  <span className='gap-[2px] flex flex-col items-center'>
                    <IconComponent classname={style.iconWhiteGarasi} src={'/icons/garasi.svg'} width={20} height={20} />
                    <span className='font-semibold text-neutral-50 text-[10px]'>Garasi</span>
                  </span>
                  <span className='gap-[2px] flex flex-col items-center'>
                    <IconComponent classname={style.iconCartMobile} src={'/icons/cart.svg'} width={20} height={20} />
                    <span className='font-semibold text-neutral-50 text-[10px]'>Troli</span>
                  </span>
                  <span className='gap-[2px] flex flex-col items-center'>
                    <IconComponent classname={style.iconCartMobile} src={'/icons/burger.svg'} width={20} height={20} />
                    <span className='font-semibold text-neutral-50 text-[10px]'>Lainnya</span>
                  </span>
                </div>
              </div>
              <div className='w-auto max-w-[155px] h-6 p-2 rounded-md bg-neutral-50 flex items-center gap-1 ml-8'>
                <span className='font-semibold text-[9px] text-[#c22716]'>Dikirim Ke: Kota Surabaya</span>
                <IconComponent src={'/icons/chevron-right.svg'} classname={style.iconBackRed} />
              </div>
              <Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0' />
            </div>
        }
      </div>}
      
    </header>
  )
}
export function HeaderMainSearchMobile({type,title,onBack}){
  const {searchPlaceholder, searchValue,setSearch} = headerProps()

  return(
    <div className='bg-neutral-50 relative w-full h-auto max-h-[88px] p-4 pb-3 flex gap-2 shadow-lg '>
      <div className='flex gap-5 w-full items-center'>
        <span onClick={onBack} className='w-6 h-6 bg-[#176cf7] rounded-full flex justify-center items-center cursor-pointer whitespace-nowrap'>
          <IconComponent width={16} height={16} classname={style.iconBackWhite} src={'/icons/chevron-left.svg'} />
        </span>
        {type==='search'&&<Input classname={style.inputSearchMobile} placeholder={searchPlaceholder} value={searchValue} changeEvent={e=>setSearch('searchValue',e.target.value)} />}
        {(type==='title' || type==='defaultTitleMain')&&<span className='font-bold text-base text-[#176cf7]'>{title}</span>}
      </div>
    </div>
  )
}
export default HeaderContainerMobile
