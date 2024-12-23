
'use client';
import DefaultInputMobile from '@/components/DefaultInputMobile/DefaultInputMobile';
import style from './AddAddressContainerMobile.module.scss'
function AddAddressContainerMobile() {
    return (
        <div className={`${style.main} text-neutral-900 flex flex-col gap-6 containerMobile`}>
            <DefaultInputMobile label={'Label Alamat*'} />  
            <div className='flex flex-col gap-4'>
                <DefaultInputMobile label={'Alamat*'} /> 
                <span className='medium-xs self-end'>Alamat tidak ditemukan? <span className='text-primary-700'>Isi alamat manual</span></span> 
            </div>
            <div className='flex flex-col gap-4'>
                <DefaultInputMobile label={'Alamat*'} />  
            </div>
        </div>
    );
}

export default AddAddressContainerMobile;
  