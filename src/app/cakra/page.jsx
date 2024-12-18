"use client";

import LocationManagement from "@/components/LocationManagement/LocationManagement";
import registerForm from "@/store/registerForm";

function page() {
  const {
    formData,
    errors,
    currentStep,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep,
  } = registerForm();

  return <LocationManagement errors={errors} />;
}

export default page;
