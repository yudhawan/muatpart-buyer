import Link from 'next/link'
import React from 'react'

function ScreenCategories({data}) {
  console.log(data)
  return (
    <div className='w-full h-full flex flex-col bg-neutral-100 containerMobile'>
      <ul className='list-none flex flex-col gap-4'>
        {
            data?.children?.map(val=><li key={val.id}>
                <Link href={'/categories/'+data?.id+'/'+val.id} className='w-full h-[26px] border-b border-neutral-400 font-semibold text-sm text-neutral-900 pb-4 flex'>{val.value}</Link>
            </li>)
        }
      </ul>
    </div>
  )
}

export default ScreenCategories
