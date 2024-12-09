import React, { useEffect, useRef, useState } from 'react'
import style from './HeaderContainer.module.scss'
import Link from 'next/link'
import Dropdown from '@/components/Dropdown/Dropdown'
import Input from '@/components/Input/Input'
import IconComponent from '@/components/IconComponent/IconComponent'
import Image from 'next/image'
import { headerProps } from './headerProps'
import ModalComponent from '@/components/Modals/ModalComponent'
const ProfileHover = [
    {
        url:'/',
        icon:'/icons/heart-outline.svg',
        title:'Favorit',
        badges:0
    },
    {
        url:'/',
        icon:'/icons/messages-outline.svg',
        title:'Diskusi',
        badges:0
    },
    {
        url:'/',
        icon:'/icons/voucher-outline.svg',
        title:'Voucher Saya',
        badges:3
    },
    {
        url:'/',
        icon:'/icons/list-outline.svg',
        title:'Daftar Pesanan',
        badges:0
    },
    {
        url:'/',
        icon:'/icons/product-reviews-outline.svg',
        title:'Ulasan Produk',
        badges:0
    }
]
function HeaderContainerWeb({renderAppBar}) {
    const headerRef = useRef(null)
    const [getProfile,setProfile]=useState(ProfileHover)
    const [showCategory,setShowCategory]=useState(false)
    const [showLocation,setShowLocation]=useState(false)

    const {setHeaderHeight} = headerProps()
    useEffect(()=>{
        if(getProfile.length) {
            const newProfileUpdate = getProfile.map(val=>{
                if(val.title==='Favorit') val.badges=3
                if(val.title==='Diskusi') val.badges=3
                return val
            })
            setProfile(newProfileUpdate)
        }
    },[])
    useEffect(()=>{
        if(headerRef?.current?.offsetHeight) setHeaderHeight(headerRef?.current?.offsetHeight)

    },[])
  return (
    <header className={style.main} ref={headerRef}>
        <ModalComponent hideHeader isOpen={showCategory} setClose={()=>setShowCategory(false)}>asds</ModalComponent>
        {
            <>
                {!renderAppBar && (
                    <div className="w-full h-9 bg-[#c22716] py-2 flex ">
                        <div className='w-full max-w-[1280px] mx-auto px-10 flex justify-between'>
                            <div className='flex items-center gap-2 cursor-pointer group relative'>
                                <Image src={'/icons/phone.svg'} width={10} height={10} alt='phone' />
                                <p className='text-neutral-50 font-semibold  text-xs pt-[1px]'>Download muatmuat</p>
                                <div className='hidden absolute group-hover:flex top-2 left-0 pt-4 cursor-default'>
                                    <div className='bg-white rounded-xl w-[352px] h-[156px] shadow-xl z-[90] overflow-hidden gap-3 flex p-4'>
                                        <Image width={132} height={132} src={'/img/barcode.png'} alt='barcode' />
                                        <div className='flex flex-col gap-4'>
                                            <span className='text-neutral-900 text-sm font-semibold'>Scan QR atau download app dari : </span>
                                            <Link href={'https://muatmuat.com/register/download_apps'}>
                                                <Image width={98} height={28} alt='playstore' src={'/img/GooglePlay.png'} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-6'>
                                <Link href={'/'} className='text-neutral-50 font-medium  text-xs pt-[1px]'>Kembali ke muatmuat</Link>
                                <Link href={'/'} className='text-neutral-50 font-medium  text-xs pt-[1px]'>Pusat bantuan</Link>
                                <Link href={'/'} className='flex gap-1'>
                                    <Image src={'/icons/store.svg'} width={14} height={14} alt='store' />
                                    <p className='text-neutral-50 font-medium  text-xs pt-[1px]'>Seller/Partenr Center</p>
                                </Link>
                                <div className='flex items-center gap-3 cursor-pointer group relative'>
                                    <Image src={'/img/chopper.png'} width={20} height={20} alt='profil' className='rounded-full' />
                                    <span className='text-neutral-50 font-medium  text-xs w-[104px] line-clamp-1 mt-[1px]'>Ruben Coda S.I Terrrrr</span>
                                    <div className='hidden absolute group-hover:flex top-2 right-0 pt-4'>

                                        <div className='bg-white z-[91] w-[327px] p-4 cursor-default h-[192px] flex rounded-lg p4 divide-x-2 divide-neutral-500 shadow-xl'>
                                            <div className='flex flex-col gap-4 pr-3'>
                                                {
                                                    getProfile.map(val=>{
                                                        return(
                                                            <Link href={val.url} className='flex items-center justify-between gap-4 w-full'>
                                                                <div className='flex items-center gap-[10px]'>
                                                                    <Image width={16} height={16} src={val.icon} alt={val.title} />
                                                                    <span className='font-medium text-xs text-neutral-900'>{val.title}</span>
                                                                </div>
                                                                {val.badges?<span className='w-4 h-4 bg-error-400 rounded-full flex justify-center items-center font-bold text-[6px] text-neutral-50'>{val.badges}</span>:''}
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='flex flex-col gap-4 pl-3'>
                                                <Link href={'/'} className='flex items-center gap-[10px]'>
                                                    <Image width={16} height={16} src={'/icons/user-outline.svg'} alt='profile' />
                                                    <span className='font-medium text-xs text-neutral-900'>Profile</span>
                                                </Link>
                                                <Link href={'/'} className='flex items-center gap-[10px]'>
                                                    <Image width={16} height={16} src={'/icons/user-setting-outline.svg'} alt='profile' />
                                                    <span className='font-medium text-xs text-neutral-900'>Pengaturan Akun</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full bg-primary-700 flex py-3  h-[80px]">
                    {!renderAppBar ? (
                    <div className='w-full max-w-[1280px] mx-auto flex items-center px-10 justify-between'>
                        <Link href="/" className="mr-4">
                            <Image src="/img/muatparts.png" width={136} height={32} alt="Logo" className="h-8" />
                        </Link>
                        <div>

                        </div>
                        <Dropdown classname={'!w-[164px]'} options={[{value:'all',name:'Semua Kategori'}]} />
                        <div className='relative'>
                            <Input classname={style.inputSearch} width={391} icon={{right:<IconComponent src={'/icons/search.svg'} classname={style.iconnSearch} />}} />
                            <div className='absolute flex gap-4 -bottom-5 left-0'>
                                <Link href={'/'} className='text-neutral-50 text-xs font-medium'>Ban Engkel</Link>
                                <Link href={'/'} className='text-neutral-50 text-xs font-medium'>ACCU CDD</Link>
                                <Link href={'/'} className='text-neutral-50 text-xs font-medium'>Tali</Link>
                                <Link href={'/'} className='text-neutral-50 text-xs font-medium'>Spare Part Colt Diesel Double</Link>
                            </div>
                        </div>
                        
                        <Link href="/tips" className="flex items-center gap-1">
                            <Image src="/icons/tips-white.svg" alt="" width={16} height={16}/>
                            <span className="text-neutral-50 text-[10px] font-medium">Tips</span>
                        </Link>
                        
                        <Link href="/garasi" className="flex items-center mr-4 bg-white p-2 rounded-md h-8">
                            <Image src="/icons/garasi.svg" alt="" width={16} height={16} />
                            <span className="ml-2 text-neutral-900 text-xs font-medium">Garasi Saya</span>
                        </Link>
                        <div className='flex items-center gap-3'>
                            <span className='relative cursor-pointer'>
                                <Image src={'/icons/cart.svg'} width={24} height={24} alt='cart' />
                                <span className='bg-error-500 border border-neutral-50 rounded-[30px] font-medium text-[8px] text-neutral-50 p-[2px] px-[6px] flex text-center absolute -top-[9px] -right-3 w-fit'>23</span>
                            </span> 
                            <span className='relative cursor-pointer'>
                                <Image src={'/icons/messages-header.svg'} width={24} height={24} alt='cart' />
                                <span className='bg-error-500 border border-neutral-50 rounded-[30px] font-medium text-[8px] text-neutral-50 p-[2px] px-[6px] flex text-center absolute -top-[9px] -right-3 w-fit'>23</span>
                            </span> 
                            <span className='relative cursor-pointer'>
                                <Image src={'/icons/notification-header.svg'} width={24} height={24} alt='cart' />
                                <span className='bg-error-500 border border-neutral-50 rounded-[30px] font-medium text-[8px] text-neutral-50 p-[2px] px-[6px] flex text-center absolute -top-[9px] -right-3 w-fit'>23</span>
                            </span> 
                        </div>
                        <div className="w-px h-8 bg-white mx-4" />
                        
                        <Link 
                        href="/login"
                        className="px-6 py-2 bg-[#002C84] rounded-3xl text-neutral-50 text-sm font-semibold flex gap-1 whitespace-nowrap"
                        >
                            <IconComponent src={'/icons/Plus.svg'} />
                            <p>Jual Produk</p>
                        </Link>
                    </div>
                    ) : (
                    renderAppBar
                    )}
                </div>
                {!renderAppBar && (
                    <div className="w-full flex h-8 bg-primary-700-red-500 bg-primary-700 ">
                        <div className='w-full max-w-[1280px] mx-auto flex justify-between px-10 items-end'>
                            <div className='w-[137px] h-7 bg-[#c22716] py-[6px] px-4 rounded-tr-md rounded-tl-md flex items-center gap-2 cursor-pointer' onClick={()=>setShowCategory(!showCategory)}>
                                <IconComponent src={'/icons/kategori.svg'} />
                                <p className='font-semibold text-sm text-neutral-50'>Kategori</p>
                                <IconComponent classname={'chevron-white'} src={'/icons/chevron-down.svg'} />
                            </div>
                            <div className='w-auto max-w-[274px] h-7 bg-[#c22716] py-[6px] px-4 rounded-tr-md rounded-tl-md flex items-center cursor-pointer gap-2' onClick={()=>setShowLocation(!showLocation)}>
                                <IconComponent classname={'chevron-white'} src={'/icons/lokasi.svg'} width={24} />
                                <p className='font-semibold text-sm text-neutral-50 w-full max-w-[194px]'>Dikirim ke:  Surabaya</p>
                                <IconComponent classname={'chevron-white'} src={'/icons/chevron-down.svg'} />
                            </div>
                        </div>
                    </div>
                )}
            </>
        }
    </header>
  )
}

export default HeaderContainerWeb
