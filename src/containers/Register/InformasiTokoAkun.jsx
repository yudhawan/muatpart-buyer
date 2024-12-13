"use client";

import { useState, useEffect } from "react";
import LocationManagement from "@/components/LocationManagement/LocationManagement";
import RadioButton from "@/components/Radio/RadioButton";
import Input from "@/components/Input/Input";
import registerForm from "@/store/registerForm";

const InformasiTokoAkun = () => {
  const [typeRegister, setTypeRegister] = useState(0);
  const {
    formData,
    errors,
    currentStep,
    handleInputChange,
    validateStep,
    nextStep,
    prevStep,
  } = registerForm();

  useEffect(() => {
    console.log(formData, errors, " form zus");
  }, [formData, errors]);

  return (
    <>
      <span className="text-neutral-900 font-semibold text-lg block mb-4 mx-12">
        Informasi Toko
      </span>
      <div className="flex flex-col space-y-4 mx-12">
        <DivParticleRegister title="Tipe Toko" mustFill={false}>
          <div className="flex gap-[18px]">
            {Array(2)
              .fill()
              .map((_, idx) => {
                return (
                  <RadioButton
                    label={idx === 0 ? "Individu" : "Badan Usaha"}
                    name="tipe_toko"
                    checked={idx === typeRegister && true}
                    onClick={() => setTypeRegister(idx)}
                  />
                );
              })}
          </div>
        </DivParticleRegister>
        <DivParticleRegister title="Nama Toko">
          <Input
            status={`${errors.storeName && "error"}`}
            supportiveText={{
              title: `${errors.storeName ? errors.storeName : ""}`,
              desc: `${formData[0].storeName.length}/60`,
            }}
            placeholder="Masukkan Nama Toko"
            maxLength="60"
            value={formData[0].storeName}
            changeEvent={(e) => {
              let value = e.target.value;
              if (value.startsWith(" ")) {
                value = value.trimStart();
              }
              handleInputChange("storeName", value);
            }}
          />
        </DivParticleRegister>
      </div>
      <LocationManagement errors={errors} />
      <DivParticleRegister title="Email" classname="mx-12">
        <Input
          status={`${errors.email && "error"}`}
          supportiveText={{
            title: `${errors.email ? errors.email : ""}`,
          }}
          placeholder="Masukkan Email"
          maxLength="60"
          changeEvent={(e) => handleInputChange("email", e.target.value)}
        />
      </DivParticleRegister>
    </>
  );
};

export default InformasiTokoAkun;

export const DivParticleRegister = ({
  title,
  children,
  mustFill = true,
  classname,
}) => {
  return (
    <div className={`flex items-baseline ${classname}`}>
      <label className="w-1/3 text-neutral-600 font-medium text-xs">
        {title}
        {mustFill && "*"}
      </label>
      <div className="w-2/3">{children}</div>
    </div>
  );
};
