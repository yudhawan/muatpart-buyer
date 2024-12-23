import { useHeader } from '@/common/ResponsiveContext'
import Button from '@/components/Button/Button'
import ButtonAddAddressProduct from '@/components/ButtonAddAddressProduct/ButtonAddAddressProduct'
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import DataNotFound from '@/components/DataNotFound/DataNotFound'
import Input from '@/components/Input/Input'
import ListAddressContainerMobile from '@/containers/ListAddressContainerMobile/ListAddressContainerMobile'
import React, { useEffect, useState } from 'react'

function MultipleAlamatScreen({data}) {
  const {setScreen,screen,setAppBar}=useHeader()
  const [search,setSearch]=useState('')
  
  return (
    <div className='flex flex-col gap-2 bg-neutral-200 h-screen containerMobile'>
      <ButtonAddAddressProduct onAddAddress={()=>setScreen('list_address')} />
    </div>
  )
}

export default MultipleAlamatScreen
