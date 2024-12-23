
'use client';
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile';
import style from './ListAddressContainerMobile.module.scss'
import Button from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import ListAddressCardMobile from '@/components/ListAddressCardMobile/ListAddressCardMobile';
import DataNotFound from '@/components/DataNotFound/DataNotFound';
function ListAddressContainerMobile({address,onSave,onAddAddress}) {
    const [search,setSearch]=useState('')
    function handleSave() {
        onSave?.()
    }
    return (
        <div className={style.main+` flex flex-col pb-16 h-screen w-full bg-neutral-50 ${address?.length?'justify-center items-center':''}`}>
            {
                !address?
                <div className='flex flex-col gap-3 w-full h-full justify-center items-center'>
                    <DataNotFound type='data' title='Kamu belum punya alamat'/>
                    <span className='font-medium text-neutral-600 text-center text-xs'>Yuk, tambahkan alamatmu sekarang!</span>
                </div>
                :<>
                <div className='bg-neutral-50 w-full pb-4 containerMobile'>
                <Input icon={{left:'/icons/search.svg'}} value={search} changeEvent={a=>setSearch(a.target.value)} placeholder='Cari nama alamat yang disimpan' classname={'h-8'} />
                </div>
                    <ListAddressCardMobile />
                </>
            }
            {
                address?
                <ButtonBottomMobile textLeft={'Tambah Alamat'} textRight={'Simpan'} onClickLeft={onAddAddress} onClickRight={handleSave} />
                :<ButtonBottomMobile classname={'px-4 py-3'}><Button onClick={onAddAddress} Class='w-full max-w-none'>Tambah Alamat</Button></ButtonBottomMobile>
            }
        </div>
    );
}

export default ListAddressContainerMobile;
  