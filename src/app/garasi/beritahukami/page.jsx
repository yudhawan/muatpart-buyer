"use client";

import { useState, useEffect } from "react";
// import DesktopFormDetails from "./DesktopFormDetails";
import MobileFormDetails from "@/app/garasi/beritahukami/mobile";
import toast from "@/store/toast";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast/Toast";
import { modal } from "@/store/modal";

export const useFormProps = () => {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    email: { value: "", error: "" },
    description: { value: "", error: "" },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setDataToast, setShowToast } = toast();
  const { setModalOpen } = modal();

  const handleDetailsChange = (key, value) => {
    setFormDetails((prev) => ({
      ...prev,
      [key]: {
        value,
        error: "",
      },
    }));
    setIsSubmitted(false);
  };

  const validateDetails = () => {
    const newFormDetails = { ...formDetails };
    let isValid = true;

    // Validate Description (required)
    if (!formDetails.description.value.trim()) {
      newFormDetails.description.error = "Deskripsi Kendaraan wajib diisi";
      isValid = false;
    } else if (formDetails.description.value.length > 1000) {
      newFormDetails.description.error =
        "Deskripsi tidak boleh lebih dari 1000 karakter";
      isValid = false;
    }

    // Validate Email (optional but must be valid if provided)
    if (formDetails.email.value && !validateEmail(formDetails.email.value)) {
      newFormDetails.email.error = "Format email tidak valid";
      isValid = false;
    }

    setFormDetails(newFormDetails);
    return isValid;
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (validateDetails()) {
      // Show success in console
      // router.push("/garasi/firsttimer");
      setModalOpen(false);
      setShowToast(true);
      setDataToast({
        type: "success",
        message: "Berhasil mengirim data kendaraan",
      });
      console.log("Form submitted successfully:", {
        email: formDetails.email.value,
        description: formDetails.description.value,
      });
    } else {
      console.log("Form validation failed");
    }
  };

  return {
    formDetails,
    handleDetailsChange,
    handleSubmit,
    isSubmitted,
  };
};

const MainBeritahuKamiContainer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <>
      <Toast />
      <MobileFormDetails {...useFormProps} />
    </>
  ) : // <DesktopFormDetails {...sharedProps} />
  null;
};

export default MainBeritahuKamiContainer;
