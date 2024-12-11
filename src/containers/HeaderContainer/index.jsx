import { viewport } from '@/store/viewport'
import React from 'react'
import HeaderContainerMobile from './HeaderContainerMobile'
import HeaderContainerWeb from './HeaderContainerWeb'

function HeaderContainer({
    renderAppBarMobile,
    renderAppBar,
    type
}) {
    const {isMobile} = viewport()
    if(typeof isMobile!=='boolean') return <HeaderPlaceholder/>
    if(isMobile) return <HeaderContainerMobile renderAppBarMobile={renderAppBarMobile} type={type} />
    return <HeaderContainerWeb renderAppBar={renderAppBar} />
}

export default HeaderContainer

function HeaderPlaceholder(){
    return <div className='fixed inset-0 h-[70px] w-full flex p-2'>
        <div className='h-10 w-full animate-pulse'></div>
    </div>
}
