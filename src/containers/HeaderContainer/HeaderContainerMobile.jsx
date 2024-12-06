import React from 'react'
import style from './HeaderContainer.module.scss'
function HeaderContainerMobile({
    renderAppBarMobile,
    type
}) {
  return (
    <header className={style.main}>
      {
        renderAppBarMobile?
        renderAppBarMobile
        :<>
        {
            <>
            </>
        }
        </>
      }
    </header>
  )
}

export default HeaderContainerMobile
