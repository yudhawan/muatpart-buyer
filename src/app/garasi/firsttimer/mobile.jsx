"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import toast from "@/store/toast";
import { ButtonSubmitMobileNav, vehicleData } from "@/app/garasi/page";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { useHeader } from "@/common/ResponsiveContext";

const BottomsheetContent = ({ options, onSelect, label }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search Input */}
      <div className="pt-2 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-900" />
          <input
            type="text"
            className="w-full pl-10 py-2.5 border border-neutral-600 text-neutral-900 text-sm font-medium rounded-lg focus:outline-none"
            placeholder={`Cari ${label}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Options List */}
      <div className="flex-1 overflow-y-auto">
        {filteredOptions.map((option, index) => (
          <div key={option}>
            <button
              onClick={() => onSelect(option)}
              className="w-full py-3.5 text-left text-neutral-900 text-sm font-semibold hover:bg-gray-50 focus:outline-none"
            >
              {option}
            </button>
            {index < filteredOptions.length - 1 && (
              <div className="border-b border-neutral-400" />
            )}
          </div>
        ))}
        {filteredOptions.length === 0 && (
          <div className="px-4 py-2 text-neutral-900 text-sm text-center">
            Data Tidak Ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

const Mobile = ({
  formState,
  handleChange,
  handleSubmit,
  isSubmitted,
  setIsSubmitted,
}) => {
  const {
    setShowToast,
    setDataToast,
    setShowBottomsheet,
    setDataBottomsheet,
    setTitleBottomsheet,
  } = toast();
  const { setAppBar } = useHeader();
  // untuk pembeda form tambah firsttimer dan tidak. isAdd === true berarti bukan firsttimer
  const isAdd = useSearchParams().get("isAdd");

  const [currentError, setCurrentError] = useState({ field: "", message: "" });

  // Update handleOpenBottomsheet function
  const handleOpenBottomsheet = (config) => {
    const fieldOrder = ["vehicle", "brand", "year", "model", "type"];
    const fieldNames = {
      vehicle: "Kendaraan",
      brand: "Brand",
      year: "Tahun",
      model: "Model",
      type: "Tipe",
    };

    const currentIndex = fieldOrder.indexOf(config.key);
    let errorField = "";
    let errorMessage = "";

    // Reset isSubmitted to clear previous submit errors
    setIsSubmitted(false);

    // Check prerequisites in sequence
    for (let i = 0; i < currentIndex; i++) {
      const prerequisiteField = fieldOrder[i];
      if (!formState[prerequisiteField].value) {
        errorField = config.key;
        errorMessage = `Pilih ${fieldNames[prerequisiteField]} terlebih dahulu`;
        break;
      }
    }

    // Reset current error state
    setCurrentError({ field: "", message: "" });

    // Set new error if found
    if (errorMessage) {
      setCurrentError({ field: errorField, message: errorMessage });
      return;
    }

    setTitleBottomsheet(config.label);
    setDataBottomsheet(
      <BottomsheetContent
        options={config.options}
        onSelect={(value) => {
          handleChange(config.key, value);
          setShowBottomsheet(false);
        }}
        label={config.label}
      />
    );
    setShowBottomsheet(true);
  };

  const renderLabel = (config) => (
    <div className="flex items-center gap-2">
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold
          ${
            formState[config.key].value
              ? "bg-primary-600 text-white"
              : "bg-neutral-700 text-white"
          }`}
      >
        {config.step}
      </span>
      <span
        className={`flex-1 text-left
          ${
            !formState[config.key].value ? "text-gray-500" : "text-neutral-900"
          }`}
      >
        {formState[config.key].value || config.label}
      </span>
    </div>
  );

  const dropdownsConfig = [
    {
      key: "vehicle",
      label: "Pilih Kendaraan",
      options: Object.keys(vehicleData),
      disabled: false,
      step: 1,
    },
    {
      key: "brand",
      label: "Pilih Brand",
      options: formState.vehicle.value
        ? Object.keys(vehicleData[formState.vehicle.value].brands)
        : [],
      disabled: !formState.vehicle.value,
      step: 2,
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
      disabled: !formState.brand.value,
      step: 3,
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
      disabled: !formState.year.value,
      step: 4,
    },
    {
      key: "type",
      label: "Pilih Tipe",
      options: formState.model.value
        ? vehicleData[formState.vehicle.value].brands[formState.brand.value]
            .years[formState.year.value].models[formState.model.value].types
        : [],
      disabled: !formState.model.value,
      step: 5,
    },
  ];

  // Clear error saat value berubah
  useEffect(() => {
    setCurrentError({ field: "", message: "" });
  }, [formState]);

  useEffect(() => {
    setAppBar({
      title: isAdd ? "Tambah Kendaraan" : "Garasi Saya",
      appBarType: "title",
    });
  }, []);

  return (
    <>
      {!isAdd && (
        <div className="mb-8 text-neutral-900">
          <h1 className="text-base font-bold mb-2">Data Kendaraan Saya</h1>
          <p className="text-sm font-medium">
            Tambahkan informasi Jenis Kendaraan kamu untuk menemukan suku cadang
            dan aksesori yang sesuai secara tepat
          </p>
        </div>
      )}
      <div className="space-y-4">
        {dropdownsConfig.map((config) => (
          <div key={config.key} className="relative">
            <button
              onClick={() => handleOpenBottomsheet(config)}
              className={`w-full p-3 bg-white flex items-center border rounded-lg text-sm font-medium cursor-pointer justify-between
        ${
          (formState[config.key].error && !currentError.field) ||
          currentError.field === config.key
            ? "border-error-400"
            : "border-neutral-600"
        }`}
            >
              {renderLabel(config)}
              <ChevronDown className="h-5 w-5 text-gray-400 ml-2" />
            </button>

            {/* Show dependency error (from dropdown click) */}
            {currentError.field === config.key && (
              <p className="mt-1 text-xs font-medium text-error-400">
                {currentError.message}
              </p>
            )}
            {/* Show validation error (from submit) */}
            {formState[config.key].error && !currentError.field && (
              <p className="mt-1 text-xs font-medium text-error-400">
                {`${config.label.split(" ")[1]} wajib diisi`}
              </p>
            )}
          </div>
        ))}

        <div className="mt-8">
          <div className="mt-4 text-center text-sm">
            <p className="text-neutral-900 font-medium">
              Tidak menemukan Jenis Kendaraan kamu di sini?{" "}
              <Link
                href="/garasi/beritahukami"
                className="!text-primary-700 font-semibold"
              >
                Beritahu kami
              </Link>
            </p>
          </div>
        </div>

        <ButtonSubmitMobileNav
          title="Simpan"
          onclick={() =>
            handleSubmit({
              type: "add",
            })
          }
        />
      </div>
    </>
  );
};

export default Mobile;
