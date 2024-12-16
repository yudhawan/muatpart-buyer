import React, { useState } from "react";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import FileUpload from "@/components/FileUpload/FileUpload";
import Dropdown from "@/components/Dropdown/Dropdown";
import registerForm from "@/store/registerForm";
import Button from "@/components/Button/Button";
import IconComponent from "@/components/IconComponent/IconComponent";
import styles from "./InformasiPendaftarDanRekeningResponsive.module.scss"
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import SelectBankResponsive from "./SelectBankResponsive";

function InformasiPendaftarDanRekeningResponsive({
  bankOptions
}) {
  const {
    formData,
    handleInputChange
  } = registerForm();
  const [isOpenBankOptions, setIsOpenBankOptions] = useState(false)

  const isTrue = true

  const isBackAccountInfoFilled = formData[1].bankID && formData[1].accountNumber

  // File upload handlers
  const handleFileUpload = (fileData) => {
    if (fileData === null) {
      handleInputChange("ktpFile", null);
    } else {
      handleInputChange("ktpFile", {
        url: fileData.url,
        name: fileData.name
      });
    }
  };

  const handleFileUploadError = (error) => {
    // Handle file upload error
    console.error("File upload error:", error);
  };

  // Input change handlers
  const handleTextInputChange = (field) => (e) => {
    handleInputChange(field, e.target.value);
  };

  const handleCheckBankAccount = () => {
    handleInputChange("accountName", "mulyono")
  }

  const uploadOptions = [
    {
      src: "/icons/camera.svg",
      title: "Ambil Foto",
      onClick: () => {}
    },
    {
      src: "/icons/Upload.svg",
      title: "Unggah File",
      onClick: () => {}
    },
  ]

  return (
    <>
      <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
        <div className="flex flex-col self-center w-full max-w-[480px] gap-y-6 pb-20">
          <div className="font-semibold text-[14px] leading-[15.4px]">Data Pendaftar</div>

          {/* KTP File Upload */}
          <div className="flex flex-col gap-y-3">
            <span className="font-semibold text-[14px] leading-[15.4px]">KTP Pendaftar*</span>
            <FileUpload
              label="Unggah"
              acceptedFormats={['.jpg', '.jpeg', '.png']}
              maxSize={5}
              onSuccess={handleFileUpload}
              onError={handleFileUploadError}
              value={formData[1].ktpFile}
            />
          </div>

          {/* KTP Number */}
          <div className={`flex flex-col gap-y-4`}>
            <label className="font-semibold text-[14px] leading-[15.4px]">Nama KTP Pendaftar*</label>
            <Input
              name="ktpNumber"
              type="text"
              placeholder="16 digit No. KTP Pendaftar"
              width={{ width: "100%" }}
              changeEvent={handleTextInputChange('ktpNo')}
              value={formData[1].ktpNo}
            />
          </div>

          {/* KTP Name */}
          <div className={`flex flex-col gap-y-4 ${isTrue ? "pb-6 border-b border-b-neutral-500" : ""}`}>
            <label className="font-semibold text-[14px] leading-[15.4px]">Nama KTP Pendaftar*</label>
            <Input
              name="ktpName"
              type="text"
              placeholder="Masukkan Nama sesuai KTP"
              width={{ width: "100%" }}
              changeEvent={handleTextInputChange('namaKtpPendaftar')}
              value={formData[1].namaKtpPendaftar}
            />
          </div>

          {/* Bank Account Checkbox */}
          <div className={`flex justify-between`}>
            <Checkbox
              onChange={({ checked }) => handleInputChange("hasBankAccount", checked)}
              checked={formData[1].hasBankAccount}
            >
              <span className="font-semibold text-[14px] leading-[15.4px]">
                Lengkapi Informasi Rekening Pencairan Dana
              </span>
            </Checkbox>
            <IconComponent
              src='/icons/Info.svg'
              onclick={() => {}}
            />
          </div>

          {/* Conditional Bank Account Section */}
          {formData[1].hasBankAccount && (
            <>
              <div className="font-semibold text-[14px] leading-[15.4px]">Informasi Rekening Pencairan</div>
              <div className="flex flex-col gap-y-4">
                <label className="font-semibold text-[14px] leading-[15.4px]">
                  Nama Bank*
                </label>
                <div
                  className="flex flex-row py-2 px-3 justify-between border border-neutral-600 rounded-md cursor-pointer"
                  onClick={() => setIsOpenBankOptions(true)}
                >
                  <span className="font-semibold text-[14px] leading-[15.4px]">
                    {formData[1].bankID ? bankOptions.find(item => item.value === formData[1].bankID).name : "Pilih Bank"}
                  </span>
                  <IconComponent
                    src="/icons/chevron-down.svg"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <label className="font-semibold text-[14px] leading-[15.4px]">
                  Nomor Rekening*
                </label>
                <Input
                  name="accountNumber"
                  type="text"
                  placeholder="Masukkan Nomor Rekening"
                  width={{ width: "100%" }}
                  changeEvent={handleTextInputChange('accountNumber')}
                  value={formData[1].accountNumber}
                  text={{ right: (
                    <span
                      className={`font-semibold text-[14px] leading-[15.4px]
                        ${isBackAccountInfoFilled ? "text-primary-700 cursor-pointer" : "text-neutral-600" }`}
                      onClick={handleCheckBankAccount}
                    >
                      Periksa
                    </span>
                  )}}
                />
              </div>

              {formData[1].accountName && (
                <div className="flex flex-col gap-y-4">
                  <label className="font-semibold text-[14px] leading-[15.4px]">
                    Nama Pemilik Rekening
                  </label>
                  <span className="font-semibold text-[14px] leading-[15.4px]">
                    {formData[1].accountName}
                  </span>
                </div>
              )}

              {/* Warning Info */}
              <div className="flex gap-x-2.5 py-2 px-3 bg-warning-100 rounded-md items-center">
                <IconComponent
                  classname={styles.stroke_warning}
                  src='/icons/warning-triangle.svg'
                  size="medium"
                />
                <span className="font-medium text-[12px] leading-[14.4px]">
                  Rekening Bank akan digunakan sebagai rekening tujuan pencairan dana kamu
                </span>
                <IconComponent
                  src="/icons/chevron-right.svg"
                />
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div
          className={`fixed bottom-0 left-0 right-0 w-full flex gap-x-2 p-4 bg-white shadow-muat
            ${isOpenBankOptions ? "hidden" : ""}  
          `}
        >
          <Button
            name="back"
            color="primary_secondary"
            onClick={() => {/* Handle back */}}
            Class="h-8 min-w-[160px] !font-semibold !text-[12px] !leading-[14.4px]"
          >
            Kembali
          </Button>
          <Button
            name="next"
            color="primary"
            onClick={() => {/* Handle next */}}
            Class="h-8 min-w-[160px] !font-semibold !text-[12px] !leading-[14.4px]"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
      {/* <Bottomsheet>
        <div className="flex justify-around">
          {uploadOptions.map((option, key) => (
            <div key={key} className="flex flex-col gap-y-4 items-center">
              <div className="p-5 bg-primary-700">
                <IconComponent
                  src={option.src}
                  size="medium"
                  onclick={option.onClick}
                />
              </div>
              <span className="font-semibold text-[16px] leading-[19.2px]">
                {option.title}
              </span>
            </div>
          ))}
        </div>
      </Bottomsheet> */}
      <Bottomsheet label="">

      </Bottomsheet>
      <SelectBankResponsive 
        bankOptions={bankOptions}
        isOpen={isOpenBankOptions}
        setIsOpen={setIsOpenBankOptions}
      />
    </>
  );
}

export default InformasiPendaftarDanRekeningResponsive;