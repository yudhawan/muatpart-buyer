import Checkbox from '@/components/Checkbox/Checkbox'
import categories from '@/containers/HomePage/mock'
import React from 'react'

function BrandScreenProduct({actionFilter}) {
  return (
    <div className='containerMobile pb-[80px] flex flex-col gap-3 w-full h-full bg-[#fcfcfc]'>
        {
            categories.map(val=>{
                return(
                    <>
                        <Checkbox classname={'font-semibold text-sm text-neutral-900 pb-3 border-b border-neutral-400'} label={val.name}/>
                    </>
                )
            })
        }
        {actionFilter}
    </div>
  )
}

export default BrandScreenProduct