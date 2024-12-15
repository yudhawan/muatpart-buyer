"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const step = useSearchParams().get("step") || "1";
  const { isMobile } = viewport();
  const { mutate } = useSWRConfig();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const {
    formData,
    currentStep,
    validateFirstStep,
    validateSecondStep,
    isSubmitting,
    setIsSubmitting,
    setFormData,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep,
  } = registerForm();
  const {setDataToast, setShowToast} = toast()

  const { data: merchantData } = useSWRHook(
    formData[0].tipeToko === 0
      ? `${api}v1/register/merchant_personal`
      : `${api}v1/register/merchant_company`,
    "GET"
  );

  const { trigger: submitData, error: errorSubmitData } = useSWRMutateHook(
    formData[0].tipeToko === 0
      ? `${api}v1/register/merchant_personal`
      : `${api}v1/register/merchant_company`,
    "POST"
  );

  const { trigger: setLegality } = useSWRMutateHook(
    formData[0].tipeToko === 0
      ? `${api}v1/register/set_merchant_legality`
      : `${api}v1/register/set_merchant_company_legality`,
    "POST"
  );

  const { trigger: registerSeller } = useSWRMutateHook(
    formData[0].tipeToko === 0
      ? `${api}v1/register/register_merchant_personal`
      : `${api}v1/register/register_merchant_company`,
    "PUT"
  );

  const { data: dataBanks } = useSWRHook(`${process.env.NEXT_PUBLIC_API_HASYIM}v1/register/banks`)
  const { data: dataTimerOtp } = useSWRHook(step === "4" ? `${process.env.NEXT_PUBLIC_API_HASYIM}v1/register/timer_otp?Email=${formData[0].email}&Type=18` : null)

  const banks = dataBanks?.Data || []
  const bankOptions = banks.map(bank => ({ name: bank.value, value: bank.id }))
  const existingMerchantData = merchantData?.Data
  const hasVerifiedLegality = existingMerchantData?.legality?.length > 0 && existingMerchantData?.legalityFile?.length > 0
  const hasVerifiedRekening = existingMerchantData?.rekening?.length > 0
  const remainingTime = dataTimerOtp?.Data.Remaining

  useEffect(() => {
    if (step === "1" && existingMerchantData) {
      setFormData([{ ...formData[0], ...existingMerchantData }, formData[1]]);
    }
    if (step === "2") {
      let newFormDataStepTwo = {} 
      if (hasVerifiedLegality) {
        newFormDataStepTwo = {
          ...newFormDataStepTwo,
          ktpFile: {
            url: existingMerchantData?.legalityFile[0].file,
            name: existingMerchantData?.legalityFile[0].file.split("/").at(-1)
          },
          ktpNo: existingMerchantData?.legality[0].ktpNo,
          ktpNama: existingMerchantData?.legality[0].namaKtpPendaftar
        }
      }
      if (hasVerifiedRekening) {
        newFormDataStepTwo = {
          ...newFormDataStepTwo,
          accountNumber: existingMerchantData?.rekening[0].rekeningNumber,
          accountName: existingMerchantData?.rekening[0].namaPemilik,
          bankID: existingMerchantData?.rekening[0].bankID,
          hasBankAccount: true
        }
      }
      setFormData([ formData[0], { ...formData[1], ...newFormDataStepTwo }])
    }
  }, [JSON.stringify(existingMerchantData), hasVerifiedLegality, hasVerifiedRekening, step])

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
            setShowToast(true);
            setDataToast({
              type: "success",
              message: "Data berhasil disimpan",
            });
            nextStep()
            router.push(`/register?step=${Number(step) + 1}`);
          })
          .catch((err) => {
            console.log(err,errorSubmitData, " erddio");
            setShowToast(true);
            setDataToast({ type: "error", message: "Gagal menyimpan data" });
            setIsSubmitting(false);
          });
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === 1 && validateSecondStep()) {
      const step2Data = {
        ...formData[1],
        ktpFile: formData[1].ktpFile.url, 
      }
      setIsSubmitting(true);
      await setLegality(step2Data)
        .then(() => {
          setIsSubmitting(false);
          mutate(
            `${api}v1/register/merchant_${
              formData[0].tipeToko === 0 ? "personal" : "company"
            }`
          );
          setShowToast(true);
          setDataToast({
            type: "success",
            message: "Data berhasil disimpan",
          });
          nextStep()
          router.push(`/register?step=${Number(step) + 1}`);
        })
        .catch((err) => {
          setShowToast(true);
          setDataToast({ type: "error", message: "Gagal menyimpan data" });
          setIsSubmitting(false);
        });
    } else if (currentStep === 2) {
      setIsSubmitting(true);
      await registerSeller()
        .then(() => {
          setIsSubmitting(false);
          nextStep()
          router.push(`/register?step=${Number(step) + 1}`);
        })
        .catch(() => {
          setShowToast(true);
          setDataToast({ type: "error", message: "Gagal melakukan registrasi" });
          setIsSubmitting(false);
        })
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
      remainingTime={remainingTime}
    />
  );
}

export default Register;
