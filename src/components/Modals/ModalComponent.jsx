import { headerProps } from '@/containers/HeaderContainer/headerProps'
import style from './ModalComponent.module.scss'
import { useEffect, useRef, useState } from 'react'
import IconComponent from '../IconComponent/IconComponent'
import Image from 'next/image'
function ModalComponent({children,full,hideHeader=false,headerSize='small',isOpen,setClose,preventAreaClose,showButtonClose=true,classname,classnameContent}) {
    const {headerHeight} = headerProps()
    const [getIsOpen,setIsOpen] = useState()
    const parentRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (parentRef.current && !parentRef.current.contains(event.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    useEffect(()=>{
      setIsOpen(isOpen)
    },[isOpen])
  if(getIsOpen) return (
    <div 
      ref={parentRef}
      style={{
          top:full?'0':`${headerHeight}px`,
          height:full?'100vh':`calc(100% - ${headerHeight}px)`
      }} 
      className={`${style.main}  w-full overflow-hidden z-[92] flex justify-center items-center ${classname}`}
      onClick={()=>{
        if(!preventAreaClose){
          setIsOpen(false)
          setClose?.()
        }
      }}
    >
        <div 
          style={{
            top:full?'0':`${headerHeight}px`,
            height:full?'100vh':`calc(100% - ${headerHeight}px)`
          }} 
          className='bg-neutral-900 opacity-[0.4] w-full h-full fixed'/>
        {!hideHeader?<div className='bg-white '></div>:''}
        {children?<div className={`bg-white rounded-[10px] p-2 z-40 relative min-w-[386px] min-h-[208px] overflow-hidden ${!hideHeader?'pt-[78px]':''} ${classnameContent}`} onClick={e=>e.stopPropagation()}>
          {!hideHeader&&<Image src={`/icons/header-${headerSize}.svg`} width={386} height={208} className='absolute left-0 top-0 z-40' alt='header' />}
          {hideHeader&&showButtonClose?<span className='cursor-pointer' onClick={setClose}><IconComponent classname={'absolute z-50 right-2 top-2 '+style.closeBlue} src={'/icons/closes.svg'} width={18} height={18} /></span>:showButtonClose?<span onClick={setClose} className='cursor-pointer w-5 h-5 absolute z-[52] right-2 top-2 flex justify-center items-center bg-white rounded-full'><IconComponent classname={style.closeRed} width={8} height={8} src={'/icons/closes.svg'} /></span>:''
          }
          {children}
          </div>:''}
    </div>
  )
}

export default ModalComponent