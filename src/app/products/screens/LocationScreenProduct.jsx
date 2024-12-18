import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import Checkbox from '@/components/Checkbox/Checkbox'
import categories from '@/containers/HomePage/mock'
import React, { useState } from 'react'

function LocationScreenProduct({getFilterProduct}) {
    const [state,setState]=useState(getFilterProduct?.location)
    const {setScreen}=useHeader()
  return (
    <div className='containerMobile pb-[80px] flex flex-col gap-3 bg-[#fcfcfc]'>
        {
            categories.map(val=>{
                return(
                    <React.Fragment key={val.id}>
                        <Checkbox classname={'font-semibold text-sm text-neutral-900 pb-3 border-b border-neutral-400'} label={val.name}/>
                    </React.Fragment>
                )
            })
        }
        <ButtonBottomMobile textLeft={'Reset'} textRight={'Terapkan'} onClickLeft={()=>setScreen('filter')} onClickRight={()=>{}} />
    </div>
  )
}

export default LocationScreenProduct