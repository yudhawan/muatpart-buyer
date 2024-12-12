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
  const {setHeaderHeight,searchTitle} = headerProps()
  const headerRef = useRef(null)
  const {
    setAppBar,
    handleBack,
    handleAction,
    appBar,
    appBarType,
    screen,
    search,
    shadow,
    setSearch} = useContext(ResponsiveContext)
  useEffect(()=>{
      if(headerRef?.current?.offsetHeight) setHeaderHeight?.(headerRef?.current?.offsetHeight)
  },[appBarType,renderAppBarMobile,screen,appBar])
  return (
    <header className={style.main} ref={headerRef}>
      {
        !!(type==='titleSecondary'|type==='searchSecondary'|type==='navbarMobileDefaultScreen')&&<HeaderTitleSearchMobile appBar={appBar} type={type} title={appBar?.title} onBack={handleBack} setSearch={setSearch} searchPlaceholder={search?.placeholder} searchValue={search?.value} />
      }
      {
        type.includes('Modal')&&<HeaderModalMobile shadow={shadow} handleAction={handleAction} setAppBar={setAppBar} appBar={appBar} type={type} title={appBar?.title} onBack={handleBack} setSearch={setSearch} searchPlaceholder={search?.placeholder} searchValue={search?.value}/>
      }
      {
      !type&&<div className={`bg-[#c22716] relative w-full h-auto max-h-[88px] p-4 pb-3 ${shadow? 'shadow-lg':''}`}>
        {
            renderAppBarMobile?
            renderAppBarMobile
            :<div className='flex flex-col'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                  {appBar?.showBackButton&&<span onClick={()=>handleBack()} className='w-6 h-6 rounded-full bg-neutral-50 flex justify-center items-center cursor-pointer'>
                    <IconComponent src={'/icons/chevron-left.svg'} classname={style.iconBackRed} />
                  </span>}
                  <Input onFocus={()=>{
                    setAppBar({
                      onBack:()=>setAppBar({appBarType:''}),
                      title:'Cari berdasarkan',
                      appBarType:'navbarMobileDefaultScreen'
                    })
                    }} classname={style.inputMobile} placeholder='Cari Produk' icon={{left:'/icons/search.svg'}} />
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
export function HeaderTitleSearchMobile({appBar,type,title,onBack,searchPlaceholder, searchValue,setSearch,shadow}){
  const RenderBack=appBar?.renderBack||null
  const ActionButton = appBar?.ActionButton||null
  const isBgSecondary = type==='titleSecondary'|type==='searchSecondary'|type==='navbarMobileDefaultScreen'
  return(
    <div className={`${isBgSecondary?'bg-neutral-50':'bg-[#c22716]'} relative w-full h-auto max-h-[88px] p-4 pb-3 flex gap-2 ${shadow? 'shadow-lg':''}`}>
      <Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0' />
      <div className='flex gap-5 w-full items-center'>
        {
        (appBar.showBackButton&&RenderBack)?
        <RenderBack/>:
        (appBar.showBackButton)?
        <span onClick={onBack} className={`w-6 h-6 ${isBgSecondary?'bg-[#176cf7]':'bg-neutral-50'} rounded-full flex justify-center items-center cursor-pointer whitespace-nowrap`}>
          <IconComponent width={16} height={16} classname={`${isBgSecondary?style.iconBackWhite:style.iconBackRed}`} src={'/icons/chevron-left.svg'} />
        </span>:''
        }
        {(type==='search' || type==='searchSecondary')&&<Input classname={style.inputSearchMobile} placeholder={searchPlaceholder} value={searchValue} changeEvent={e=>setSearch({value:e.target.value})} />}
        {(type==='title' || type==='titleSecondary' || type==='navbarMobileDefaultScreen')&&<span className={`font-bold text-base ${type==='titleSecondary'?'text-[#176cf7]':'text-neutral-50'}`}>{title}</span>}
        {
          ActionButton?<ActionButton/>:''
        }
      </div>
    </div>
  )
}
export default HeaderContainerMobile

export function HeaderModalMobile({appBar,handleAction,type,title,onBack,searchPlaceholder, searchValue,setSearch,shadow}) {
  const RenderBack=appBar?.renderBack||null
  const ActionButton = appBar?.renderActionButton||null
  const isType = type==='titleModal'|type==='titleModalSecondary'|type==='searchModal'|type==='searchModalSecondary'

  return(
    <div className={`${type.includes('Secondary')?'bg-neutral-50':'bg-[#c22716]'} relative w-full h-auto max-h-[88px] p-4 pb-3 ${shadow? 'shadow-lg':''}`}>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between gap-2'>
            {
              (appBar.showBackButton&&RenderBack)?
              <RenderBack/>
              :appBar.showBackButton?
              <span onClick={()=>onBack()} className={`bg-none w-6 h-6 rounded-full flex justify-center items-center cursor-pointer`}>
                <IconComponent src={'/icons/closes.svg'} classname={`${type.includes('Secondary')?style.iconBackBlue:style.iconBackWhite}`} />
              </span>:''
            }
            {type.includes('Secondary')?
            <span className={`font-semibold text-sm ${type.includes('Secondary')?'text-neutral-900':'text-neutral-50'}`}>{title}</span>
            :<Input changeEvent={e=>setSearch({value:e.target.value})} classname={style.inputMobile} placeholder={searchPlaceholder?searchPlaceholder:'Cari Produk'} icon={{left:'/icons/search.svg'}} />}
            {
              ActionButton?<ActionButton/>:<span onClick={handleAction} className={`font-semibold text-sm cursor-pointer ${type.includes('Secondary')?'text-primary-700':'text-neutral-50'}`}>Reset</span>
            }
          </div>
          <Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0' />
        </div>
      </div>
  )
}