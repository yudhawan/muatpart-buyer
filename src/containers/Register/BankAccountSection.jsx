import Dropdown from '@/components/Dropdown/Dropdown';
import IconComponent from '@/components/IconComponent/IconComponent';
import Input from '@/components/Input/Input';
import React from 'react';
import styles from "./BankAccountSection.module.scss"

const BankAccountSection = ({ bankOptions, formData, setFormData, errors, touched }) => {
  const handleBankSelect = (selected) => {
    setFormData(prev => ({ 
      ...prev, 
      bankName: selected[0]?.value 
    }));
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const bankNameValue = bankOptions.find(item => item.value === formData.bankName)

  return (
    <div>
      <span className="font-semibold text-[18px] leading-[21.6px]">Informasi Rekening Pencairan</span>
      <div className="space-y-4 mt-6">
        <div className="flex items-start">
          <div className="w-[291px] pt-3">
            <span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">Nama Bank*</span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <Dropdown
              options={bankOptions}
              onSelected={handleBankSelect}
              placeholder="Pilih Bank"
              searchPlaceholder="Cari bank..."
              onSearchValue={true}
              classname={`!w-[372px] ${errors.bankName ? "!border-error-400" : "!border-neutral-600"}`}
              defaultValue={bankNameValue ? [bankNameValue] : []}
            />
            {touched.bankName && errors.bankName && (
              <span className="text-[12px] font-medium text-error-400">{errors.bankName}</span>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-[291px] pt-3">
            <span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">Nomor Rekening*</span>
          </div>
          <div className="flex-1">
            <Input
              name="accountNumber"
              type="text"
              placeholder="Masukkan Nomor Rekening"
              width={{ width: "372px" }}
              changeEvent={handleInputChange('accountNumber')}
              status={touched.accountNumber && errors.accountNumber ? 'error' : null}
              supportiveText={{ title: errors.accountNumber }}
              text={{ right: (
                <span
                  className={`font-medium text-[12px] leading-[14.4px] ${(!bankNameValue || !formData.accountNumber) ? "text-neutral-500" : "text-primary-700 cursor-pointer"}`}
                >
                  Periksa
                </span>
              ) }}
              value={formData.accountNumber}
            />
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-1">
            <div className="bg-secondary-100 rounded-md px-6 py-4">
              <div className="flex gap-x-2 items-center">
                <IconComponent
                  classname={styles.stroke_warning}
                  src='/icons/warning-triangle.svg'
                  size="medium"
                />
                <span className="font-medium text-[12px] leading-[14.4px]">
                  Rekening Bank akan digunakan sebagai rekening tujuan pencairan dana kamu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountSection;
