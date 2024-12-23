
'use client'
import { viewport } from '@/store/viewport'
import React, { useState } from 'react'
import DaftarpesananResponsive from './DaftarpesananResponsive'
import DaftarpesananWeb from './DaftarpesananWeb'
import SWRHandler from '@/services/useSWRHook'
import response from './list-daftar-pesanan-buyer.json'
import responseDetail from './detail-daftar-pesanan-buyer.json'
const status_pesanan = [
  {
      id:'menungguPembayaran',
      status:'Menunggu Pembayaran',
      bg:'bg-warning-100',
      text:'text-warning-900',
      action_button:'Detail Pesanan'
  },
  {
      id:'menungguRespon',
      status:'Menunggu Direspon',
      bg:'bg-warning-100',
      text:'text-warning-900',
      action_button:'Detail Pesanan'
  },
  {
      id:'dikemas',
      status:'Dikemas',
      bg:'bg-primary-50',
      text:'text-primary-700',
      action_button:'Detail Pesanan'
  },
  {
      id:'dikirim',
      status:'Dikirim',
      bg:'bg-primary-50',
      text:'text-primary-700',
      action_button:'Lacak Pesanan'
  },
  {
      id:'tibaDitujuan',
      status:'Tiba di Tujuan',
      bg:'bg-success-50',
      text:'text-success-400',
      action_button:'Lacak Pesanan'
  },
  {
      id:'dibatalkanPenjual',
      status:'Dibatalkan Penjual',
      bg:'bg-error-50',
      text:'text-error-400',
      action_button:'Detail Pesanan'
  },
  {
      id:'dibatalkanPembeli',
      status:'Dibatalkan Pembeli',
      bg:'bg-error-50',
      text:'text-error-400',
      action_button:'Detail Pesanan'
  },
  {
      id:'dibatalkanSistem',
      status:'Dibatalkan Sistem',
      bg:'bg-error-50',
      text:'text-error-400',
      action_button:'Detail Pesanan'
  },
  {
      id:'dikomplain',
      status:'Dikomplain',
      bg:'bg-error-400',
      text:'text-error-50',
      action_button:'Detail Komplain'
  },
  {
      id:'pengembalianSelesai',
      status:'Pengembalian Dana Selesai',
      bg:'bg-success-400',
      text:'text-success-50',
      action_button:'Detail Pesanan'
  },
  {
      id:'selesai',
      status:'Selesai',
      bg:'bg-success-400',
      text:'text-success-50',
      action_button:{
          left:'Berikan Ulasan',
          right:'Beli Lagi'
      }
  },
  {
      id:'komplainSelesai',
      status:'Komplain Selesai',
      bg:'bg-success-400',
      text:'text-success-50',
      action_button:{
          left:'Berikan Ulasan',
          right:'Beli Lagi'
      }
  },
]
function Daftarpesanan() {
  const [state,setState]=useState()
  const {useSWRHook,useSWRMutateHook}=new SWRHandler()
  const {isMobile} = viewport()
  if(typeof isMobile!=='boolean') return <></> //buat skeleton
  if(isMobile) return <DaftarpesananResponsive data={response?.Data?.orders} detailPesanan={responseDetail?.Data} status_pesanan={status_pesanan}/>
  return <DaftarpesananWeb/>
}

export default Daftarpesanan
  