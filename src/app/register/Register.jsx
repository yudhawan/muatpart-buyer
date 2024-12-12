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

  useEffect(() => {
    if (merchantData?.Data) {
      setFormData([{ ...formData[0], ...merchantData.Data }, formData[1]]);
    }
  }, [merchantData]);

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
            router.push(`/register?step=${currentStep + 1}`);
          })
          .catch((err) => {
            console.log(err,errorSubmitData, " erddio");
            setShowToast(true);
            setDataToast({ type: "error", message: "Gagal menyimpan data" });
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
    <RegisterWeb handleNext={handleNext} isSubmitting={isSubmitting} />
  );
}

export default Register;
