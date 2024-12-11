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

  useEffect(() => {
    console.log(formData, " form zus");
  }, [formData]);

  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile) return <RegisterResponsive />;
  return <RegisterWeb />;
}

export default Register;
