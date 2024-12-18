
'use client';
import Image from 'next/image';
import style from './GlobalLoading.module.scss'
import { headerProps } from '@/containers/HeaderContainer/headerProps';
function GlobalLoading() {
    const { headerHeight } = headerProps();
    return <div style={{top:headerHeight+'px',height:`calc(100vh - ${headerHeight}px)`}} className='fixed flex w-full justify-center items-center bg-transparent backdrop-blur-md left-0'>
        <Image src={'/img/loading_animation.webp'} width={300} height={300} alt='loading' />
    </div>
}

export default GlobalLoading;
  