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
    if(isMobile) return <HeaderContainerMobile renderAppBarMobile={renderAppBarMobile} type={type} />
    return <HeaderContainerWeb renderAppBar={renderAppBar} />
}

export default HeaderContainer
