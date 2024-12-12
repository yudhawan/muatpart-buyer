"use client";

import { useEffect } from "react";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import SWRHandler from "@/services/useSWRHook";
import RegisterResponsive from "./registerResponsive";
import RegisterWeb from "./registerWeb";
import registerForm from "@/store/registerForm";

function Register() {
  const [state, setState] = useState();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const { isMobile } = viewport();
  const {
    formData,
    currentStep,
    handleInputChange,
    setFormData,
    validateStep,
    nextStep,
    prevStep,
  } = registerForm();

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
    console.log(formData, " form zus");
  }, [formData]);

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

  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile) return <RegisterResponsive />;
  return (
    <RegisterWeb
      bankOptions={bankOptions}
      hasVerifiedLegality={hasVerifiedLegality}
      hasVerifiedRekening={hasVerifiedRekening}
    />
  )
}

export default Register;
