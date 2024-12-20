
'use client';
import ButtonBottomMobile from '@/components/ButtonBottomMobile/ButtonBottomMobile';
import style from './ContainerTambahAlamat.module.scss'
import Button from '@/components/Button/Button';
import { useHeader } from '@/common/ResponsiveContext';
function ContainerTambahAlamat({address,}) {
    const {setAppBar}=useHeader()
    return (
        <div className={style.main+` flex flex-col pb-16 h-screen w-full bg-neutral-50 ${address?.length?'justify-center items-center':''}`}>
            {
                address
            }
            <ButtonBottomMobile>
                <Button onClick={()=>setAppBar({
                    appBarType:'tambah_alamat_form'
                })} Class='text-sm font-semibold h-10 !w-full !max-w-none'>Tambah Alamat</Button>
            </ButtonBottomMobile>
        </div>
    );
}

export default ContainerTambahAlamat;
  