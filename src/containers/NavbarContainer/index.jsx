import React from 'react'
import NavbarMobile from './NavbarMobile'
import { viewport } from '@/store/viewport'
import NavbarWeb from './NavbarWeb'

function NavbarContainer({childrenMobile,children,type,setAppBarClickBack}) {
  const {isMobile}=viewport()
  if(isMobile)return <NavbarMobile children={childrenMobile} type={type} setAppBarClickBack={setAppBarClickBack} />
  return <NavbarWeb children={children}/>
}

export default NavbarContainer
