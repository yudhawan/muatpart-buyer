import React, { useRef, useState } from "react";
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
import toast from "@/store/toast";
import SWRHandler from "@/services/useSWRHook";
import axios from "axios";

const ProgressBar = ({ progress }) => {
  return (
    <div className="self-center relative h-2 w-full bg-neutral-200 rounded-[20px] overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-primary-700 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

function InformasiPendaftarDanRekeningResponsive({
  bankOptions,
  hasVerifiedLegality,
  hasVerifiedRekening
}) {
  const {
    formData,
    errors,
    handleInputChange
  } = registerForm();
  const {
    setShowBottomsheet,setTitleBottomsheet,setDataBottomsheet
  } = toast();
  const [isOpenBankOptions, setIsOpenBankOptions] = useState(false)
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const cameraRef = useRef(null);
  const fileRef = useRef(null);
  const maxSize = 5

  const isBackAccountInfoFilled = formData[1].bankID && formData[1].accountNumber

  const { useSWRMutateHook } = new SWRHandler();
  const { trigger: triggerUploadPhoto } = useSWRMutateHook(
    process.env.NEXT_PUBLIC_API_HASYIM_DEVLINUX + 'v1/muatparts/product/photo',
    'POST',
    (url, arg) => {
      return axios({
        url,
        method: 'POST',
        data: arg,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
    }
  );

  const handleCameraChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation
    if (file.size > maxSize * 1024 * 1024) {
      onError('File size exceeds maximum limit');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setShowBottomsheet(false)
      setProgress(0);
      setIsUploading(true);
      const response = await triggerUploadPhoto(formData);
      
      if (response.data.Message.Code === 200) {
        handleFileUpload({
          url: response.data.Data.url,
          name: response.data.Data.name || file.name
        });
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setProgress(0);
      setIsUploading(false);
      cameraRef.current.value = null;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation
    if (file.size > maxSize * 1024 * 1024) {
      onError('File size exceeds maximum limit');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setShowBottomsheet(false)
      setProgress(0);
      setIsUploading(true);
      const response = await triggerUploadPhoto(formData);
      console.log("response",response)
      if (response.data.Message.Code === 200) {
        handleFileUpload({
          url: response.data.Data.url,
          name: response.data.Data.name || file.name
        });
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setProgress(0);
      setIsUploading(false);
      fileRef.current.value = null;
    }
  };

  // File upload handlers
  const handleFileUpload = (fileData) => {
    console.log("file",fileData)
    if (fileData === null) {
      handleInputChange("ktpFile", null);
    } else {
      handleInputChange("ktpFile", {
        url: fileData.url,
        name: fileData.name
      });
    }
  };

  // Input change handlers
  const handleTextInputChange = (field) => (e) => {
    handleInputChange(field, e.target.value);
  };

  const handleCheckBankAccount = () => {
    handleInputChange("accountName", "mulyono")
  }

  const handleOpenFileUploadBottomsheet = () => {
    setShowBottomsheet(true)
    setTitleBottomsheet(" -")
    setDataBottomsheet(
      <div className="flex justify-around">
        {uploadOptions.map((option, key) => (
          <div className="flex flex-col gap-y-4 items-center" key={key}>
            <div className="p-5 bg-primary-700 cursor-pointer rounded-[50px] size-16" onClick={option.onClick}>
              <IconComponent
                src={option.src}
                size="medium"
              />
            </div>
            <span className="font-semibold text-[16px] leading-[19.2px]">{option.title}</span>
          </div>
        ))}
      </div>
    )
  }

  const uploadOptions = [
    {
      src: "/icons/camera.svg",
      title: "Ambil Foto",
      onClick: () => cameraRef.current.click()
    },
    {
      src: "/icons/Upload.svg",
      title: "Unggah File",
      onClick: () => fileRef.current.click()
    },
  ]
  const acceptedFormats = ['.jpg', '.jpeg', '.png']

  return (
    <>
      <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px] py-16">
        <div className="flex flex-col self-center w-full max-w-[480px] gap-y-6 pb-20">
          <div className="font-semibold text-[14px] leading-[15.4px]">Data Pendaftar</div>

          {/* KTP File Upload */}
          <div className="flex flex-col gap-y-3">
            <span className="font-semibold text-[14px] leading-[15.4px]">KTP Pendaftar*</span>
            
            {hasVerifiedLegality ? (
              <div className="flex gap-x-2 items-center">
                <IconComponent
                  classname={styles.checked_success}
                  src="/icons/check-circle.svg"
                  width={12}
                  height={12}
                />
                <span
                  className="font-semibold text-[14px] leading-[15.4px] text-success-400"
                >
                  {formData[1].ktpFile?.name}
                </span>
              </div>
            ) : (
              <>
                <input
                  ref={cameraRef}
                  type="file"
                  className="hidden"
                  accept={acceptedFormats.join(',')}
                  onChange={handleCameraChange}
                  capture
                />
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept={acceptedFormats.join(',')}
                  onChange={handleFileChange}
                />
                <div className="flex flex-col gap-y-4">
                  {formData[1].ktpFile ? (
                    <>
                      <div className="flex justify-between">
                        <div className="flex gap-x-2 items-center">
                          <IconComponent
                            classname={styles.checked_success}
                            src="/icons/check-circle.svg"
                            width={12}
                            height={12}
                          />
                          <span
                            className="font-semibold text-[14px] leading-[15.4px] text-success-400"
                          >
                            {formData[1].ktpFile?.name}
                          </span>
                        </div>
                        <div className="flex gap-x-3 items-center">
                          <IconComponent
                            src="/icons/silang.svg"
                            onclick={() => handleFileUpload(null)}
                          />
                          <span
                            className="font-medium text-[14px] leading-[15.4px] text-primary-700 cursor-pointer"
                            onClick={handleOpenFileUploadBottomsheet}
                          >
                            Ubah File
                          </span>
                        </div>
                      </div>
                      {isUploading ? <ProgressBar progress={progress} /> : null}
                    </>
                  ) : (
                    <div className="flex flex-col gap-y-3">
                      {isUploading ? <ProgressBar progress={progress} /> : null}
                      <Button
                        onClick={handleOpenFileUploadBottomsheet}
                        Class="h-[30px] px-6 flex gap-x-1.5"
                      >
                        <IconComponent
                          src="/icons/Upload.svg"
                          width={12}
                          height={12}
                        />
                        <span className="font-semibold text-[12px] leading-[14.4px]">Unggah</span>
                      </Button>
                      <span className="font-medium text-[12px] leading-[14.4px] text-[#676767]">
                        Format file jpg/png maks. 5MB
                      </span>
                    </div>
                  )}
                  {errors.ktpFile && (
                    <span className="text-[12px] leading-[13.2px] font-medium text-error-400">{errors.ktpFile}</span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* KTP Number */}
          <div className={`flex flex-col gap-y-4`}>
            <label className="font-semibold text-[14px] leading-[15.4px]">Nama KTP Pendaftar*</label>
            {hasVerifiedLegality ? (
              <span
              className="font-semibold text-[14px] leading-[15.4px]"
            >
              {formData[1].ktpNo}
            </span>
            ) : (
              <Input
                name="ktpNumber"
                type="text"
                placeholder="16 digit No. KTP Pendaftar"
                width={{ width: "100%" }}
                changeEvent={handleTextInputChange('ktpNo')}
                value={formData[1].ktpNo}
                status={errors.ktpNo ? 'error' : null}
                supportiveText={{ title: errors.ktpNo }}
              />
            )}
          </div>

          {/* KTP Name */}
          <div className={`flex flex-col gap-y-4 ${!hasVerifiedRekening ? "pb-6 border-b border-b-neutral-500" : ""}`}>
            <label className="font-semibold text-[14px] leading-[15.4px]">Nama KTP Pendaftar*</label>
            {hasVerifiedLegality ? (
              <span
              className="font-semibold text-[14px] leading-[15.4px]"
            >
              {formData[1].ktpNama}
            </span>
            ) : (
              <Input
                name="ktpNama"
                type="text"
                placeholder="Masukkan Nama sesuai KTP"
                width={{ width: "100%" }}
                changeEvent={handleTextInputChange('ktpNama')}
                status={errors.ktpNama ? 'error' : null}
                supportiveText={{ title: errors.ktpNama }}
                value={formData[1].ktpNama}
              />
            )}
          </div>

          {!hasVerifiedRekening ? (
            <>
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
                  onclick={() => {
                    setShowBottomsheet(true)
                    setTitleBottomsheet("Informasi Rekening Pencairan")
                    setDataBottomsheet(<p className="font-medium text-[14px] leading-[16.8px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend arcu eget massa porttitor, sed placerat enim dignissim. Praesent a ipsum malesuada odio aliquam pretium vel id turpis. Pellentesque pharetra eget nunc ac mattis. Curabitur eu suscipit arcu. Cras non consectetur risus, nec finibus turpis. Praesent nec sollicitudin velit. Pellentesque ornare elementum tellus, ut laoreet est consequat vel. In hac habitasse platea dictumst.
                    </p>)
                  }}
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
                    <div className="flex flex-col gap-y-3">
                      <div
                        className={`flex flex-row py-2 px-3 justify-between border ${errors.bankName ? "!border-error-400" : "!border-neutral-600"} rounded-md cursor-pointer`}
                        onClick={() => setIsOpenBankOptions(true)}
                      >
                        <span className="font-semibold text-[14px] leading-[15.4px]">
                          {formData[1].bankID ? bankOptions.find(item => item.value === formData[1].bankID).name : "Pilih Bank"}
                        </span>
                        <IconComponent
                          src="/icons/chevron-down.svg"
                        />
                      </div>
                      {errors.bankName && (
                        <span className="text-[12px] leading-[13.2px] font-medium text-error-400">{errors.bankName}</span>
                      )}
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
                      status={errors.accountNumber ? 'error' : null}
                      supportiveText={{ title: errors.accountNumber }}
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
            </>
          ) : null}
        </div>
      </div>
      <Bottomsheet/>
      <SelectBankResponsive 
        bankOptions={bankOptions}
        isOpen={isOpenBankOptions}
        setIsOpen={setIsOpenBankOptions}
      />
    </>
  );
}

export default InformasiPendaftarDanRekeningResponsive;