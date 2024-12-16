import Checkbox from '@/components/Checkbox/Checkbox'
import IconComponent from '@/components/IconComponent/IconComponent'
import React, { memo, useState } from 'react'
function CategoryScreenProduct({actionFilter,categories}) {
  const constanta = ['groupCategory','categories','subCategories','items']
  const [getSelected,setSelected] = useState([])
  const [getExpand,setExpand] = useState([])
  function handleExpand() {
    
  }
  function handleCheck(val) {
    // if()
    
  }
  return (
    <div className='containerMobile pb-[80px] flex flex-col gap-3'>
        {
          categories.map((val,i)=>{
            return <div className='flex justify-between items-center'>
              <div className='flex gap-3'>
                <IconComponent src={'/icons/chevron-down.svg'} width={24} height={24} />
                <span>{val.name}</span>
                <Checkbox checked={getSelected.find(a=>a.id===val.id)} />
              </div>
            </div>
          })
        }
        {actionFilter}
    </div>
  )
}

export default CategoryScreenProduct

