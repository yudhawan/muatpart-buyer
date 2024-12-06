import React from 'react'
import style from './HeaderContainer.module.scss'
import Link from 'next/link'
import Dropdown from '@/components/Dropdown/Dropdown'
import Input from '@/components/Input/Input'
import IconComponent from '@/components/IconComponent/IconComponent'
import Image from 'next/image'
function HeaderContainerWeb({renderAppBar}) {
  return (
    <header className={style.main}>
      
        {
            <>
                {!renderAppBar && (
                    <div className="w-full h-9 bg-[#c22716] py-2 flex ">
                        <div className='w-full max-w-[1280px] mx-auto px-10 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <Image src={'/icons/phone.svg'} width={10} height={14} alt='phone' />
                                <p className='text-neutral-50 font-semibold  text-xs pt-[1px]'>Download muatmuat</p>
                            </div>
                            <div className='flex items-center gap-6'>
                                <p className='text-neutral-50 font-medium  text-xs pt-[1px]'>Kembali ke muatmuat</p>
                                <p className='text-neutral-50 font-medium  text-xs pt-[1px]'>Pusat bantuan</p>
                                <span className='flex gap-1'>
                                    <Image src={'/icons/store.svg'} width={14} height={14} alt='store' />
                                    <p className='text-neutral-50 font-medium  text-xs pt-[1px]'>Seller/Partenr Center</p>
                                </span>
                                <div className='flex items-center gap-3'>
                                    <Image src={'/img/chopper.png'} width={20} height={20} alt='profil' className='rounded-full' />
                                    <span className='text-neutral-50 font-medium  text-xs w-[104px] line-clamp-1 mt-[1px]'>Ruben Coda S.I Terrrrr</span>
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
                        
                        <Input classname={style.inputSearch} width={391} icon={{right:<IconComponent src={'/icons/search.svg'} classname={style.iconnSearch} />}} />
                        
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
                            <div className='w-[137px] h-7 bg-[#c22716] py-[6px] px-4 rounded-tr-md rounded-tl-md flex items-center gap-2 cursor-pointer'>
                                <IconComponent src={'/icons/kategori.svg'} />
                                <p className='font-semibold text-sm text-neutral-50'>Kategori</p>
                                <IconComponent classname={'chevron-white'} src={'/icons/chevron-down.svg'} />
                            </div>
                            <div className='w-auto max-w-[274px] h-7 bg-[#c22716] py-[6px] px-4 rounded-tr-md rounded-tl-md flex items-center cursor-pointer gap-2'>
                                <IconComponent classname={'chevron-white'} src={'/icons/lokasi.svg'} />
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
