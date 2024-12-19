import Image from 'next/image';
import { useState } from 'react';
import styles from "./VoucherSlider.module.scss"
import IconComponent from '@/components/IconComponent/IconComponent';

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const VoucherSlider = ({ vouchers = [], onShowVoucherInfo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const voucherWidth = 229; // Width of each voucher
  const gapWidth = 16; // Gap between vouchers (gap-4 = 16px)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(vouchers.length - itemsPerPage, prevIndex + 1)
    );
  };

  const showLeftButton = currentIndex > 0;
  const showRightButton = currentIndex < vouchers.length - itemsPerPage;

  const translateX = currentIndex * (voucherWidth + gapWidth);

  return (
    <>
      <div className="relative" style={{ width: `${(voucherWidth + gapWidth) * itemsPerPage - gapWidth}px` }}>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-x-4"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {vouchers.map((voucher, index) => (
              <div key={index} className="flex-none w-[229px] relative overflow-hidden">
                <div className="flex overflow-hidden relative flex-col p-3 w-full aspect-[1.877]">
                  <Image
                    src="/img/voucher1.png"
                    className="object-cover absolute inset-0 size-full"
                    alt="Voucher background"
                    width={229}
                    height={122}
                  />
                  <IconComponent
                    src="/icons/info.svg"
                    width={13}
                    height={13}
                    classname={`absolute right-[9px] top-[9px] ${styles.icon_primary}`}
                    onclick={() => onShowVoucherInfo("hai")}
                  />
                  <div className="flex relative items-start w-full">
                    <div className="flex gap-2.5 items-center self-end mt-1">
                      <Image
                        src="/img/temp-voucher.png"
                        alt="Cashback icon"
                        width={64}
                        height={64}
                      />
                      <div className="flex flex-col gap-y-3">
                        <span className="font-bold text-[10px] leading-[13px]">
                          CASHBACK {voucher.cashbackAmount}%
                        </span>
                        <ul className="font-medium text-[8px] leading-[10.4px] text-neutral-700 list-disc pl-3">
                          <li>
                            Dapat cashback {voucher.cashbackAmount}%, maks. potongan Rp {voucher.maxDiscount}
                          </li>
                          <li>
                            Min. Transaksi Rp {voucher.minTransaction}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative gap-3 w-full justify-between items-center self-start mt-5">
                    <span className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-600 font-medium text-[10px] leading-[13px]">
                      Hingga {voucher.validUntil}
                    </span>
                    <button 
                      onClick={() => voucher.onClaim?.()}
                      className="self-stretch my-auto font-medium text-[10px] leading-[13px] text-primary-700"
                    >
                      Klaim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {vouchers.length > itemsPerPage && (
          <>
            {showLeftButton && (
              <button
                onClick={handlePrevious}
                className="absolute left-0 shadow-muat top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 hover:bg-gray-50"
                aria-label="Previous voucher"
              >
                <ChevronLeft />
              </button>
            )}
            {showRightButton && (
              <button
                onClick={handleNext}
                className="absolute right-[16px] shadow-muat top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 hover:bg-gray-50"
                aria-label="Next voucher"
              >
                <ChevronRight />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VoucherSlider;