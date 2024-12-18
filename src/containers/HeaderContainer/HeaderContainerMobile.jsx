import React, { useContext, useEffect, useRef } from 'react'
import style from './HeaderContainer.module.scss'
import Image from 'next/image'
import IconComponent from '@/components/IconComponent/IconComponent'
import Input from '@/components/Input/Input'
import { headerProps } from './headerProps'
import { ResponsiveContext } from '@/common/ResponsiveContext'
function HeaderContainerMobile() {
  const {setHeaderHeight,searchTitle,headerHeight} = headerProps()
  const headerRef = useRef(null)
  const {
    setAppBar,
    handleBack,
    clearScreen,
    handleAction,
    appBar,
    appBarType,
    screen,
    search,
    shadow,
    renderAppBarMobile,
    showReset,
    setSearch} = useContext(ResponsiveContext)
  useEffect(()=>{
      if(headerRef?.current?.offsetHeight) setHeaderHeight?.(headerRef?.current?.offsetHeight)
  },[appBarType,screen,appBar])
  return (
    <header className={style.main} ref={headerRef}>
      {
        appBarType.includes('compact')&&<HeaderMainCompact/>
      }
      {
        !!(appBarType==='header_title_secondary'|appBarType==='header_search_secondary'|appBarType==='header_title'|appBarType==='header_search')&&<HeaderTitleSearchMobile appBar={appBar} type={appBarType} title={appBar?.title} onBack={handleBack} setSearch={setSearch} searchPlaceholder={search?.placeholder} searchValue={search?.value} screen={screen} shadow={shadow} />
      }
      {
        !!(appBarType.includes('title_modal')|appBarType.includes('search_modal'))&&<HeaderModalMobile shadow={shadow} handleAction={handleAction} setAppBar={setAppBar} appBar={appBar} type={appBarType} title={appBar?.title} onBack={handleBack} setSearch={setSearch} searchPlaceholder={search?.placeholder} searchValue={search?.value} showReset={showReset} screen={screen} />
      }
      {
      !appBarType&&<div className={`bg-[#c22716] relative w-full h-auto max-h-[88px] p-4 pb-3 ${shadow? 'shadow-lg':''}`}>
        {
            appBar?.renderAppBar?
            appBar?.renderAppBar
            :<div className='flex flex-col'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex items-center gap-2 w-full'>
                  {appBar?.showBackButton&&<span onClick={()=>handleBack()} className='w-6 h-6 rounded-full bg-neutral-50 flex justify-center items-center cursor-pointer'>
                    <IconComponent src={'/icons/chevron-left.svg'} classname={style.iconBackRed} width={24} />
                  </span>}
                  <Input focusEvent={()=>{
                    setAppBar({
                      onBack:()=>clearScreen(),
                      title:'Cari berdasarkan',
                      appBarType:'header_title_secondary',
                      defaultType:'default_search_navbar_mobile'
                    })
                    }} classname={style.inputMobile} placeholder='Cari Produk' icon={{left:'/icons/search.svg'}} />
                </div>
                <div className='flex gap-4 items-start'>
                  <span className='gap-[2px] flex flex-col items-center z-20'>
                    <IconComponent classname={style.iconWhiteGarasi} src={'/icons/garasi.svg'} width={20} height={20} />
                    <span className='font-semibold text-neutral-50 text-[10px]'>Garasi</span>
                  </span>
                  <span className='gap-[2px] flex flex-col items-center z-20'>
                    <IconComponent classname={style.iconCartMobile} src={'/icons/cart.svg'} width={20} height={20} />
                    <span className='font-semibold text-neutral-50 text-[10px]'>Troli</span>
                  </span>
                  <span className='gap-[2px] flex flex-col items-center z-20' onClick={()=>{
                    setAppBar({
                      onBack:()=>clearScreen(),
                      title:<Image width={100} className={style.muatMini} height={18} src={'/img/muatmuat-mini.png'} alt='mini' />,
                      appBarType:'header_title',
                      defaultType:'default_other_navbar_mobile',
                      blankBackground:true
                    })
                  }}>
                    <IconComponent classname={style.iconCartMobile} src={'/icons/burger.svg'} width={20} height={20} />
                    <span className='font-semibold text-neutral-50 text-[10px]'>Lainnya</span>
                  </span>
                </div>
              </div>
              <div className='w-auto max-w-[155px] h-6 p-2 rounded-md bg-neutral-50 flex items-center gap-1 ml-8'>
                <span onClick={()=>setAppBar({
                  appBarType:'header_title',
                  title:'Ke mana pesanan mau dikirim?',
                  defaultType:'default_location_navbar_mobile',
                  onBack:()=>clearScreen()
                })} className='font-semibold text-[9px] text-[#c22716]'>Dikirim Ke: Kota Surabaya</span>
                <IconComponent src={'/icons/chevron-right.svg'} classname={style.iconBackRed} />
              </div>
              {!appBar?.blankBackground?<Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0 fallin' />:''}
            </div>
        }
      </div>}

    </header>
  )
}

export function HeaderTitleSearchMobile({appBar,type,title,onBack,searchPlaceholder, searchValue,setSearch,shadow,screen}){
  const RenderBack=appBar?.renderBack||null
  const ActionButton = appBar?.renderActionButton||null
  const isBgSecondary = type==='header_title_secondary'|type==='header_search_secondary'
  return(
    <div className={`${isBgSecondary?'bg-neutral-50':'bg-[#c22716]'} relative w-full h-auto max-h-[88px] p-4 pb-3 flex gap-2 ${shadow? 'shadow-lg':''}`}>
      {!appBar?.blankBackground?<Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0' />:''}
      <div className='flex gap-2 w-full items-center'>
        {
        (appBar.showBackButton&&RenderBack)?
        <RenderBack/>:
        (appBar.showBackButton)?
        <span onClick={onBack} className={`w-6 h-6 ${isBgSecondary?'bg-[#176cf7]':'bg-neutral-50'} rounded-full flex justify-center items-center cursor-pointer whitespace-nowrap`}>
          <IconComponent width={16} height={16} classname={`${isBgSecondary?style.iconBackWhite:style.iconBackRed}`} src={'/icons/chevron-left.svg'} />
        </span>:''
        }
        {(type==='header_search' || type==='header_search_secondary')&&<Input classname={style.inputSearchMobile} placeholder={searchPlaceholder} value={searchValue} changeEvent={e=>setSearch({value:e.target.value})} />}
        {((type==='header_title' || type==='header_title_secondary')&&typeof title==='string')?<span className={`font-bold text-base ${isBgSecondary?'text-[#176cf7]':'text-neutral-50'}`}>{title}</span>:((type==='header_title' || type==='header_title_secondary')&&typeof title!=='string')?title:''}
        {
          ActionButton?ActionButton:''
        }
      </div>
    </div>
  )
}
export default HeaderContainerMobile

export function HeaderModalMobile({appBar,handleAction,type,title,onBack,searchPlaceholder, searchValue,setSearch,shadow,showReset,screen}) {
  const RenderBack=appBar?.renderBack||null
  const ActionButton = appBar?.renderActionButton||null
  const isSecondary = type==='header_title_modal_secondary'|type==='header_search_modal_secondary'
  return(
    <div className={`${isSecondary?'bg-neutral-50':'bg-[#c22716]'} relative w-full h-fit p-4 pb-3 ${shadow? 'shadow-lg':''}`}>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-2'>
            {
              (appBar.showBackButton&&RenderBack)?
              <RenderBack/>
              :appBar.showBackButton?
              <span onClick={()=>onBack()} className={`bg-none w-6 h-6 rounded-full flex justify-center items-center cursor-pointer`}>
                <IconComponent src={'/icons/closes.svg'} classname={`${isSecondary?style.iconBackBlue:style.iconBackWhite}`} />
              </span>:''
            }
            {type.includes('header_title')?
            <span className={`font-semibold text-sm ${isSecondary?'text-neutral-900':'text-neutral-50'}`}>{title}</span>
            :<Input changeEvent={e=>setSearch({value:e.target.value})} classname={style.inputMobile} placeholder={searchPlaceholder?searchPlaceholder:'Cari Produk'} icon={{left:'/icons/search.svg'}} />}
            {
              ActionButton?ActionButton:showReset?<span onClick={handleAction} className={`font-semibold text-sm cursor-pointer ${isSecondary?'text-primary-700':'text-neutral-50'}`}>Reset</span>:''
            }
          </div>
          {appBar?.withSearchBottom===screen&&<Input changeEvent={e=>setSearch({value:e.target.value})} classname={style.inputMobile} placeholder={searchPlaceholder?searchPlaceholder:'Cari Produk'} icon={{left:'/icons/search.svg'}} />}
          {!isSecondary&&<Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0' />}
        </div>
      </div>
  )
}


export function HeaderMainCompact() {
  const {
    setAppBar,
    handleBack,
    clearScreen,
    handleAction,
    appBar,
    appBarType,
    screen,
    search,
    shadow,
    setSearch} = useContext(ResponsiveContext)
  return (
    <div className={`bg-[#c22716] relative w-full h-auto max-h-[88px] p-4 pb-3 ${shadow? 'shadow-lg':''}`}>

      <div className='flex flex-col'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-center gap-2 w-full relative'>
            {appBar?.showBackButton&&<span onClick={()=>handleBack()} className='w-6 h-6 rounded-full bg-neutral-50 flex justify-center items-center cursor-pointer'>
              <IconComponent src={'/icons/chevron-left.svg'} classname={style.iconBackRed} width={24} />
            </span>}
            <Input 
              value={search?.value}
              changeEvent={e=> setSearch({value:e.target.value})}
              classname={style.inputMobileCompact+' items-center'} 
              placeholder={search?.placeholder?search?.placeholder:'Cari produk'} 
              icon={{left:<IconComponent width={20} height={20} src={'/icons/search.svg'}/>}} />
              {
                search?.value?<span className='absolute right-3 z-50' onClick={()=>setSearch({value:''})}><IconComponent width={10} height={10} src={'/icons/closes.svg'}/></span>:''
              }
          </div>
          <div className='flex gap-4 items-start'>
            <span className='gap-[2px] flex flex-col items-center z-20'>
              <IconComponent classname={style.iconWhiteGarasi} src={'/icons/garasi.svg'} width={20} height={20} />
              <span className='font-semibold text-neutral-50 text-[10px]'>Garasi</span>
            </span>
            <span className='gap-[2px] flex flex-col items-center z-20'>
              <IconComponent classname={style.iconCartMobile} src={'/icons/cart.svg'} width={20} height={20} />
              <span className='font-semibold text-neutral-50 text-[10px]'>Troli</span>
            </span>
          </div>
        </div>
        
        {!appBar?.blankBackground?<Image src='/img/fallinstartheader.png' width={153} height={62} alt='fallin' className='absolute right-0 bottom-0' />:''}
      </div>
    </div>
  )
}