
'use client';
import Input from '../Input/Input';
import style from './DefaultInputMobile.module.scss'
function DefaultInputMobile({classname,label,onChange,value,placeholder,...props}) {
    return (
        <div className={`${style.main} flex flex-col gap-4 ${classname}`}>
            <span className='semi-sm text-neutral-900'>{label}</span>
            <Input classname={'w-full'} value={value} changeEvent={onChange} placeholder={placeholder} {...props} />
        </div>
    );
}

export default DefaultInputMobile;
  