
'use client';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import style from './DetailProductPage.module.scss'
import Dropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Button/Button';
import Image from 'next/image';
function DetailProductPageWeb({product}) {
    const categories=[product?.Categories?.['Groupcategory'],product?.Categories?.['Category'],product?.Categories?.['Subcategory'],product?.Categories?.['Item']]
    return (
        <div className={style.main}>
            <div className='containerMobile !pt-0'>
                <BreadCrumb data={[{id:'home',name:'Home'},...categories?.map(val=>{
                    return {
                        id:val.id,
                        name:val.name
                    }
                })]} />
                <div className='flex justify-between gap-4 mt-4'>
                    <div className='flex flex-col gap-6 max-w-[898px] w-full '>
                        {/* kompabilitas */}
                        <div className='flex items-center justify-between  bg-neutral-50 rounded-xl shadow-2xl py-6 px-5'>
                            <div className='flex gap-3'>
                                <Dropdown placeholder='Kendaraan Saya' options={[]} />
                                <Button Class='!h-8'>Cek Kompatibilitas</Button>
                            </div>
                            <div className='flex group items-center gap-1 cursor-pointer'>
                                <Image src={'/icons/reset.svg'} width={16} height={16} alt='reset' className='group-hover:rotate-45 rotate-0 transition-all ease-in-out delay-300' />
                                <span className='text-xs font-medium text-primary-700'>Reset Pengecekan</span>
                            </div>
                        </div>
                        {/* detail */}
                        <div className='bg-neutral-50 rounded-xl shadow-2xl py-2 px-8 flex justify-between'>
                            {/* pictures */}
                            <div className='flex flex-col'>

                            </div>

                        </div>
                    </div>
                    <div className='w-full py-6 px-5 gap-6'>
                        <span>Atur jumlah</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProductPageWeb;
  