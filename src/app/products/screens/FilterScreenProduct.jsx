import { useHeader } from '@/common/ResponsiveContext'
import Bubble from '@/components/Bubble/Bubble'
import Button from '@/components/Button/Button'
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile'
import IconComponent from '@/components/IconComponent/IconComponent'
import Input from '@/components/Input/Input'
import ZustandHandler from '@/libs/handleInputGlobalState'
import { filterProduct } from '@/store/products/filter'
import React from 'react'

function FilterScreenProduct({isToko,onClickLeft,onClickRight,textLeft,textRight}) {
    const {setAppBar,setScreen,screen,setSearch,search}=useHeader()
    const getFilterProduct = filterProduct()
    const {handleInput} = new ZustandHandler(getFilterProduct)
  return (
    <div className='flex flex-col w-full gap-5 containerMobile bg-neutral-50 pb-[80px]'>
        {/* garasi */}
        {!isToko&&<><EachComponent label={'Garasi saya'} labelActionButton={'Reset filter garasi'} actionButton={()=>{}}>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Jenis Kendaraan saya</Button>
        </EachComponent>
        {/* jenis kendaraan */}
        <EachComponent label={'Jenis Kendaraan'} labelActionButton={'Reset filter Jenis Kendaraan'} actionButton={()=>{}}>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Brand</Button>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Tahun</Button>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Model</Button>
            <Button iconRight={'/icons/chevron-down.svg'} Class={'!bg-neutral-50 !text-neutral-600 border border-neutral-600 rounded-md !h-8 !font-semibold !max-w-full !w-full !justify-between !px-3'}>Tipe</Button>
        </EachComponent>
        {/* pengiriman */}
        <EachComponent label={'Harga'}>
            <Input type='number' changeEvent={(e)=>handleInput('price',{...getFilterProduct?.price,minimum:e.target.value})} placeholder='Harga minimum' icon={{left:<span className='font-semibold text-sm text-neutral-900'>Rp</span>}} />
            <Input type='number' changeEvent={(e)=>handleInput('price',{...getFilterProduct?.price,maximum:e.target.value})} placeholder='Harga maximum' icon={{left:<span className='font-semibold text-sm text-neutral-900'>Rp</span>}} />
        </EachComponent></>}
        {/* jarak */}
        <EachComponent label={'Jarak'}>
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('distance','5km')}>
                    <Bubble classname={`border ${getFilterProduct?.['distance']==='5km'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Radius 5 km</Bubble>
                </span>
                <span onClick={()=>handleInput('distance','10km')}>
                    <Bubble classname={`border ${getFilterProduct?.['distance']==='10km'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Radius 10 km</Bubble>
                </span>
                <span onClick={()=>handleInput('distance','20km')}>
                    <Bubble classname={`border ${getFilterProduct?.['distance']==='20km'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Radius 20 km</Bubble>
                </span>
            </div>
        </EachComponent>
        {/* lokasi */}
        <EachComponent label={'Lokasi'} labelActionButton={'Lihat Semua'} 
        actionButton={()=>{
            setScreen('location')
            setSearch({
                placeholder:'Cari Lokasi'
            })
        }}>
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('location','Surabaya')}>
                    <Bubble classname={`border ${getFilterProduct?.['location']?.some(val=>val==='Surabaya')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Kota Surabaya</Bubble>
                </span>
                <span onClick={()=>handleInput('location','Jakarta')}>
                    <Bubble classname={`border ${getFilterProduct?.['location']?.some(val=>val==='Jakarta')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >DKI Jakarta</Bubble>
                </span>
                <span onClick={()=>handleInput('location','Bandung')}>
                    <Bubble classname={`border ${getFilterProduct?.['location']?.some(val=>val==='Bandung')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Kota Bandung</Bubble>
                </span>
                <span onClick={()=>handleInput('location','Semarang')}>
                    <Bubble classname={`border ${getFilterProduct?.['location']?.some(val=>val==='Semarang')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Kota Semarang</Bubble>
                </span>
                <span onClick={()=>handleInput('location','Malang')}>
                    <Bubble classname={`border ${getFilterProduct?.['location']?.some(val=>val==='Malang')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Kota Malang</Bubble>
                </span>
            </div>
        </EachComponent>
        {/* pengiriman */}
        {!isToko&&<EachComponent label={'Pengiriman'}>
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('shipping', 'byseller')}>
                    <Bubble classname={`border ${getFilterProduct?.['shipping']?.some(val=>val==='byseller')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Pengiriman oleh Penjual</Bubble>
                </span>
                <span onClick={()=>handleInput('shipping', 'instant')}>
                    <Bubble classname={`border ${getFilterProduct?.['shipping']?.some(val=>val==='instant')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Instant</Bubble>
                </span>
                <span onClick={()=>handleInput('shipping', 'express')}>
                    <Bubble classname={`border ${getFilterProduct?.['shipping']?.some(val=>val==='express')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Express</Bubble>
                </span>
                <span onClick={()=>handleInput('shipping', 'regular')}>
                    <Bubble classname={`border ${getFilterProduct?.['shipping']?.some(val=>val==='regular')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Regular</Bubble>
                </span>
                <span onClick={()=>handleInput('shipping', 'kargo')}>
                    <Bubble classname={`border ${getFilterProduct?.['shipping']?.some(val=>val==='kargo')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Kargo</Bubble>
                </span>
            </div>
        </EachComponent>}
        {/* Penjual Terakhir Aktif */}
        <EachComponent label={'Penjual Terakhir Aktif'}>
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('lastActiveSeller', 'active')}>
                    <Bubble classname={`border ${getFilterProduct?.['lastActiveSeller']==='active'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Sedang Aktif</Bubble>
                </span>
                <span onClick={()=>handleInput('lastActiveSeller', 'hour')}>
                    <Bubble classname={`border ${getFilterProduct?.['lastActiveSeller']==='hour'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Paling lama 1 jam yang lalu</Bubble>
                </span>
                <span onClick={()=>handleInput('lastActiveSeller', 'day')}>
                    <Bubble classname={`border ${getFilterProduct?.['lastActiveSeller']==='day'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Paling lama 1 hari yang lalu</Bubble>
                </span>
                
            </div>
        </EachComponent>
        {/* Kategori */}
        {!isToko&&<EachComponent label={'Kategori'} labelActionButton={'Lihat Semua'} actionButton={()=>{
            setScreen('category')
            setSearch({
                placeholder:'Cari Kategori'
            })
        }}>
            <div className='flex flex-wrap gap-2'>
                <Bubble classname={`border ${getFilterProduct?.['brand']?.some(val=>val==='s')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Axle</Bubble>
            </div>
        </EachComponent>}
        {/* Brand */}
        <EachComponent label={'Brand'} labelActionButton={'Lihat Semua'} actionButton={()=>{
            setScreen('brand')
            setSearch({
                placeholder:'Cari Brand'
            })
        }}>
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('brand', 'Bridgestone')}>
                    <Bubble classname={`border ${getFilterProduct?.['brand']?.some(val=>val==='Bridgestone')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Bridgestone</Bubble>
                </span>
                <span onClick={()=>handleInput('brand', 'Dunlop')}>
                    <Bubble classname={`border ${getFilterProduct?.['brand']?.some(val=>val==='Dunlop')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Dunlop</Bubble>
                </span>
                
            </div>
        </EachComponent>
        {/* Jenis Penjualan */}
        {!isToko&&<><EachComponent label={'Jenis Penjualan'} >
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('productType', 'eceran')}>
                    <Bubble classname={`border ${getFilterProduct?.['saleType']==='eceran'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Satuan/Ecer</Bubble>
                </span>
                <span onClick={()=>handleInput('productType', 'grosir')}>
                    <Bubble classname={`border ${getFilterProduct?.['saleType']==='grosir'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Grosir</Bubble>
                </span>
            </div>
        </EachComponent>
        {/* promo */}
        <EachComponent label={'Promo'} >
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('productType', 'discount')}>
                    <Bubble classname={`border ${getFilterProduct?.['promo']?.some(val=>val==='diskon')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Diskon</Bubble>
                </span>
                <span onClick={()=>handleInput('productType', 'free_delivery')}>
                    <Bubble classname={`border ${getFilterProduct?.['promo']?.some(val=>val==='promo')?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Gratis Biaya Pengiriman</Bubble>
                </span>
            </div>
        </EachComponent>
        {/* jeni produk */}
        <EachComponent label={'Jenis Produk'} >
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('productType', 'new')}>
                    <Bubble classname={`border ${getFilterProduct?.['productType']==='baru'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Produk Baru</Bubble>
                </span>
                <span onClick={()=>handleInput('productType', 'second')}>
                    <Bubble classname={`border ${getFilterProduct?.['productType']==='bekas'?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium`} >Produk Bekas</Bubble>
                </span>
            </div>
        </EachComponent></>}
        {/* rating produk */}
        <EachComponent label={'Rating Produk'} >
            <div className='flex flex-wrap gap-2'>
                <span onClick={()=>handleInput('productRating', 5)}>
                    <Bubble  classname={`border ${getFilterProduct?.['brand']?.some(val=>val===5)?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium flex items-center gap-2`} >
                        <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                        <span>5 Bintang</span>
                    </Bubble>
                </span>
                <span onClick={()=>handleInput('productRating', 4)}>
                    <Bubble  classname={`border ${getFilterProduct?.['brand']?.some(val=>val===4)?'!border-primary-700 !text-primary-700 !bg-primary-50': '!border-neutral-200 !bg-neutral-200'} !text-sm !text-neutral-900 !font-medium flex items-center gap-2`} >
                        <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                        <span>4 Bintang</span>
                    </Bubble>
                </span>
            </div>
        </EachComponent>    
        
        <ButtonBottomMobile onClickLeft={onClickLeft} onClickRight={onClickRight} textLeft={textLeft?textLeft:'Batal'} textRight={textRight?textRight:'Simpan'} />
      
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