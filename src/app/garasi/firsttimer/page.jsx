"use client";

import { useState, useEffect } from "react";
import DesktopForm from "@/app/garasi/firsttimer/web";
import MobileForm from "@/app/garasi/firsttimer/mobile";
import toast from "@/store/toast";
import { modal } from "@/store/modal";
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import Toast from "@/components/Toast/Toast";
import { useSearchParams } from "next/navigation";

export const useFormProps = () => {
  const [formState, setFormState] = useState({
    vehicle: { value: "", error: "" },
    brand: { value: "", error: "" },
    year: { value: "", error: "" },
    model: { value: "", error: "" },
    type: { value: "", error: "" },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setShowToast, setDataToast } = toast();
  const { setModalOpen } = modal();
  const isAdd = useSearchParams().get("isAdd");

  // Fungsi handleChange normal untuk interaksi user
  const handleChange = (key, value) => {
    const updatedState = { ...formState };
    const keys = Object.keys(formState);
    const currentIndex = keys.indexOf(key);

    keys.forEach((k, index) => {
      if (index === currentIndex) {
        updatedState[k] = { value, error: "" };
      } else if (index > currentIndex) {
        updatedState[k] = { value: "", error: "" };
      }
    });

    setFormState(updatedState);
    setIsSubmitted(false);
  };

  // Fungsi khusus untuk set initial data tanpa reset field lain
  const setFormData = (data) => {
    setFormState({
      vehicle: { value: data.type, error: "" },
      brand: { value: data.brand, error: "" },
      year: { value: data.year, error: "" },
      model: { value: data.model, error: "" },
      type: { value: data.variant, error: "" },
    });
  };

  const handleSubmit = (submitData) => {
    setIsSubmitted(true);
    if (validateForm()) {
      const newVehicle = {
        type: formState.vehicle.value,
        brand: formState.brand.value,
        year: formState.year.value,
        model: formState.model.value,
        variant: formState.type.value,
      };

      if (submitData.type === "edit") {
        // Validasi untuk edit
        const existingVehicles = [
          {
            type: "Mobil",
            brand: "Toyota",
            year: "2023",
            model: "Innova",
            variant: "2.0 G",
          },
        ];

        const hasSameType = existingVehicles.some(
          (vehicle) =>
            vehicle.type.toLowerCase() === newVehicle.type.toLowerCase() &&
            vehicle !== submitData.oldData
        );

        if (hasSameType) {
          setDataToast({
            message:
              "Kamu sudah memiliki kendaraan jenis ini, silahkan pilih jenis kendaraan lainnya",
            type: "error",
          });
          setShowToast(true);
          return;
        }

        // Sukses edit
        setDataToast({
          message: "Kendaraan berhasil diubah", // Pesan untuk edit
          type: "success",
        });
      } else {
        // Validasi untuk tambah
        const existingVehicles = [
          {
            type: "Mobil",
            brand: "Toyota",
            year: "2023",
            model: "Innova",
            variant: "2.0 G",
          },
        ];

        const hasSameType = existingVehicles.some(
          (vehicle) =>
            vehicle.type.toLowerCase() === newVehicle.type.toLowerCase()
        );

        if (hasSameType) {
          setDataToast({
            message:
              "Kamu sudah memiliki kendaraan jenis ini, silahkan pilih jenis kendaraan lainnya",
            type: "error",
          });
          setShowToast(true);
          return;
        }

        // Sukses tambah
        setDataToast({
          message: `Berhasil menyimpan data kendaraan ${
            isAdd && " BKN FIRSTTIMER"
          }`, // Pesan untuk tambah
          type: "success",
        });
      }

      setModalOpen(false);
      setShowToast(true);
      // alert(
      //   "Data berhasil disubmit: \n" +
      //     Object.entries(formState)
      //       .map(([key, field]) => `${key}: ${field.value}`)
      //       .join("\n")
      // );
    }
  };

  const validateForm = () => {
    // Reset all errors first
    const updatedState = { ...formState };
    Object.keys(formState).forEach((key) => {
      updatedState[key] = {
        value: formState[key].value,
        error: "",
      };
    });

    // Check fields in order
    const fieldOrder = ["vehicle", "brand", "year", "model", "type"];

    // Find first empty field
    const firstEmptyField = fieldOrder.find((key) => !formState[key].value);

    if (firstEmptyField) {
      // Set error only for the first empty field
      updatedState[firstEmptyField] = {
        value: formState[firstEmptyField].value,
        error: true, // Just use boolean instead of string
      };
      setFormState(updatedState);
      return false;
    }

    setFormState(updatedState);
    return true;
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    validateForm,
    isSubmitted,
    setIsSubmitted,
    setFormData,
  };
};

const MainGarasiFirstTime = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { dataBottomsheet } = toast();
  const formProps = useFormProps();

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
      <Bottomsheet>{dataBottomsheet}</Bottomsheet>
      <Toast />
      <MobileForm {...formProps} />
    </>
  ) : (
    <DesktopForm {...formProps} />
  );
};

export default MainGarasiFirstTime;
