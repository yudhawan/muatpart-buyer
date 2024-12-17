import { useHeader } from '@/common/ResponsiveContext'
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import RadioButton from '@/components/Radio/RadioButton'
import React, { useState } from 'react'
const types={
    'Type':'type',
    'Brand':'brand',
    'Tahun':'year',
    'Model':'model'
}
function VehicleTypeScreenProduct({data,getFilterProduct,handleInput,search,setSearch}) {
    const [state,setState]=useState(getFilterProduct?.vehicleType)
    const separateKey = search?.placeholder?.split(' ')[1]
    function onClickValue(key,val) {
        setState(prev=>({...prev,[key]:val}))
    }
    const {setScreen}=useHeader()
  return (
    <div className='containerMobile pb-[80px] flex flex-col gap-3 bg-[#fcfcfc] h-screen'>
        {
            data?.[types[separateKey]]?.filter(val=> val.name.toLowerCase().includes(search?.value?.toLowerCase())).map(val=>{
                return(
                    <React.Fragment key={val.id}>
                        <RadioButton checked={val.name===state?.[types[separateKey]]} value={val.name} onClick={a=>onClickValue(types[separateKey],a.value)} label={val.name} classnameLabel={'font-semibold text-sm text-neutral-900 pb-3 border-b border-neutral-400m w-full'} classname={'!items-start w-full'} />
                    </React.Fragment>
                )
            })
        }
        <ButtonBottomMobile textLeft={'Reset'} textRight={'Terapkan'} onClickLeft={()=>setScreen('filter')} onClickRight={()=>{
            handleInput('vehicleType',state)
            setScreen('filter')
        }} />
    </div>
  )
}

export default VehicleTypeScreenProduct
