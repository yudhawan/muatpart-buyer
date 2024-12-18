
'use client';
import Link from 'next/link';
import style from './OtherNavbarMobile.module.scss'
import IconComponent from '@/components/IconComponent/IconComponent';
const menus=[
    {
        icon:'/icons/heart-outline.svg',
        name:'Favorit',
        url:'/'
    },
    {
        icon:'/icons/voucher-outline.svg',
        name:'Voucher',
        url:'/'
    },
    {
        icon:'/icons/list-outline.svg',
        name:'Daftar Pesanan',
        url:'/'
    },
    {
        icon:'/icons/ulasan-outline.svg',
        name:'Ulasan',
        url:'/'
    },
    {
        icon:'/icons/warning-outline.svg',
        name:'Pengajuan Komplain',
        url:'/'
    },
    {
        icon:'/icons/asuransi-produk-outline.svg',
        name:'Asuransi Produk',
        url:'/'
    },
    {
        icon:'/icons/pusat-bantuan-outline.svg',
        name:'Pusat Bantuan',
        url:'/'
    },
]
function OtherNavbarMobile() {
    return (
        <ul className={`${style.main} containerMobile list-none !pt-1 bg-neutral-50 `}>
            {
                menus.map(val=><li key={val.name}>
                    <Link href={val.url} className={`${style.link} flex gap-2 border-b border-neutral-400`}>
                        <IconComponent width={20} height={20} src={val.icon} />
                        <span className='font-semibold text-xs text-neutral-900'>{val.name}</span>
                    </Link>
                </li>)
            }
        </ul>
    );
}

export default OtherNavbarMobile;
  