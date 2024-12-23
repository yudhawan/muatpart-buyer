
'use client';
import { useEffect, useState } from 'react';
import IconComponent from '../IconComponent/IconComponent';
import style from './ButtonPlusMinus.module.scss'
function ButtonPlusMinus({number,increment=()=>{},decrement=()=>{},min=0,max}) {
    const [state,setState]=useState(0)
    function incrementFn() {
        let newState = state
        if(typeof max==='number'&& (newState+1)>max) {
            setState(max)
            return
        };
        setState(newState+1)
        increment(newState+1)
    }
    function decrementFn() {
        let newState = state
        if(typeof min==='number'&&(newState-1)<min) {
            setState(min)
            return
        };
        setState(newState-1)
        decrement(newState-1)
    }
    useEffect(()=>{
        if(number)setState(number)
    },[number])
    return (
        <div className={style.main+' flex w-[110px] h-8 px-3 items-center border border-neutral-600 rounded-md justify-between'}>
            <span onClick={decrementFn} className='cursor-pointer'><IconComponent src={'/icons/minus-small.svg'} /></span>
            <span className='text-neutral-900 font-medium text-xs select-none'>{state}</span>
            <span onClick={incrementFn} className='cursor-pointer'><IconComponent src={'/icons/plus-small.svg'} /></span>
        </div>
    );
}

export default ButtonPlusMinus;
  