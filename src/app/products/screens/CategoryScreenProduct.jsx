import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import Checkbox from '@/components/Checkbox/Checkbox'
import IconComponent from '@/components/IconComponent/IconComponent'
import React, { memo, useState } from 'react'
function CategoryScreenProduct({categories,getFilterProduct,handleInput,search,setSearch}) {
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
        <ButtonBottomMobile textLeft={'Reset'} textRight={'Terapkan'} onClickLeft={()=>setScreen('filter')} onClickRight={()=>{}} />
    </div>
  )
}

export default CategoryScreenProduct

