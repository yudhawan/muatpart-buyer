"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { viewport } from "@/store/viewport";
import SWRHandler from "@/services/useSWRHook";
import RegisterWeb from "./registerWeb";
import RegisterResponsive from "./registerResponsive";
import registerForm from "@/store/registerForm";
import toast from "@/store/toast";

const api = process.env.NEXT_PUBLIC_API_HASYIM;

function Register() {
  const router = useRouter();
  const { isMobile } = viewport();
  const { mutate } = useSWRConfig();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const {
    formData,
    currentStep,
    validateFirstStep,
    isSubmitting,
    setIsSubmitting,
    setFormData,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep,
  } = registerForm();

  const { data: merchantData } = useSWRHook(
    formData[0].tipeToko === 0
      ? `${api}v1/register/merchant_personal`
      : `${api}v1/register/merchant_company`,
    "GET"
  );

  const { trigger: submitData } = useSWRMutateHook(
    formData[0].tipeToko === 0
      ? `${api}v1/register/merchant_personal`
      : `${api}v1/register/merchant_company`,
    "POST"
  );

  const { data: dataBanks } = useSWRHook(`${process.env.NEXT_PUBLIC_API}v1/register/banks`)
  const { data: dataMerchantCompany } = useSWRHook(`${process.env.NEXT_PUBLIC_API}v1/register/merchant_company`)
  // const { data: dataTimerOtp } = useSWRHook(`${process.env.NEXT_PUBLIC_API}v1/register/timer_otp?email=contohhasyim@yopmail.com&type=18`)
// console.log('data',dataTimerOtp)

  const banks = dataBanks?.Data || []
  const bankOptions = banks.map(bank => ({ name: bank.value, value: bank.id }))
  const merchantCompany = dataMerchantCompany?.Data || {}
  const hasVerifiedLegality = merchantCompany?.legality?.length > 0 && merchantCompany?.legalityFile?.length > 0
  const hasVerifiedRekening = merchantCompany?.rekening?.length > 0

  useEffect(() => {
    if (merchantData?.Data) {
      setFormData([{ ...formData[0], ...merchantData.Data }, formData[1]]);
    }
  }, [merchantData]);

  useEffect(() => {
    if (merchantCompany) {
      if (hasVerifiedLegality) {
        setFormData(1, "ktpFile", {
          url: merchantCompany?.legalityFile[0].file,
          name: merchantCompany?.legalityFile[0].file.split("/").at(-1)
        })
        setFormData(1, "ktpNo", merchantCompany?.legality[0].ktpNo)
        setFormData(1, "namaKtpPendaftar", merchantCompany?.legality[0].namaKtpPendaftar)
      }
      if (hasVerifiedRekening) {
        setFormData(1, "bankID", merchantCompany?.rekening[0].bankID)
        setFormData(1, "rekeningNumber", merchantCompany?.rekening[0].rekeningNumber)
        setFormData(1, "namaPemilik", merchantCompany?.rekening[0].namaPemilik)
      }
    }
  }, [JSON.stringify(merchantCompany), hasVerifiedLegality, hasVerifiedRekening])

  const handleNext = async () => {
    if (currentStep === 0 && validateFirstStep()) {
      try {
        setIsSubmitting(true);
        const submitPayload = {
          ...formData[0],
          ...(formData[0].tipeToko === 0 && {
            companyName: undefined,
            businessEntityID: undefined,
          }),
          ...(formData[0].logo === null && {
            logo: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1733985462989.webp",
          }),
        };

        await submitData(submitPayload)
          .then(() => {
            mutate(
              `${api}v1/register/merchant_${
                formData[0].tipeToko === 0 ? "personal" : "company"
              }`
            );
            toast
              .getState()
              .setDataToast({
                type: "success",
                message: "Data berhasil disimpan",
              });
            router.push(`/register?step=${currentStep + 1}`);
          })
          .catch(() => {
            toast
              .getState()
              .setDataToast({ type: "error", message: "Gagal menyimpan data" });
          });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      router.push(`/register?step=${currentStep + 1}`);
    }
  };

  if (typeof isMobile !== "boolean") return null;

  return isMobile ? (
    <RegisterResponsive />
  ) : (
    <RegisterWeb
      handleNext={handleNext} 
      isSubmitting={isSubmitting}
      bankOptions={bankOptions}
      hasVerifiedLegality={hasVerifiedLegality}
      hasVerifiedRekening={hasVerifiedRekening}
    />
  );
}

export default Register;
