import React from 'react'
import style from './navbar.module.scss'
function NavbarWeb({children,classname}) {
  return (
    <div className={`${style.main} ${classname}`}>
      {children?children:<div>web</div>}
    </div>
  )
}

export default NavbarWeb
