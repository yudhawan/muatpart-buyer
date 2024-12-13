"use client";

import { useEffect } from "react";
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import IconComponent from "@/components/IconComponent/IconComponent";
import InformasiPendaftarDanRekening from "@/containers/Register/InformasiPendaftarDanRekening";
import InformasiTokoAkun from "@/containers/Register/InformasiTokoAkun";
import { useRouter, useSearchParams } from "next/navigation";
import registerForm from "@/store/registerForm";

function RegisterWeb() {
  const router = useRouter();
  const step = useSearchParams().get("step") || "1";

  const { currentStep, nextStep, prevStep, errors, formData } = registerForm();

  useEffect(() => {
    console.log(currentStep, nextStep, prevStep, " TERSUBMIT");
  }, [currentStep, nextStep, prevStep]);

  const breadCrumbItems = [
    "Informasi Toko Akun",
    "Informasi Pendaftar dan Rekening",
    "Konfirmasi Data",
  ];

  const handleSubmit = () => {
    console.log("awww ", errors, formData);
    return nextStep;
    router.push(`/register?step=${Number(step) + 1}`);
  };

  const handleGoBack = () => router.push(`/register?step=${Number(step) - 1}`);

  return (
    <div>
      <div className="max-w-[758px] mx-auto mt-[108px] mb-5">
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
          <div className="px-8 py-6">
            <div className="flex">
              <IconComponent
                src="/icons/blue-arrow-left.svg"
                size="medium"
                onclick={step !== "1" ? handleGoBack : null}
              />
              <div className="flex flex-col flex-1 gap-4 ml-8 items-center">
                <span className="text-[20px] leading-[24px] font-bold">
                  Daftar menjadi Penjual muatparts Mart
                </span>
                <BreadCrumb
                  data={breadCrumbItems.slice(0, step)}
                  maxWidth="188"
                />
              </div>
            </div>
            {step === "1" ? <InformasiTokoAkun /> : null}
            {step === "2" ? <InformasiPendaftarDanRekening /> : null}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button name="next" color="primary" onClick={nextStep}>
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterWeb;
