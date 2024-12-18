import React from 'react'
import style from './BottomTabNavigation.module.scss'
import IconComponent from '@/components/IconComponent/IconComponent'
import Link from 'next/link'
import Image from 'next/image'
function BottomTabNavigation() {
  return (
    <div className={style.main+' shadow-lg'}>
        <div className={style.container}>
            <Link href={'/'} className='flex flex-col gap-2 justify-center items-center'>
                <IconComponent width={24} height={24} src={'/icons/diskusi.svg'} />
                <span className='text-neutral-600 text-xs font-medium'>Pesan</span>
            </Link>
            <Link href={'/'} className='flex flex-col gap-2 justify-center items-center'>
                <span className='w-6 h-6'></span>
                <span className='text-neutral-600 text-xs font-medium'>Home</span>
            </Link>
            <Link href={'/'} className='flex flex-col gap-2 justify-center items-center'>
                <IconComponent width={24} height={24} src={'/icons/user-outline.svg'} />
                <span className='text-neutral-600 text-xs font-medium'>Profil</span>
            </Link>
            <span className={style.iconMuat}>
                <Image src={'/icons/muat-smile-button.svg'} width={75} height={75} alt='asd' />
            </span>
        </div>
    </div>
  )
}

export default BottomTabNavigation
