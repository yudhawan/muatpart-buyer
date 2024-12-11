import Input from "@/components/Input/Input";
import Tooltip from "@/components/Tooltip/Tooltip";
import BankAccountSection from "@/containers/Register/BankAccountSection";
import Checkbox from "@/components/Checkbox/Checkbox";
import FileUpload from "@/components/FileUpload/FileUpload";
import { useState } from "react";
import IconComponent from "@/components/IconComponent/IconComponent";

const InformasiPendaftarDanRekening = ({
  bankOptions
}) => {
  const [formData, setFormData] = useState({
    ktpFile: null,
    ktpNumber: '',
    ktpName: '',
    bankName: '',
    accountNumber: '',
    accountName: ''
  });

  const [errors, setErrors] = useState({
    ktpFile: '',
    ktpNumber: '',
    ktpName: '',
    bankName: '',
    accountNumber: '',
    accountName: ''
  });

  const [showBankInfo, setShowBankInfo] = useState(false);
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // KTP File validation
    if (!formData.ktpFile) {
      newErrors.ktpFile = "KTP Pendaftar wajib diisi";
    }

    // KTP Number validation
    if (!formData.ktpNumber) {
      newErrors.ktpNumber = "No. KTP Pendaftar wajib diisi";
    } else if (formData.ktpNumber.length !== 16) {
      newErrors.ktpNumber = "No. KTP harus 16 digit";
    }

    // KTP Name validation
    if (!formData.ktpName) {
      newErrors.ktpName = "Nama KTP Pendaftar wajib diisi";
    }

    // Bank account validations if checkbox is checked
    if (showBankInfo) {
      // if (!formData.accountName) {
      //   newErrors.accountName = "Nama Rekening wajib diisi";
      // }
      if (!formData.accountNumber) {
        newErrors.accountNumber = "Nomor Rekening wajib diisi";
      }
      if (!formData.bankName) {
        newErrors.bankName = "Nama Bank wajib dipilih";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (fileData) => {
    if (fileData === null) {
      // Handle file deletion
      setFormData(prev => ({
        ...prev,
        ktpFile: null
      }));
    } else {
      // Handle successful file upload
      setFormData(prev => ({
        ...prev,
        ktpFile: {
          url: fileData.url,
          name: fileData.name
        }
      }));
      setErrors(prev => ({
        ...prev,
        ktpFile: ""
      }));
    }
    setTouched(prev => ({...prev, ktpFile: true}));
  };

  const handleFileUploadError = (error) => {
    // setErrors(prev => ({
    //   ...prev,
    //   ktpFile: "Gagal mengunggah file. Silakan coba lagi."
    // }));
    setTouched(prev => ({...prev, ktpFile: true}));
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setTouched(prev => ({...prev, [field]: true}));
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log('Form submitted:', formData);
    } else {
      setTouched({
        ktpFile: true,
        ktpNumber: true,
        ktpName: true,
        ...(showBankInfo && {
          bankName: true,
          accountNumber: true,
          accountName: true
        })
      });
    }
  };
console.log('form',formData)
	return (
		<div className="mt-8">
			<span className="font-semibold text-[18px] leading-[21.6px]">Data Pendaftar</span>
		
			<div className="mt-6 space-y-4">
				<div className="flex items-start">
					<div className="w-[291px]">
						<span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">KTP Pendaftar*</span>
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-2">
							<FileUpload
								className="w-[372px]"
								label="Unggah"
								acceptedFormats={['.jpg', '.jpeg', '.png']}
								maxSize={5}
								onSuccess={handleFileUpload}
								onError={handleFileUploadError}
								value={formData.ktpFile}
							/>
							{touched.ktpFile && errors.ktpFile && (
								<span className="font-medium text-[12px] text-error-400">{errors.ktpFile}</span>
							)}
						</div>
					</div>
				</div>

				<div className="flex items-start">
					<div className="w-[291px] pt-[11px]">
						<span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">No. KTP Pendaftar*</span>
					</div>
					<div className="flex-1">
						<Input
							name="ktpNumber"
							type="text"
							placeholder="16 digit No. KTP Pendaftar"
							width={{ width: "372px" }}
							changeEvent={handleInputChange('ktpNumber')}
							status={touched.ktpNumber && errors.ktpNumber ? 'error' : null}
							supportiveText={{ title: errors.ktpNumber }}
							value={formData.ktpNumber}
						/>
					</div>
				</div>

				<div className="flex items-start">
					<div className="w-[291px] pt-[11px]">
						<span className="font-medium text-[12px] leading-[14.4px] text-neutral-600">Nama KTP Pendaftar*</span>
					</div>
					<div className="flex-1">
						<Input
							name="ktpName"
							type="text"
							placeholder="Masukkan Nama sesuai KTP"
							width={{ width: "372px" }}
							changeEvent={handleInputChange('ktpName')}
							status={touched.ktpName && errors.ktpName ? 'error' : null}
							supportiveText={{ title: errors.ktpName }}
							value={formData.ktpName}
						/>
					</div>
				</div>

				<div className="flex items-start">
					<div className="flex items-center gap-2">
						<Checkbox
							label="Lengkapi Informasi Rekening Pencairan Dana"
							onChange={({ checked }) => setShowBankInfo(checked)}
							checked={showBankInfo}
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

				{showBankInfo && (
					<BankAccountSection
            bankOptions={bankOptions}
						formData={formData} 
						setFormData={setFormData}
						errors={errors}
						touched={touched}
					/>
				)}
			</div>
		</div>
	)
}

export default InformasiPendaftarDanRekening