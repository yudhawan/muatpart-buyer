
'use client';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import style from './DetailProductPage.module.scss'
import Dropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import ButtonPlusMinus from '@/components/ButtonPlusMinus/ButtonPlusMinus';
import { numberFormatMoney } from '@/libs/NumberFormat';
import IconComponent from '@/components/IconComponent/IconComponent';
import Bubble from '@/components/Bubble/Bubble';
import { useState } from 'react';
import ProductComponent from '@/components/ProductComponent/ProductComponent';
import ImageProductSlider from '@/components/ImageProductSlider/ImageProductSlider';
const tabmenu = [
    {
        id:'detail_product',
        name:'Detail Produk'
    },
    {
        id:'kompabilitas',
        name:'Kompabilitas'
    },
    {
        id:'deskrisi_product',
        name:'Deskripsi Produk'
    },
    {
        id:'ulasan_product',
        name:'Ulasan Produk'
    },
]
function DetailProductPageWeb({
    product,
    ID,
    Photo,
    Favorite,
    Name,
    Store,
    PriceBeforeDiscount,
    PriceAfterDiscount,
    Discount,
    Rating,
    ReviewCount,
    SalesType,
    Views,
    Quality,
    City,
    SoldCount,
    Bonus,
    CreatedAt,
    Variants,
    getExpanded,
    handleExpanded,
    showDescription,
    setShowDescription
}) {
    const [getMenuTab,setMenuTab]=useState('detail_product')
    const categories=[product?.Categories?.['Groupcategory'],product?.Categories?.['Category'],product?.Categories?.['Subcategory'],product?.Categories?.['Item']]
    return (
        <div className={style.main}>
            <div className='w-full max-w-[1280px] self-center'>
                {/* <BreadCrumb data={[{id:'home',name:'Home'},...categories?.map(val=>{
                    return {
                        id:val?.id,
                        name:val?.name
                    }
                })]} /> */}
                <div className='flex justify-between gap-4 mt-4 relative'>
                    <div className='flex flex-col gap-6 min-w-[898px] w-full'>
                        {/* kompabilitas */}
                        <CardDetailProduct>
                            <div className='flex gap-3'>
                                <Dropdown placeholder='Kendaraan Saya' options={[]} />
                                <Button Class='!h-8'>Cek Kompatibilitas</Button>
                            </div>
                            <div className='flex group items-center gap-1 cursor-pointer'>
                                <Image src={'/icons/reset.svg'} width={16} height={16} alt='reset' className='group-hover:rotate-45 rotate-0 transition-all ease-in-out delay-300' />
                                <span className='text-xs font-medium text-primary-700'>Reset Pengecekan</span>
                            </div>
                        </CardDetailProduct>
                        {/* detail */}
                        <CardDetailProduct className='bg-neutral-50 rounded-xl shadow-xl py-5 px-8 flex justify-between'>
                            {/* pictures */}
                            <div className='flex flex-col w-[350px]'>
                                {/* <ImageProductSlider/> */}
                            </div>
                            {/* Desc */}
                            <div className='w-full flex flex-col gap-4'>
                                {/* title desc */}
                                <div className='flex flex-col gap-4 border-b border-neutral-400 pb-4 text-neutral-900'>
                                    <h1 className='font-bold text-[18px]'>{Name}</h1>
                                    <span className='font-medium text-xs flex'>
                                        <span className='flex items-center gap-1'>Terjual <span className='text-neutral-700'>{SoldCount>99?'99+':SoldCount}</span> &#183; <Image src={"/icons/product-star.svg"} width={16} height={16} alt="Rating"/> {Rating} <span className='text-neutral-700'>(16 rating)</span></span>
                                    </span>
                                    {Discount ? (
                                        <>
                                        <div className="flex gap-1 items-center">
                                            <strike className="text-neutral-600 text-[10px] font-medium">
                                            {PriceBeforeDiscount}
                                            </strike>

                                            <p className={style.discount}>{Discount}</p>
                                        </div>
                                        <h1 className="text-neutral-900 text-sm font-bold">
                                            {PriceAfterDiscount}
                                        </h1>
                                        </>
                                    ) : (
                                        <h1 className="text-neutral-900 text-sm font-bold">
                                        {numberFormatMoney(PriceBeforeDiscount??0)}
                                        </h1>
                                    )}
                                </div>
                                {Bonus&&<div className='flex flex-col gap-2 border-b border-neutral-400 pb-4 text-neutral-900'>
                                    <span className='text-xs font-medium text-neutral-600'>Bonus</span>
                                    <div className='flex overflow-auto gap-[7px]'>
                                        {Bonus.map(val=><div className='bg-success-50 py-1 px-2 rounded-md text-success-400 font-semibold text-xs'>{val?.name}</div>)}
                                    </div>
                                </div>}
                                {Variants&&<div className='flex flex-col gap-4 border-b border-neutral-400 pb-4 text-neutral-900'>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-xs font-medium text-neutral-600 gap-1 flex'>Tipe <span className='text-neutral-900'>On Road</span></span>
                                        <div className='flex overflow-auto gap-[7px]'>
                                            <Bubble className='!h-[28px]'>sadasda as dsadsa</Bubble>
                                            <Bubble className='!h-[28px]'>sadasda as dsadsa</Bubble>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-xs font-medium text-neutral-600 gap-1 flex'>Ukuran : <span className='text-neutral-900'>Low 6x4</span></span>
                                        <div className='flex overflow-auto gap-[7px]'>
                                            <Bubble className='!h-[28px]'>sadasda as dsadsa</Bubble>
                                            <Bubble className='!h-[28px]'>sadasda as dsadsa</Bubble>
                                        </div>
                                    </div>
                                </div>}
                                <div className='flex flex-col gap-4 border-b border-neutral-400 pb-4 text-neutral-900'>
                                    <span className='flex gap-4'>
                                        <span className='w-[100px] text-xs text-neutral-600'>Kualitas</span>
                                        <span className='text-xs flex gap-1'><span>OEM</span> <span className='cursor-pointer'><Image src={'/icons/tips-gray.svg'} width={16} height={16} alt='tips' /></span></span>
                                    </span>
                                    <span className='flex gap-4'>
                                        <span className='w-[100px] text-xs text-neutral-600'>Kondisi</span>
                                        <span className='text-xs flex gap-1'>Baru</span>
                                    </span>
                                    <span className='flex gap-4'>
                                        <span className='w-[100px] text-xs text-neutral-600'>Brand</span>
                                        <span className='text-xs flex gap-1'>Gajah Tunggal</span>
                                    </span>
                                    <span className='flex gap-4'>
                                        <span className='w-[100px] text-xs text-neutral-600'>Etalase</span>
                                        <span className='text-xs flex gap-1'>Ban</span>
                                    </span>
                                    <span className='flex gap-4'>
                                        <span className='w-[100px] text-xs text-neutral-600'>Min Pesanan</span>
                                        <span className='text-xs flex gap-1'>1 pcs</span>
                                    </span>
                                </div>
                                {/* toko */}
                                <div className='flex gap-2 border-b border-neutral-400 pb-4 text-neutral-900'>
                                    <div className='w-11 h-11 rounded-full border border-neutral-500 overflow-hidden'>
                                        <Image src={'/img/chopper.png'} width={44} height={44} objectFit='cover' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold text-sm'>SparePro</p>
                                        <span className='font-medium text-xs gap-1 flex'>
                                            <span className='text-neutral-600'>Online</span>
                                            <span>2 Jam yang lalu</span>
                                        </span>
                                        <div className='flex gap-1 text-xs'>
                                            <Image src={"/icons/product-star.svg"} width={16} height={16} alt="Rating"/>
                                            <span>4,9</span>
                                            <span className='text-neutral-700'>(1.200 rating)</span>
                                        </div>
                                    </div>
                                </div>
                                {/* lokasi */}
                                <div className='flex flex-col gap-4 border-b border-neutral-400 pb-4 text-neutral-900 text-xs font-medium'>
                                    <div className='flex gap-2 items-center'>
                                        <Image src={'/icons/marker-outline.svg'} width={16} height={16} alt='marker' />
                                        <span className='text-neutral-600'>Lokasi  Penjual</span>
                                        <span>Kota Surabaya</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <Image src={'/icons/time.svg'} width={16} height={16} alt='marker' />
                                        <span className='text-neutral-600'>Jam Operasional</span>
                                        <span className='text-success-400'>Buka</span>
                                        &#183; 
                                        <span>08:00 - 12:00</span>
                                        <span className='cursor-pointer'>
                                            <IconComponent src={'/icons/chevron-down.svg'} />
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex gap-2 items-center'>
                                            <Image src={'/icons/truck-outline.svg'} width={16} height={16} alt='marker' />
                                            <span className='text-neutral-600'>Opsi Pengiriman</span>
                                        </div>
                                        <div className='flex gap-2 ml-6'>
                                            <span>JNE : mulai Rp12.000 </span>
                                            <span className='text-neutral-600'>(est. tiba 02 Feb 2024 - 05 Feb 2024)</span>
                                        </div>
                                        <div className='flex gap-2 ml-6'>
                                            <span>JNT : mulai Rp6.000</span>
                                            <span className='text-neutral-600'>(est. tiba 02 Feb 2024)</span>
                                        </div>
                                        <Button Class='ml-6 !bg-primary-50 !text-xs !font-semibold !rounded-md !py-1 !px-2 !w-[calc(100% - 24px)] !max-w-none !border-none' color='primary_secondary'>Wajib Asuransi Pengiriman</Button>
                                        <span className='text-primary-700 text-xs font-medium ml-6'>Lihat Opsi Pengiriman Lainnya</span>
                                    </div>
                                </div>
                                <div className='flex justify-end gap-5 text-sm text-neutral-900'>
                                    <span>Produk bermasalah?</span>
                                    <div className='flex items-center gap-[2px] select-none'>
                                        <IconComponent src={'/icons/flag-blue.svg'} />
                                        <span>Laporkan</span>
                                    </div>
                                </div>
                            </div>
                        </CardDetailProduct>
                        <CardDetailProduct classname={``}>
                            <div className='flex '>
                                {
                                    tabmenu.map((val,i)=><span key={val.id} onClick={()=>setMenuTab(val.id)} className={`cursor-pointer px-6 h-10 border-b-2 text-base font-semibold ${getMenuTab===val?.id?'border-primary-700 text-primary-700':'border-neutral-50 text-neutral-900'} flex gap-2 items-center`}>{val.name}</span>)
                                }
                            </div>
                        </CardDetailProduct>
                        {
                            !!(getMenuTab==='detail_product')&&<DetailProdukCard/>
                        }
                        {
                            !!(getMenuTab==='kompabilitas')&&<Kompatibilitas getExpanded={getExpanded} handleExpanded={handleExpanded} />
                        }
                        {
                            !!(getMenuTab==='deskrisi_product')&&<DeskripsiProduk setShowDescription={setShowDescription} showDescription={showDescription} />
                        }
                        {
                            !!(getMenuTab==='ulasan_product')&&<></>
                        }
                    </div>

                    <div className='flex flex-col min-w-[286px] py-6 px-5 gap-6 bg-neutral-50 rounded-xl shadow-xl text-neutral-900 h-fit sticky'>
                        <span className='font-semibold text-[18px] '>Atur jumlah</span>
                        <span className='font-medium text-xs '>On Road, Low 6x4</span>
                        <div className='flex gap-2 justify-between'>
                            <ButtonPlusMinus/>
                            <div className='text-xs flex items-center'>
                                <span className='text-neutral-600 font-normal'>Tersedia :</span>
                                <span className='text-neutral-900 font-bold'>1000 pcs</span>
                            </div>
                        </div>
                        <span className='flex justify-between items-center text-neutral-900'>
                            <span className='font-medium text-xs '>Sub Total</span>
                            <span className='font-bold text-base '>{numberFormatMoney(2000000)}</span>
                        </span>
                        <div className='flex flex-col w-full gap-3 pb-6 border-b border-neutral-400'>
                            <Button Class='!w-full !max-w-none' color='primary_secondary' iconLeft={'/img/cart-add-blue.png'}>Tambah ke Troli</Button>
                            <Button Class='!w-full !max-w-none'>Beli Sekarang</Button>
                        </div>
                        <span className='flex gap-[5px] font-medium text-xs text-neutral-900'>
                            <span>Ingin Pesan Multi-Varian/Alamat?</span>
                            <span className='text-primary-700 cursor-pointer select-none'>Klik di sini</span>
                        </span>
                        <div className='flex items-center divide-x divide-neutral-400 gap-3 self-center'>
                            <span className='flex gap-1 cursor-pointer items-center'>
                                <IconComponent src={'/icons/chat.svg'} />
                                <span className='text-sm font-semibold text-neutral-900 select-none'>Pesan</span>
                            </span>
                            <span className='flex gap-1 cursor-pointer items-center pl-3'>
                                <IconComponent src={'/icons/heart-outline.svg'} />
                                <span className='text-sm font-semibold text-neutral-900 select-none'>Favorit</span>
                            </span>
                            <span className='flex gap-1 cursor-pointer items-center pl-3'>
                                <IconComponent src={'/icons/share.svg'} />
                                <span className='text-sm font-semibold text-neutral-900 select-none'>Bagikan</span>
                            </span>
                        </div>
                    </div>
                </div>
                <RekomendasiSerupa/>
            </div>
        </div>
    );
}

export default DetailProductPageWeb;

const CardDetailProduct = ({children,classname})=>{
    return <div className={`flex items-center justify-between  bg-neutral-50 rounded-xl shadow-xl py-6 px-5 ${classname}`}>{children}</div>
}

const DetailProdukCard=()=>{
    return <CardDetailProduct classname={'gap-6 text-neutral-900 flex flex-col !items-start'}>
        <p className='font-semibold text-[18px] '>Detail Produk</p>
        <div className='grid grid-cols-2 gap-3'>
            <div className='w-full grid grid-cols-2 gap-4'>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Nomor OEM</span>
                <span className='font-medium text-xs'>49 303 53 121</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Nomor OE</span>
                <span className='font-medium text-xs'>1421022, LE 29 005 x</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Asal Produksi</span>
                <span className='font-medium text-xs'>Indonesia</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Tahun Produksi</span>
                <span className='font-medium text-xs'>08/2017</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Garansi Merchant</span>
                <span className='font-medium text-xs'>30 hari</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>SKU</span>
                <span className='font-medium text-xs'>4011558192501</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Material</span>
                <span className='font-medium text-xs'>Alumunium</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Tipe Produk</span>
                <span className='font-medium text-xs'>Assembly</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Penempatan Dikendaraan</span>
                <span className='font-medium text-xs'>Assembly</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Barang yang Disertakan</span>
                <span className='font-medium text-xs'>Seal</span>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 1</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 2</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 3</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 4</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 5</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 6</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 7</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 8</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 9</span>
                <span className='font-medium text-xs'>Contoh : A</span>
                <span className='text-neutral-600 font-medium text-xs w-[150px]'>Spesifikasi 10</span>
                <span className='font-medium text-xs'>Contoh : A</span>
            </div>
        </div>
    </CardDetailProduct>
}

const DeskripsiProduk=({desc,showDescription,setShowDescription})=>{
    return (
        <CardDetailProduct classname={'flex flex-col gap-6 text-xs font-medium text-neutral-900 items-start'}>
            <p className='text-[18px] self-start'>Deskripsi Produk</p>
            <div className='flex flex-col items-start gap-[14px] w-full'>
                <p className={`${show?'':'line-clamp-6'}`}>
                {desc}
                </p>
                <span className='flex gap-2 items-center text-primary-700 select-none cursor-pointer' onClick={()=>setShowDescription(!showDescription)}>
                    <span>Lihat {showDescription?'Lebih Sedikit':'Selengkapnya'}</span>
                    <IconComponent classname={'chevron-blue'} src={`${showDescription?'/icons/chevron-up.svg':'/icons/chevron-down.svg'}`} width={12} height={12} />
                </span>
            </div>
        </CardDetailProduct>
    )
}

const Kompatibilitas=({data,getExpanded,handleExpanded})=>{
    
    return <CardDetailProduct classname={'flex flex-col gap-6 w-full font-medium text-xs text-neutral-900'}>
        <span className='font-semibold text-[18px] text-'>Kompatibilitas</span>
        <div className='flex flex-col gap-4 w-full'>
            <div onClick={()=>handleExpanded('scania')} className='flex w-full justify-between h-6 items-center select-none cursor-pointer'>
                <span>Scania</span>
                <IconComponent src={'/icons/chevron-down.svg'} width={24} height={24} />
            </div>
            {!!(getExpanded.includes('scania'))&&
            <div className='rounded-[12px] border border-neutral-400 py-4 px-3'>
                <table className='border-collapse w-full'>
                    <thead>
                        <tr>
                            <th className='text-left pl-6 font-bold text-neutral-600 border-b border-neutral-400'>Model</th>
                            <th className='text-left pl-6 font-bold text-neutral-600 border-b border-neutral-400'>Tahun</th>
                            <th className='text-left pl-6 font-bold text-neutral-600 border-b border-neutral-400'>Tipe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                        </tr>
                        <tr>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                        </tr>
                        <tr>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                            <td className='py-4 px-6 border-b border-neutral-400'>asdsd</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    </CardDetailProduct>
}

const RekomendasiSerupa=({data})=>{
    return <div className='flex flex-col gap-[25px] w-full mt-6'>
        <span className='font-bold text-[18px] text-[#1b1b1b]'>Rekomendasi Serupa</span>
        <div className='flex w-full overflow-auto gap-3 scrollbar-none'>
            {
                Array(12).fill('').map((val,i)=>{
                    return <ProductComponent key={i}/>
                })
            }
        </div>
    </div>
}