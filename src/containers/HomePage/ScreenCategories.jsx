import React from 'react'

function ScreenCategories({data}) {
  return (
    <div className='w-full h-full flex flex-col bg-neutral-100 containerMobile'>
      <ul className='list-none flex flex-col gap-4'>
        {
            data?.subCategories?.map(val=><li key={val.id}>
                <div onClick={()=>{
                    console.log({id:data.id,category:data.name,sub:{id:val.id,name:val.name}})
                }} className='w-full h-[26px] border-b border-neutral-400 font-semibold text-sm text-neutral-900'>{val.name}</div>
            </li>)
        }
      </ul>
    </div>
  )
}

export default ScreenCategories
