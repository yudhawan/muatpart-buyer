
'use client';
import DefaultInputMobile from '@/components/DefaultInputMobile/DefaultInputMobile';
import style from './AddAddressContainerMobile.module.scss'
import Checkbox from '@/components/Checkbox/Checkbox';
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile';
import Button from '@/components/Button/Button';
import { useHeader } from '@/common/ResponsiveContext';
function AddAddressContainerMobile() {
    const {setScreen} = useHeader()
    return (
        <div className={`${style.main} text-neutral-900 flex flex-col gap-6 containerMobile pb-[88px]`}>
            <DefaultInputMobile label={'Label Alamat*'} placeholder={'Masukkan label alamat maks. 30 karakter'} />  
            <div className='flex flex-col gap-4'>
                <DefaultInputMobile label={'Alamat*'} placeholder={'Masukkan alamat'} /> 
                <span className='medium-xs self-end'>Alamat tidak ditemukan? <span className='text-primary-700'>Isi alamat manual</span></span> 
            </div>
            <div className='flex gap-1 flex-col'>
                <span className='semi-sm'>Kecamatan/Kota/Provinsi</span>
                <span className='semi-sm'>-</span>
            </div>
            <div className='flex flex-col'>
                <span className='semi-sm mb-4'>Detail Alamat*</span>
                <DefaultInputMobile label={'Label*'} placeholder={'text'} />  
                <span className='medium-xs text-neutral-600 self-end mt-3'>0/20</span>
            </div>
            <DefaultInputMobile label={'Nama PIC*'} placeholder={'Masukkan nama PIC Lokasi'} />  
            <DefaultInputMobile label={'Nomor PIC*'} placeholder={'Contoh : 08xxxxxxxxxxx'} />  
            <Checkbox label='Jadikan alamat sebagai alamat utama' />
            <ButtonBottomMobile classname={'py-3 px-4'} >
                <Button Class='!w-full !max-w-full !h-10' onClick={()=>setScreen('list_address')}>Simpan</Button>
            </ButtonBottomMobile>
        </div>
    );
}

export default AddAddressContainerMobile;
  