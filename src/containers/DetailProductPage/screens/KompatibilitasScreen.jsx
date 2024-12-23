import IconComponent from '@/components/IconComponent/IconComponent'
import React from 'react'
import './style.scss'
function KompatibilitasScreen({data,getExpanded,handleExpanded}) {
  return (
    <div className='w-full bg-neutral-200 flex flex-col gap-2 pb-4'>
        <div className='flex flex-col gap-4 w-full bg-neutral-50 containerMobile'>
            <div onClick={()=>handleExpanded('scania')} className='flex w-full justify-between h-6 items-center select-none cursor-pointer'>
                <span className='font-semibold text-sm text-[#1b1b1b]'>Scania</span>
                <IconComponent src={`${getExpanded.includes('scania')?'/icons/chevron-down.svg':'/icons/chevron-up.svg'}`} width={24} height={24} />
            </div>
            {!!(getExpanded.includes('scania'))&&<><div className='grid grid-cols-2 pb-4 border-b border-neutral-400 kompatibilitasCard'>
                <span className='text-neutral-600 font-medium text-sm'>Model</span>
                <span className='text-neutral-900 font-medium text-sm'>Model 1</span>
                <span className='text-neutral-600 font-medium text-sm'>Tahun Produksi</span>
                <span className='text-neutral-900 font-medium text-sm'>Tipe 2</span>
                <span className='text-neutral-600 font-medium text-sm'>Tipe</span>
                <span className='text-neutral-900 font-medium text-sm'>Tipe 1</span>
                <span className='text-neutral-600 font-medium text-sm'>Nomor Mesin</span>
                <span className='text-neutral-900 font-medium text-sm'>123</span>
            </div>
            <div className='grid grid-cols-2 pb-4 border-b border-neutral-400 kompatibilitasCard'>
                <span className='text-neutral-600 font-medium text-sm'>Model</span>
                <span className='text-neutral-900 font-medium text-sm'>Model 1</span>
                <span className='text-neutral-600 font-medium text-sm'>Tahun Produksi</span>
                <span className='text-neutral-900 font-medium text-sm'>Tipe 2</span>
                <span className='text-neutral-600 font-medium text-sm'>Tipe</span>
                <span className='text-neutral-900 font-medium text-sm'>Tipe 1</span>
                <span className='text-neutral-600 font-medium text-sm'>Nomor Mesin</span>
                <span className='text-neutral-900 font-medium text-sm'>123</span>
            </div></>}
        </div>
    </div>
  )
}

export default KompatibilitasScreen
