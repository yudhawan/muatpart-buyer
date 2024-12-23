import { Fragment } from 'react';
import Image from 'next/image';
import styles from "./VoucherModal.module.scss"
import IconComponent from '@/components/IconComponent/IconComponent';

const VoucherCard = ({ 
  cashbackAmount,
  maxDiscount,
  minTransaction,
  onShowVoucherInfo
}) => {
  return (
    <div className="flex-none w-[424px] relative overflow-hidden">
      <div className="flex overflow-hidden relative flex-col py-3 px-4 w-full aspect-[3.475]">
        <IconComponent
          src="/icons/info.svg"
          width={13}
          height={13}
          classname={`absolute right-[9px] z-[2] top-[9px] ${styles.icon_info_primary}`}
          onclick={() => onShowVoucherInfo("abc")}
        />
        <Image
          src="/img/temp-voucher-ticket-modal.png"
          className="object-cover absolute inset-0 size-full"
          alt="Voucher background"
          width={424}
          height={122}
        />
        <div className="flex relative items-start w-full">
          <div className="flex gap-3 items-center">
            <Image
              src="/img/temp-voucher.png"
              alt="Cashback icon"
              width={64}
              height={64}
            />
            <div className='flex flex-col justify-between h-[68px]'>
              <span className='font-bold text-[12px] leading-[14.4px]'>
                CASHBACK {cashbackAmount}%
              </span>
              <ul className="font-medium text-[10px] leading-[13px] text-neutral-700 list-disc pl-3">
                <li>
                  Dapat cashback {cashbackAmount}%, maks. potongan Rp {maxDiscount}
                </li>
                <li>
                  Min. Transaksi Rp {minTransaction}
                </li>
              </ul>
              <div className='flex flex-col gap-y-1'>
                <div className="self-center relative h-[6px] w-[316px] py-[1px] px-0.5 bg-neutral-200 rounded-[5px] overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary-700"
                    style={{ width: `${20}%` }}
                  />
                </div>
                <div className='flex gap-x-0.5'>
                  <span className='font-medium text-[8px] leading-[10.4px]'>Terpakai</span>
                  <span className='font-bold text-[8px] leading-[10.4px]'>20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between z-[2] mt-5'>
          <span className="font-medium text-[12px] leading-[14.4px] text-error-700">Berakhir 3 hari lagi</span>
          <button className="font-bold text-[12px] leading-[14.4px] text-primary-700">Klaim</button>
        </div>
      </div>
    </div>
  );
};

const VoucherModal = ({ isOpen, setIsOpen, vouchers = [], onShowVoucherInfo }) => {
  return (
    <div className={`fixed inset-0 z-[90] flex items-center justify-center ${!isOpen ? "hidden" : "block"}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl px-6 py-8 flex flex-col gap-y-4 items-center">
        {/* Header */}
        <button
          className='absolute top-[8px] right-[9px]'
          onClick={() => setIsOpen(false)}
        >
          <IconComponent
            classname={styles.icon_primary}
            src="/icons/silang.svg"
          />
        </button>
        <span className="font-bold text-[16px] leading-[19.2px]">
          Pilih Voucher Toko Makmur Jaya
        </span>

        {/* Content */}
        <div className="flex flex-col gap-y-3 overflow-y-auto max-h-[412px]">
          {vouchers.length === 0 ? (
            <div className="p-8 text-center text-neutral-600">
              Tidak ada voucher tersedia
            </div>
          ) : (
            vouchers.map((voucher, key) => (
              <Fragment key={key}>
                <VoucherCard
                  {...voucher}
                  onShowVoucherInfo={onShowVoucherInfo}
                />
              </Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;