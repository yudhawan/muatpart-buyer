
'use client';
import IconComponent from '../IconComponent/IconComponent';
import style from './ButtonAddAddressProduct.module.scss'
function ButtonAddAddressProduct({number,onAddAddress,address}) {
    return (
        <div className={`py-4 px-3 rounded-md border border-neutral-400 flex justify-between text-neutral-900`}>
            <span className=' text-neutral-50 font-bold text-[10px] rounded-full p-[10px]'>{number}</span>
            {address?
            <div className='flex w-full justify-between'>
                <span className='semi-sm'>{address}</span>
                <div className='flex gap-2'>
                    <span className='cursor-pointer'>
                        <IconComponent src={'/icons/edit-gray.svg'} width={20} height={20} />
                    </span>
                    <span className='cursor-pointer'>
                        <IconComponent src={'/icons/trash-az.svg'} width={20} height={20} />
                    </span>
                </div>
            </div>
            :<span className='text-primary-700 medium-sm cursor-pointer' onClick={onAddAddress}>Tambah Alamat</span>}
        </div>
    );
}

export default ButtonAddAddressProduct;
  