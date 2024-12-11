"use client";

import { useState, useEffect } from "react";
import { Dropdown, Card, vehicleData } from "@/app/garasi/page";
import Button from "@/components/Button/Button";
import { useFormProps } from "./page";
import { useFormProps as UFPberitahukami } from "@/app/garasi/beritahukami/page";
import { BeritahuKamiWeb } from "../beritahukami/web";
import { modal } from "@/store/modal";

const Web = ({ formState, handleChange, handleSubmit, isSubmitted }) => {
  // State untuk menyimpan dropdown mana yang error dan pesannya
  const [currentError, setCurrentError] = useState({ field: "", message: "" });

  const getDependencyMessage = (config) => {
    switch (config.key) {
      case "brand":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : "";
      case "year":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : !formState.brand.value
          ? "Pilih brand terlebih dahulu"
          : "";
      case "model":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : !formState.brand.value
          ? "Pilih brand terlebih dahulu"
          : !formState.year.value
          ? "Pilih tahun terlebih dahulu"
          : "";
      case "type":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : !formState.brand.value
          ? "Pilih brand terlebih dahulu"
          : !formState.year.value
          ? "Pilih tahun terlebih dahulu"
          : !formState.model.value
          ? "Pilih model terlebih dahulu"
          : "";
      default:
        return "";
    }
  };

  const dropdownsConfig = [
    {
      key: "vehicle",
      label: "Pilih Kendaraan",
      options: Object.keys(vehicleData),
    },
    {
      key: "brand",
      label: "Pilih Brand",
      options: formState.vehicle.value
        ? Object.keys(vehicleData[formState.vehicle.value].brands)
        : [],
    },
    {
      key: "year",
      label: "Pilih Tahun",
      options: formState.brand.value
        ? Object.keys(
            vehicleData[formState.vehicle.value].brands[formState.brand.value]
              .years
          )
        : [],
    },
    {
      key: "model",
      label: "Pilih Model",
      options: formState.year.value
        ? Object.keys(
            vehicleData[formState.vehicle.value].brands[formState.brand.value]
              .years[formState.year.value].models
          )
        : [],
    },
    {
      key: "type",
      label: "Pilih Tipe",
      options: formState.model.value
        ? vehicleData[formState.vehicle.value].brands[formState.brand.value]
            .years[formState.year.value].models[formState.model.value].types
        : [],
    },
  ];

  // Tambah fungsi untuk handle onClick dropdown
  const handleDropdownClick = (config) => {
    const dependencyMessage = getDependencyMessage(config);
    if (dependencyMessage) {
      setCurrentError({ field: config.key, message: dependencyMessage });
      return false; // Return false untuk mencegah dropdown terbuka
    }
    setCurrentError({ field: "", message: "" });
    return true; // Return true jika boleh dibuka
  };

  useEffect(() => {
    setCurrentError({ field: "", message: "" });
  }, [formState]);

  return (
    <>
      <span className="capitalize font-bold text-xl px-10">garasi saya</span>
      <div className="py-6 px-[100px] space-y-6 w-full">
        <Card classname="flex flex-col p-6 !border-none shadow-muat">
          <span className="capitalize font-bold text-lg">
            data kendaraan saya
          </span>
          <span className="font-semibold text-xs mt-4">
            Tambahkan informasi kendaraan kamu untuk menemukan suku cadang dan
            aksesori yang sesuai secara tepat
          </span>
          <div className="flex flex-col mt-6">
            <div className="flex justify-between gap-3">
              {dropdownsConfig.map((config) => (
                <div key={config.key} className="flex flex-col w-[165px]">
                  <Dropdown
                    withSearch={config.key === "year" ? false : true}
                    label={config.label}
                    value={formState[config.key].value}
                    onChange={(value) => handleChange(config.key, value)}
                    options={config.options}
                    error={
                      (isSubmitted && !formState[config.key].value) ||
                      currentError.field === config.key
                    }
                    onBeforeOpen={() => handleDropdownClick(config)}
                  />
                  {currentError.field === config.key && (
                    <span className="text-xs font-medium text-error-400 mt-0">
                      {currentError.message}
                    </span>
                  )}
                  {isSubmitted &&
                    !formState[config.key].value &&
                    !currentError.message && (
                      <span className="text-xs font-medium text-error-400 mt-0">
                        {config.label.split(" ")[1]} wajib diisi
                      </span>
                    )}
                </div>
              ))}

              <Button
                Class="!min-w-[112px] !h-8 !font-semibold"
                onClick={handleSubmit}
              >
                Tambah
              </Button>
            </div>
          </div>

          <span
            className={`font-semibold text-xs ${
              isSubmitted ? "mt-8" : "mt-6"
            } text-neutral-600`}
          >
            Tidak menemukan kendaraan kamu di sini?{" "}
            <span className="!text-primary-700 cursor-pointer">
              Beritahu kami
            </span>
          </span>
        </Card>
      </div>
    </>
  );
};

export default Web;

export const WebModal = ({ mode = "add", initialData = null }) => {
  const { formState, handleChange, handleSubmit, isSubmitted, setFormData } =
    useFormProps();
  const [currentError, setCurrentError] = useState({ field: "", message: "" });
  const { setModalOpen, setModalContent, setModalConfig } = modal();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData); // Gunakan fungsi baru
    }
  }, [mode, initialData]);

  const renderLabel = (config, index) => (
    <div className="flex items-center gap-2">
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold
      ${
        formState[config.key].value
          ? "bg-primary-600 text-white"
          : "bg-neutral-700 text-white"
      }`}
      >
        {index + 1}
      </span>
      <span className="truncate w-[105px] text-left">
        {formState[config.key].value || config.label}
      </span>
    </div>
  );

  const getDependencyMessage = (config) => {
    switch (config.key) {
      case "brand":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : "";
      case "year":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : !formState.brand.value
          ? "Pilih brand terlebih dahulu"
          : "";
      case "model":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : !formState.brand.value
          ? "Pilih brand terlebih dahulu"
          : !formState.year.value
          ? "Pilih tahun terlebih dahulu"
          : "";
      case "type":
        return !formState.vehicle.value
          ? "Pilih kendaraan terlebih dahulu"
          : !formState.brand.value
          ? "Pilih brand terlebih dahulu"
          : !formState.year.value
          ? "Pilih tahun terlebih dahulu"
          : !formState.model.value
          ? "Pilih model terlebih dahulu"
          : "";
      default:
        return "";
    }
  };

  const dropdownsConfig = [
    {
      key: "vehicle",
      label: "Pilih Kendaraan",
      options: Object.keys(vehicleData),
      col: "full", // tambah properti untuk menandai full width atau tidak
    },
    {
      key: "brand",
      label: "Pilih Brand",
      options: formState.vehicle.value
        ? Object.keys(vehicleData[formState.vehicle.value].brands)
        : [],
      col: "half",
    },
    {
      key: "year",
      label: "Pilih Tahun",
      options: formState.brand.value
        ? Object.keys(
            vehicleData[formState.vehicle.value].brands[formState.brand.value]
              .years
          )
        : [],
      col: "half",
    },
    {
      key: "model",
      label: "Pilih Model",
      options: formState.year.value
        ? Object.keys(
            vehicleData[formState.vehicle.value].brands[formState.brand.value]
              .years[formState.year.value].models
          )
        : [],
      col: "half",
    },
    {
      key: "type",
      label: "Pilih Tipe",
      options: formState.model.value
        ? vehicleData[formState.vehicle.value].brands[formState.brand.value]
            .years[formState.year.value].models[formState.model.value].types
        : [],
      col: "half",
    },
  ];

  // Tambah fungsi untuk handle onClick dropdown
  const handleDropdownClick = (config) => {
    const dependencyMessage = getDependencyMessage(config);
    if (dependencyMessage) {
      setCurrentError({ field: config.key, message: dependencyMessage });
      return false; // Return false untuk mencegah dropdown terbuka
    }
    setCurrentError({ field: "", message: "" });
    return true; // Return true jika boleh dibuka
  };

  const renderDropdowns = () => {
    // Filter untuk dropdown full width (Kendaraan)
    const fullWidthDropdowns = dropdownsConfig.filter(
      (config) => config.col === "full"
    );
    // Filter untuk dropdown setengah width
    const halfWidthDropdowns = dropdownsConfig.filter(
      (config) => config.col === "half"
    );

    return (
      <div className="space-y-4">
        {fullWidthDropdowns.map((config, index) => (
          <div key={config.key}>
            <Dropdown
              withSearch
              customLabel={renderLabel(config, index)}
              value={formState[config.key].value}
              onChange={(value) => handleChange(config.key, value)}
              options={config.options}
              error={
                (isSubmitted && !formState[config.key].value) ||
                currentError.field === config.key
              }
              onBeforeOpen={() => handleDropdownClick(config)}
              classname="!w-full"
            />
            {/* Tambahkan kembali error message */}
            {currentError.field === config.key && (
              <span className="text-xs font-medium text-error-400 mt-0">
                {currentError.message}
              </span>
            )}
            {isSubmitted &&
              !formState[config.key].value &&
              !currentError.message && (
                <span className="text-xs font-medium text-error-400 mt-0">
                  {config.label.split(" ")[1]} wajib dipilih
                </span>
              )}
          </div>
        ))}

        {/* Half width dropdowns grid */}
        <div className="grid grid-cols-2 gap-4">
          {halfWidthDropdowns.map((config, index) => (
            <div key={config.key}>
              <Dropdown
                withSearch={config.key === 'year' ? false : true}
                customLabel={renderLabel(
                  config,
                  fullWidthDropdowns.length + index
                )}
                value={formState[config.key].value}
                onChange={(value) => handleChange(config.key, value)}
                options={config.options}
                error={
                  (isSubmitted && !formState[config.key].value) ||
                  currentError.field === config.key
                }
                onBeforeOpen={() => handleDropdownClick(config)}
                classname="!w-full"
              />
              {/* Tambahkan kembali error message */}
              {currentError.field === config.key && (
                <span className="text-xs font-medium text-error-400 mt-0">
                  {currentError.message}
                </span>
              )}
              {isSubmitted &&
                !formState[config.key].value &&
                !currentError.message && (
                  <span className="text-xs font-medium text-error-400 mt-0">
                    {config.label.split(" ")[1]} wajib dipilih
                  </span>
                )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleFormSubmit = () => {
    if (mode === "edit") {
      handleSubmit({
        type: "edit",
        oldData: initialData,
        newData: formState,
      });
    } else {
      handleSubmit({
        type: "add",
        newData: formState,
      });
    }
  };

  useEffect(() => {
    setCurrentError({ field: "", message: "" });
  }, [formState]);

  return (
    <div className="mx-auto py-8 px-[45px]">
      <h1 className="text-lg font-bold mb-4 mx-auto text-center">
        {mode === "edit" ? "Ubah Kendaraan" : "Tambah Kendaraan"}
      </h1>
      <div className="space-y-4">
        {renderDropdowns()}

        <Button
          onClick={handleFormSubmit}
          Class="!mx-auto !h-8 !font-semibold !text-sm"
        >
          Simpan
        </Button>

        <div className="text-center text-sm">
          <span className="text-neutral-600 font-semibold text-xs">
            Tidak menemukan kendaraan kamu di sini?{" "}
            <a
              onClick={() => {
                setModalOpen(false);
                setModalContent(<BeritahuKamiWeb {...UFPberitahukami} />);
                setModalOpen(true);
                setModalConfig({
                  width: 471,
                  height: 291,
                  classname: "!w-[471px] !h-fit",
                  withHeader: false,
                  withClose: true,
                });
              }}
              className="text-primary-700 font-medium cursor-pointer"
            >
              Beritahu kami
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
