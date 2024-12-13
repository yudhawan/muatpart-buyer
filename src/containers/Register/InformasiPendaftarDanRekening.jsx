import Input from "@/components/Input/Input";
import Tooltip from "@/components/Tooltip/Tooltip";
import BankAccountSection from "@/containers/Register/BankAccountSection";
import Checkbox from "@/components/Checkbox/Checkbox";
import FileUpload from "@/components/FileUpload/FileUpload";
import { useState } from "react";
import IconComponent from "@/components/IconComponent/IconComponent";
import registerForm from "@/store/registerForm";

const InformasiPendaftarDanRekening = ({
  bankOptions,
  hasVerifiedLegality,
  hasVerifiedRekening
}) => {
  const {
    formData,
    // currentStep,
    errors,
    handleInputChange: handleFormDataChange,
    // setFormData,
    // validateStep,
    // nextStep,
    // prevStep,
  } = registerForm();
const currentStep = 1 // nanti dicomment
// const hasVerifiedLegality = false,
// hasVerifiedRekening = false

  // const [touched, setTouched] = useState({});
// console.log('err',errors)

  const handleFileUpload = (fileData) => {
    if (fileData === null) {
      // Handle file deletion
      handleFormDataChange("ktpFile", null)
    } else {
      // Handle successful file upload
      handleFormDataChange("ktpFile", {
        url: fileData.url,
        name: fileData.name
      })
    }
    // setTouched(prev => ({...prev, ktpFile: true}));
  };

  const handleFileUploadError = (error) => {
    // setErrors(prev => ({
    //   ...prev,
    //   ktpFile: "Gagal mengunggah file. Silakan coba lagi."
    // }));
    // setTouched(prev => ({...prev, ktpFile: true}));
  };

  const handleInputChange = (field) => (e) => {
    handleFormDataChange(field, e.target.value)
  };

  const handleSubmit = () => {
    // const isValid = validateForm();
    // if (isValid) {
    //   console.log('Form submitted:', formData);
    // } else {
    //   setTouched({
    //     ktpFile: true,
    //     ktpNumber: true,
    //     ktpName: true,
    //     ...(showBankInfo && {
    //       bankName: true,
    //       accountNumber: true,
    //       accountName: true
    //     })
    //   });
    // }
  };
// console.log('form',formData[currentStep])
	return (
		<div className="mt-8">
			<span className="font-semibold text-[18px] leading-[21.6px]">Data Pendaftar</span>
		
			<div className="mt-6 space-y-4">
				<div className="flex items-start">
					<div className="w-[291px]">
						<span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">KTP Pendaftar*</span>
					</div>
					<div className={`flex-1`}>
						{hasVerifiedLegality ? (
              <span
                className="font-medium text-[12px] leading-[14.4px] text-success-400"
              >
                {/* {merchantCompany?.legalityFile[0].file.split("/").at(-1)} */}
              </span>
            ) : (
              <div className="flex flex-col gap-2">
                <FileUpload
                  className="w-[372px]"
                  label="Unggah"
                  acceptedFormats={['.jpg', '.jpeg', '.png']}
                  maxSize={5}
                  onSuccess={handleFileUpload}
                  onError={handleFileUploadError}
                  value={formData[currentStep].ktpFile}
                />
                {errors.ktpFile && (
                  <span className="text-[12px] font-medium text-error-400">{errors.ktpFile}</span>
                )}
              </div>
            )}
					</div>
				</div>

				<div className="flex items-start">
					<div className="w-[291px] pt-[11px]">
						<span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">No. KTP Pendaftar*</span>
					</div>
					<div className={`flex-1 ${hasVerifiedLegality ? "pt-[11px]" : ""}`}>
            {hasVerifiedLegality ? (
              <span className="font-medium text-[12px] leading-[14.4px]">
                {formData[currentStep].ktpNo}
              </span>
            ) : (
              <Input
                name="ktpNo"
                type="text"
                placeholder="16 digit No. KTP Pendaftar"
                width={{ width: "372px" }}
                changeEvent={handleInputChange('ktpNo')}
                status={errors.ktpNo ? 'error' : null}
                supportiveText={{ title: errors.ktpNo }}
                value={formData[currentStep].ktpNo}
              />
            )}
          </div>
				</div>

				<div className="flex items-start">
					<div className="w-[291px] pt-[11px]">
						<span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">Nama KTP Pendaftar*</span>
					</div>
					<div className={`flex-1 ${hasVerifiedLegality ? "pt-[11px]" : ""}`}>
            {hasVerifiedLegality ? (
              <span className="font-medium text-[12px] leading-[14.4px]">
                {formData[currentStep].namaKtpPendaftar}
              </span>
            ) : (
              <Input
                name="namaKtpPendaftar"
                type="text"
                placeholder="Masukkan Nama sesuai KTP"
                width={{ width: "372px" }}
                changeEvent={handleInputChange('namaKtpPendaftar')}
                status={errors.namaKtpPendaftar ? 'error' : null}
                supportiveText={{ title: errors.namaKtpPendaftar }}
                value={formData[currentStep].namaKtpPendaftar}
              />
            )}
					</div>
				</div>

				{!hasVerifiedRekening ? (
          <>
            <div className="flex items-start">
              <div className="flex items-center gap-2">
                <Checkbox
                  label="Lengkapi Informasi Rekening Pencairan Dana"
                  onChange={({ checked }) => handleFormDataChange("hasBankAccount", checked)}
                  checked={formData[currentStep].hasBankAccount}
                />
                <Tooltip
                  text="Lengkapi info rekening saat registrasi untuk memudahkan pencairan dana."
                  position="right"
                >
                  <IconComponent
                    src='/icons/Info.svg'
                  />
                </Tooltip>
              </div>
            </div>

            {formData[currentStep].hasBankAccount && (
              <BankAccountSection
                bankOptions={bankOptions}
                errors={errors}
              />
            )}
          </>
        ) : null}
			</div>
		</div>
	)
}

export default InformasiPendaftarDanRekening