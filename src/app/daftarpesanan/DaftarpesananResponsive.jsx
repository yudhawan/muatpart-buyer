
import { useHeader } from '@/common/ResponsiveContext'
import React, { useEffect, useState } from 'react'
import style from './Daftarpesanan.module.scss'
import IconComponent from '@/components/IconComponent/IconComponent'
import { useRouter } from 'next/navigation'
import TabMenu from '@/components/Menu/TabMenu'
import CardDaftarPesananMobile from '@/components/CardDaftarPesananMobile/CardDaftarPesananMobile'
import DataNotFound from '@/components/DataNotFound/DataNotFound'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import ModalComponent from '@/components/Modals/ModalComponent'
import ModalPeriode from './screens/ModalPeriode'
import DetailPesananMobile from '@/containers/DetailPesananMobile/DetailPesananMobile'

const menus=[
  {
    name:'Semua',
    notif:3
  },
  {
    name:'Belum Bayar',
    notif:5
  },
  {
    name:'Diproses',
    notif:1
  },
]
function DaftarpesananResponsive({data,status_pesanan,detailPesanan}) {
  const router=useRouter()
  const [getMenu,setMenu]=useState('Semua')
  const [showPeriode,setShowPeriode]=useState(false)
  const [getStatus,setStatus]=useState(null)
  const {setAppBar, screen, setSearch,setScreen}=useHeader()
  function handleClickFromCard(params) {
    if(params?.button==='right'){
      // handle right
      setStatus(params)
      return
    }
    if(params?.button==='left'){
      // handle left
      setStatus(params)
      return
    }
    if(params?.action_button==='Lacak Pesanan'){
      setScreen('lacak_pesanan')
      setStatus(params)
      return
    }
    if(params?.action_button==='Detail Pesanan'){
      setScreen('detail_pesanan')
      setStatus(params)
      return
    }
  }
  useEffect(()=>{
    if(screen) setAppBar({renderActionButton:null})
    if(!screen){
      setSearch({
        placeholder:'Cari Pesanan'
      })
      setAppBar({
        appBarType:'header_search',
        renderActionButton:<div className='gap-2 flex items-center'>
          <span className='flex flex-col gap-[2px] z-30 select-none cursor-pointer' onClick={()=>router.push('/troli')}>
            <IconComponent classname={'cart-outline'} src={'/icons/cart.svg'} width={24} height={24}/>
            <span className='font-semibold text-neutral-50 text-[10px] text-center'>Troli</span>
          </span>
          <span className='flex flex-col gap-[2px] items-center z-30 select-none cursor-pointer' onClick={()=>setShowPeriode(true)}>
            <IconComponent classname={'cart-outline'} src={'/icons/calendar.svg'} width={26} height={26}/>
            <span className='font-semibold text-neutral-50 text-[10px] text-center'>Periode</span>
          </span>
        </div>
      })
    }
    if(screen==='detail_pesanan'){
      setAppBar({
        title:'Detail Pesanan',
        appBarType:'header_title',
        onBack:()=>setScreen('')
      })
    }
  },[screen])
  
  if(screen==='detail_pesanan') return <DetailPesananMobile statusPesanan={getStatus} detailPesanan={detailPesanan} />
  // main screen
  return (
    <div className={`${style.main} flex flex-col gap-2 bg-neutral-200`}>
      <ModalComponent full type='BottomSheet' title='Pilih Periode' isOpen={showPeriode} setClose={()=>setShowPeriode(false)}>
        <ModalPeriode onSelected={(a)=>console.log(a)} onClose={()=>setShowPeriode(false)}/>
      </ModalComponent>
      <div className='flex pt-7 gap-1 overflow-x-scroll scrollbar-none bg-neutral-50'>
      {
        menus.map(val=>{
          return(
            <div className='flex gap-3'>
              <span className={`flex bold-sm pb-3 px-4 gap-1 select-none whitespace-nowrap  ${getMenu===val.name?'border-b-muat-parts-non-800 text-muat-parts-non-800':'border-b-transparent text-neutral-700'} border-b-2 `} onClick={()=>setMenu(val.name)}>
                <span>{val.name}</span>
                {val.notif&&<span>({val.notif})</span>}
              </span>
              <span className='w-[1px] h-[80%] bg-neutral-400'></span>
            </div>
          )
        })
      }
      </div>
      {
        (getMenu==='Semua'&&data?.length)&&
        data?.map((val,i)=><CardDaftarPesananMobile key={i} {...val} status_pesanan={status_pesanan} onClick={handleClickFromCard} />)
      }
      {
        !data&&<div className={style.notFoundContainer+' w-full h-full flex flex-col gap-3 px-4 justify-center items-center'}>
          <DataNotFound width={94} height={76} type='data' title='Belum ada transaksi' />
          <span className='medium-xs text-neutral-600 text-center'>Yuk, mulai belanja dan penuhi berbagai
          kebutuhanmu di muatparts</span>
          <Link href={'/'} className='w-full bg-primary-700 h-7 semi-xs text-neutral-50 items-center flex justify-center rounded-[20px]'>Mulai Belanja</Link>
        </div>
      }
    </div>
  )
}

export default DaftarpesananResponsive
  