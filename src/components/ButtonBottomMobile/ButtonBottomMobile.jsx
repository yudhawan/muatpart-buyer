
'use client';
import Button from '../Button/Button';
import style from './ButtonBottomMobile.module.scss'
function ButtonBottomMobile({textLeft,textRight,onClickLeft,onClickRight}) {
    return(
    <div className={`${style.main} bg-neutral-50 h-[64px] w-full shadow-2xl flex gap-2 fixed z-50 bottom-0 left-0`}>
        <div className='w-full gap-2 py-3 px-4 flex shadow-2xl'>
            <Button onClick={onClickLeft} Class='!w-full !max-w-full' color='primary_secondary' >{textLeft}</Button>
            <Button onClick={onClickRight} Class='!w-full !max-w-full' >{textRight}</Button>
        </div>
    </div>
    )
}

export default ButtonBottomMobile;
  