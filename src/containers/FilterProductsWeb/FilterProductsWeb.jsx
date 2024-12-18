
'use client';
import { useState } from 'react';
import style from './FilterProductsWeb.module.scss'
import IconComponent from '@/components/IconComponent/IconComponent';
import Dropdown from '@/components/Dropdown/Dropdown';
import Checkbox from '@/components/Checkbox/Checkbox';
import { filterProduct } from '@/store/products/filter';
import ZustandHandler from '@/libs/handleZustand';
import Button from '@/components/Button/Button';
function FilterProductsWeb({menu}) {
    const [getExpanded, setExpanded] = useState(['Kendaraan','Garasi','Jarak','Lokasi','PenjualTerakhirAktif','Brand','Rating','Kategori',  'JenisPenjualan','Promo','JenisProduk','Pengiriman']);
    const getFilterProduct=filterProduct()
    const {handleInput} = new ZustandHandler(getFilterProduct)
    function handleExpanded(id) {
        if (getExpanded.some(val => val === id)) {
            let tmp = getExpanded.filter(val => val !== id);
            setExpanded(tmp);
        } else {
            setExpanded(prev => [...prev, id]);
        }
    }
    return (
        <div className="flex flex-col bg-neutral-50 border border-neutral-400 rounded-md p-4 gap-4 w-[264px]">
            <span className="text-xl text-[#1b1b1b] font-bold">Filter</span>
            <div className="flex flex-col gap-4 w-full divide-y divide-neutral-400">
                {/* garasi */}
                <div className="flex flex-col w-full gap-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Garasi')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Garasi</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Garasi')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Garasi') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Dropdown placeholder='Kendaraan Saya' classname={'!w-full'} id={'kendaraanID'}  />
                        <span onClick={()=>{}} className='font-medium text-xs text-primary-700 select-none cursor-pointer'>Reset filter garasi</span>
                    </div>
                </div>
                {/* kendaraan */}
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Kendaraan')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Kendaraan</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Kendaraan')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Kendaraan') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <div className="flex gap-2">
                            <Dropdown placeholder="Brand" />
                            <Dropdown placeholder="Tahun" />
                        </div>
                        <div className="flex gap-2">
                            <Dropdown placeholder="Model" />
                            <Dropdown placeholder="Tipe" />
                        </div>
                        <span onClick={()=>{}} className='font-medium text-xs text-primary-700 select-none cursor-pointer'>Reset filter garasi</span>
                    </div>
                </div>
                {/* Jarak */}
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Jarak')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Jarak</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Jarak')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Jarak') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Radius 5 km' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Radius 10 km' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Radius 20 km' />
                    </div>
                </div>
                {/* Lokasi */}
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Lokasi')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Lokasi</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Lokasi')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Lokasi') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kota Surabaya' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='DKI Jakarta' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kota Bandung' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kota Semarang' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kota Malang' />
                        <span onClick={()=>{}} className='font-medium text-xs text-primary-700 select-none cursor-pointer'>Lihat Selengkapnya</span>
                    </div>
                </div>
                {/* Pengiriman */}
                {menu==='produk'&&<div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Pengiriman')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Pengiriman</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Pengiriman')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Pengiriman') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Pengiriman oleh Penjual' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Instant' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Express' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Regular' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kargo' />
                    </div>
                </div>}
                {/* Penjual Terakhir Aktif */}
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('PenjualTerakhirAktif')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Penjual Terakhir Aktif</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'PenjualTerakhirAktif')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'PenjualTerakhirAktif') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Sedang Aktif' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Paling lama 1 jam yang lalu' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Paling lama 1 hari yang lalu' />
                    </div>
                </div>
                {/* Kategori */}
                {menu==='produk'&&<div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Kategori')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Kategori</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Kategori')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Kategori') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <div className='flex items-center gap-2 select-none cursor-pointer'>
                            <IconComponent src={'/icons/chevron-down.svg'} />
                            <span className='text-xs font-medium text-neutral-900'>Knalpot</span>
                        </div>
                    </div>
                </div>}
                {/* Brand */}
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Brand')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Brand</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Brand')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Brand') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Bridgestone' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Bosch' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Dunlop' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='MANN Filter' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Sakura Filter' />
                        <span onClick={()=>{}} className='font-medium text-xs text-primary-700 select-none cursor-pointer'>Lihat Selengkapnya</span>
                    </div>
                </div>
                {/* Jenis Penjualan */}
                {menu==='produk'&&<div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('JenisPenjualan')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Jenis Penjualan</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'JenisPenjualan')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'JenisPenjualan') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Pengiriman oleh Penjual' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Instant' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Express' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Regular' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kargo' />
                    </div>
                </div>}
                {/* Promo */}
                {menu==='produk'&&<div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Promo')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Promo</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Promo')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Promo') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Pengiriman oleh Penjual' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Instant' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Express' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Regular' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kargo' />
                    </div>
                </div>}
                {/* Jenis Produk */}
                {menu==='produk'&&<div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('JenisProduk')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Jenis Produk</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'JenisProduk')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'JenisProduk') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Pengiriman oleh Penjual' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Instant' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Express' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Regular' />
                        <Checkbox classname={'text-xs font-medium text-neutral-900'} label='Kargo' />
                    </div>
                </div>}

                {/* Rating */}
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div
                        className="flex items-center w-full justify-between cursor-pointer"
                        onClick={() => handleExpanded('Rating')}
                    >
                        <span className="text-xs text-neutral-900 font-semibold">Rating</span>
                        <IconComponent
                            src={`${
                                getExpanded.some(a => a === 'Rating')
                                    ? '/icons/chevron-up.svg'
                                    : '/icons/chevron-down.svg'
                            }`}
                        />
                    </div>
                    <div
                        style={{
                            maxHeight: getExpanded.some(a => a === 'Rating') ? '300px' : '0px',
                            overflow: 'hidden',
                        }}
                        className="transition-all duration-300 ease-in-out flex flex-col gap-4"
                    >
                        <div className='flex items-center'>
                            <Checkbox label='' />
                            <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                            <span className='text-xs font-medium text-neutral-900 ml-1'>5 Bintang</span>
                        </div>
                        <div className='flex items-center'>
                            <Checkbox label='' />
                            <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                            <span className='text-xs font-medium text-neutral-900 ml-1'>4 Bintang</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button Class='w-full max-w-none h-8' color='primary_secondary'>Reset</Button>
        </div>
    );
}

export default FilterProductsWeb;
  