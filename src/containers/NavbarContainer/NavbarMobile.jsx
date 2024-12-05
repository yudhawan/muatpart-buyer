import React from 'react'
import style from './navbar.module.scss'
function NavbarMobile({children,type,classname,setAppBarClickBack}) {
  return (
    <div className={`${style.main} ${classname}`}>
      {children?children:<div>mobile</div>}
    </div>
  )
}

export default NavbarMobile
