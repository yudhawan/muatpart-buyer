import { useHeader } from '@/common/ResponsiveContext'
import Bubble from '@/components/Bubble/Bubble'
import Button from '@/components/Button/Button'
import IconComponent from '@/components/IconComponent/IconComponent'
import Input from '@/components/Input/Input'
import React from 'react'

function FilterScreenProduct() {
    const {setAppBar,setScreen,screen,setSearch,search}=useHeader()
  return (
    <div className='flex flex-col w-full gap-5 containerMobile bg-neutral-50 pb-[80px]'>
        <EachComponent label={'Garasi saya'} labelActionButton={'Reset filter garasi'} actionButton={()=>{}}>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Jenis Kendaraan saya</Button>
        </EachComponent>
        <EachComponent label={'Jenis Kendaraan'} labelActionButton={'Reset filter Jenis Kendaraan'} actionButton={()=>{}}>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Brand</Button>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Tahun</Button>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Model</Button>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Tipe</Button>
        </EachComponent>
        <EachComponent label={'Pengiriman'}>
            <Input placeholder='Harga minimum' icon={{left:<span className='font-semibold text-sm text-neutral-900'>Rp</span>}} />
            <Input placeholder='Harga maximum' icon={{left:<span className='font-semibold text-sm text-neutral-900'>Rp</span>}} />
        </EachComponent>
        <EachComponent label={'Jarak'}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Radius 5 km</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Radius 10 km</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Radius 20 km</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Lokasi'} labelActionButton={'Lihat Semua'} 
        actionButton={()=>{
            setScreen('lokasi')
            setAppBar({
                appBarType:'searchModalSecondary',
                onBack:()=> setScreen('filter'),
            })
            setSearch({
                placeholder:'Cari Lokasi'
            })
        }}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Kota Surabaya</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >DKI Jakarta</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Kota Bandung</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Kota Semarang</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Kota Malang</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Pengiriman'}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Pengiriman oleh Penjual</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Instant</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Express</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Regular</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Kargo</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Penjual Terakhir Aktif'}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Sedang Aktif</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Paling lama 1 jam yang lalu</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Paling lama 1 hari yang lalu</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Kategori'}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Axle</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Brand'} labelActionButton={'Lihat Semua'} actionButton={()=>{}}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Bridgestone</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Bosch</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Dunlop</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Jenis Penjualan'} >
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Satuan/Ecer</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Grosir</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Promo'} >
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Diskon</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Gratis Biaya Pengiriman</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Jenis Produk'} >
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Produk Baru</Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium" >Produk Bekas</Bubble>
            </div>
        </EachComponent>
        <EachComponent label={'Rating Produk'} >
            <div className='flex flex-wrap gap-2'>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium flex items-center gap-2" >
                    <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                    <span>5 Bintang</span>
                </Bubble>
                <Bubble classname="border !border-neutral-200 !bg-neutral-200 !text-sm !text-neutral-900 !font-medium flex items-center gap-2" >
                    <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                    <span>4 Bintang</span>
                </Bubble>
            </div>
        </EachComponent>    
        
        <div className='bg-neutral-50 h-[64px] w-full shadow-2xl flex gap-2 fixed z-50 bottom-0 left-0'>
            <div className='w-full gap-2 py-3 px-4 flex shadow-2xl'>
                <Button Class='!w-full !max-w-full' color='primary_secondary' >Reset</Button>
                <Button Class='!w-full !max-w-full' >Simpan</Button>
            </div>
        </div>
      
    </div>
  )
}

export default FilterScreenProduct

export function EachComponent({children,label,actionButton,labelActionButton,classname}) {
    return (
        <div className={`flex flex-col w-full gap-4 pb-5 border-b border-neutral-400 ${classname}`}>
            <div className='flex w-full justify-between'>
                <span className='text-sm font-semibold text-neutral-900'>{label}</span>
                {(actionButton&&typeof actionButton==='function')&&<span onClick={actionButton} className='text-sm font-semibold text-primary-700'>{labelActionButton}</span>}
            </div>
            {children}
        </div>
    )
}