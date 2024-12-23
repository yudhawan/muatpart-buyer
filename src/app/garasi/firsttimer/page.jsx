"use client";

import { useState, useEffect } from "react";
import DesktopForm from "@/app/garasi/firsttimer/web";
import MobileForm from "@/app/garasi/firsttimer/mobile";
import toast from "@/store/toast";
import { modal } from "@/store/modal";
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import Toast from "@/components/Toast/Toast";
import { useSearchParams } from "next/navigation";
import SWRHandler from "@/services/useSWRHook";

const api = process.env.NEXT_PUBLIC_API_HASYIM;

export const useFormProps = () => {
  const [formState, setFormState] = useState({
    vehicle: { value: "", error: "", id: "" },
    brand: { value: "", error: "", id: "" },
    year: { value: "", error: "", id: "" },
    model: { value: "", error: "", id: "" },
    type: { value: "", error: "", id: "" },
  });

  // State untuk opsi dropdown
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setShowToast, setDataToast } = toast();
  const { setModalOpen } = modal();
  const isAdd = useSearchParams().get("isAdd");

  // SWR Hook untuk panggilan API
  const { useSWRHook } = new SWRHandler();

  // Ambil Tipe Kendaraan - Load Awal
  const { data: vehiclesData } = useSWRHook(
    api + "v1/muatparts/garasi/vehicle"
  );

  // Update opsi kendaraan saat data diambil
  useEffect(() => {
    if (vehiclesData?.Data) {
      setVehicleOptions(vehiclesData.Data);
    }
  }, [vehiclesData]);

  // Ambil Merek - dipicu saat kendaraan diklik
  const { data: brandsData, mutate: mutateBrands } = useSWRHook(
    formState.vehicle.id
      ? `${api}v1/muatparts/garasi/brand?vehicleID=${formState.vehicle.id}`
      : null
  );

  // Ambil Tahun - dipicu saat merek diklik
  const { data: yearsData, mutate: mutateYears } = useSWRHook(
    formState.brand.id
      ? `${api}v1/muatparts/garasi/years?brandID=${formState.brand.id}`
      : null
  );

  // Ambil Model - dipicu saat tahun diklik
  const { data: modelsData, mutate: mutateModels } = useSWRHook(
    formState.brand.id && formState.year.value
      ? `${api}v1/muatparts/garasi/model?brandID=${formState.brand.id}&year=${formState.year.value}`
      : null
  );

  // Ambil Tipe - dipicu saat model diklik
  const { data: typesData, mutate: mutateTypes } = useSWRHook(
    formState.model.id
      ? `${api}v1/muatparts/garasi/type?modelID=${formState.model.id}`
      : null
  );

  // Update opsi merek saat data diambil
  useEffect(() => {
    if (brandsData?.Data) {
      setBrandOptions(brandsData.Data);
      // Reset dropdown selanjutnya
      setFormState((prev) => ({
        ...prev,
        brand: { value: "", error: "", id: "" },
        year: { value: "", error: "", id: "" },
        model: { value: "", error: "", id: "" },
        type: { value: "", error: "", id: "" },
      }));
      setYearOptions([]);
      setModelOptions([]);
      setTypeOptions([]);
    }
  }, [brandsData]);

  // Update opsi tahun saat data diambil
  useEffect(() => {
    if (yearsData?.Data) {
      setYearOptions(
        yearsData.Data.map((year) => ({
          value: year.value.toString(), // Konversi ke string
          id: year.id.toString(), // Konversi ke string
        }))
      );
      // Reset dropdown selanjutnya
      setFormState((prev) => ({
        ...prev,
        year: { value: prev.year.value, error: "", id: "" },
        model: { value: "", error: "", id: "" },
        type: { value: "", error: "", id: "" },
      }));
      setModelOptions([]);
      setTypeOptions([]);
    }
  }, [yearsData]);

  // Update opsi model saat data diambil
  useEffect(() => {
    if (modelsData?.Data) {
      setModelOptions(modelsData.Data);
      // Reset dropdown selanjutnya
      setFormState((prev) => ({
        ...prev,
        model: { value: prev.model.value, error: "", id: "" },
        type: { value: "", error: "", id: "" },
      }));
      setTypeOptions([]);
    }
  }, [modelsData]);

  // Update opsi tipe saat data diambil
  useEffect(() => {
    if (typesData?.Data) {
      setTypeOptions(typesData.Data);
    }
  }, [typesData]);

  const handleChange = (key, value) => {
    let currentOptions = [];
    switch (key) {
      case "vehicle":
        currentOptions = vehicleOptions;
        break;
      case "brand":
        currentOptions = brandOptions;
        break;
      case "year":
        currentOptions = yearOptions;
        break;
      case "model":
        currentOptions = modelOptions;
        break;
      case "type":
        currentOptions = typeOptions;
        break;
      default:
        currentOptions = [];
    }

    const selectedOption = currentOptions.find(
      (option) => option.value === value
    );

    const updatedState = { ...formState };
    updatedState[key] = {
      value,
      error: "",
      id: selectedOption ? selectedOption.id : "",
    };

    setFormState(updatedState);
    setIsSubmitted(false);
  };

  // Fungsi untuk set data awal tanpa mereset field lain
  const setFormData = (data) => {
    setFormState({
      vehicle: { value: data.type, error: "", id: data.vehicleId || "" },
      brand: { value: data.brand, error: "", id: data.brandId || "" },
      year: { value: data.year, error: "", id: "" },
      model: { value: data.model, error: "", id: data.modelId || "" },
      type: { value: data.variant, error: "", id: data.variantId || "" },
    });
  };

  const handleSubmit = async (submitData) => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitted(true);

    try {
      let response;
      const newVehicle = {
        vehicleID: formState.vehicle.id,
        brandID: formState.brand.id,
        year: formState.year.id,
        modelID: formState.model.id,
        typeID: formState.type.id,
      };

      if (submitData.type === "edit") {
        // Edit
        const editUrl = `${api}v1/muatparts/garasi/update/${submitData.id}`;
        response = await fetch(editUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVehicle),
        });
      } else {
        // Create
        response = await fetch(`${api}v1/muatparts/garasi/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVehicle),
        });
      }

      if (response.ok) {
        setDataToast({
          message:
            submitData.type === "edit"
              ? "Kendaraan berhasil diubah"
              : "Kendaraan berhasil ditambahkan",
          type: "success",
        });
        setShowToast(true);
      } else {
        const error = await response.json();
        setDataToast({
          message: error.Message.Text,
          type: "error",
        });
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setDataToast({
        message: "Terjadi kesalahan saat menyimpan data",
        type: "error",
      });
      setShowToast(true);
    } finally {
      setIsSubmitted(false);
    }
  };

  const validateForm = () => {
    const updatedState = { ...formState };
    let isValid = true;

    Object.entries(formState).forEach(([key, field]) => {
      if (!field.value) {
        updatedState[key] = {
          ...field,
          error: `${key} harus diisi`,
        };
        isValid = false;
      }
    });

    setFormState(updatedState);
    return isValid;
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    validateForm,
    isSubmitted,
    setIsSubmitted,
    setFormData,
    vehicleOptions,
    brandOptions,
    yearOptions,
    modelOptions,
    typeOptions,
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
