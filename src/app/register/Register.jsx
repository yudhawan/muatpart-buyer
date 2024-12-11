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
    validateStep,
    nextStep,
    prevStep,
  } = registerForm();

  const { data: dataBanks } = useSWRHook(`${process.env.NEXT_PUBLIC_API}v1/register/banks`)

  const banks = dataBanks?.Data || []
  const bankOptions = banks.map(bank => ({ name: bank.value, value: bank.id }))

  useEffect(() => {
    console.log(formData, " form zus");
  }, [formData]);

  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile) return <RegisterResponsive />;
  return (
    <RegisterWeb
      bankOptions={bankOptions}
    />
  )
}

export default Register;
