import { ResponsiveContext, useHeader } from '@/common/ResponsiveContext'
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import RadioButton from '@/components/Radio/RadioButton'
import React, { useState } from 'react'

function GarageScreenProduct({data,getFilterProduct,handleInput,search,setSearch}) {
    const [state,setState]=useState(getFilterProduct?.garage)
    const {setScreen}=useHeader()
  return (
    <div className='containerMobile pb-[80px] flex flex-col gap-3 bg-[#fcfcfc] h-screen'>
        {
            data?.filter(val=> val.name.toLowerCase().includes(search?.value?.toLowerCase())).map(val=>{
                return(
                    <React.Fragment key={val.id}>
                        <RadioButton checked={val.name===state} value={val.name} onClick={a=>setState(a.value)} label={val.name} classnameLabel={'font-semibold text-sm text-neutral-900 pb-3 border-b border-neutral-400m w-full'} classname={'!items-start w-full'} />
                    </React.Fragment>
                )
            })
        }
        <ButtonBottomMobile textLeft={'Reset'} textRight={'Terapkan'} onClickLeft={()=>setScreen('filter')} onClickRight={()=>{
            handleInput('garage',state)
            setScreen('filter')
        }} />
    </div>
  )
}

export default GarageScreenProduct
