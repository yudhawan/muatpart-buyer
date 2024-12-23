import Button from '@/components/Button/Button'
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import DataNotFound from '@/components/DataNotFound/DataNotFound'
import RadioButton from '@/components/Radio/RadioButton'
import React from 'react'

function KompatibilitasSearchScreen({data}) {
  return (
    <div className='containerMobile h-screen flex flex-col gap-3'>
      {
        data.length?<><div className='kompatibilitasCard pb-3 border-b border-neutral-400'>
          <RadioButton label={"example"} />
        </div>
        <div className='kompatibilitasCard pb-3 border-b border-neutral-400'>
          <RadioButton label={"example"} />
        </div></>
        :<div className='flex flex-col gap-3'>
          <DataNotFound type='data' title='Belum ada data'/>
          <span className='font-medium text-neutral-600 text-center text-xs'>Yuk, tambah data kendaraan kamu untuk memudahkan pencarian</span>
          <Button Class='!h-7 !w-fit font-semibold text-xs self-center'>Tambah Data Kendaraan</Button>
        </div>
      }
      {!!(data?.length)&&<ButtonBottomMobile classname={'h-[64px] px-4 flex items-center'}>
        <Button Class='!w-full !max-w-none'>Cek Kompatibilitas</Button>
      </ButtonBottomMobile>}
    </div>
  )
}

export default KompatibilitasSearchScreen
