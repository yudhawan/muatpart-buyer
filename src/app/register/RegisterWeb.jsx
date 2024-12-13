"use client";

import { useSearchParams, useRouter } from "next/navigation";
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import IconComponent from "@/components/IconComponent/IconComponent";
import InformasiTokoAkun from "@/containers/Register/InformasiTokoAkun";
import Otp from "@/containers/Register/Otp";
import InformasiPendaftarDanRekening from "@/containers/Register/InformasiPendaftarDanRekening";

function RegisterWeb({
  handleNext,
  isSubmitting,
  bankOptions,
  hasVerifiedLegality,
  hasVerifiedRekening
}) {
  const router = useRouter();
  const step = useSearchParams().get("step") || "1";

  const BREADCRUMB_ITEMS = [
    "Informasi Toko Akun",
    "Informasi Pendaftar dan Rekening",
    "Konfirmasi Data",
  ];

  const handleGoBack = () =>
    step !== "1" && router.push(`/register?step=${Number(step) - 1}`);

  return (
    <div>
      {step === "4" ? <Otp /> : (
        <div className="max-w-[758px] mx-auto mt-[108px] pb-5">
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-muat">
            <div className="px-8 py-6">
              <div className="flex">
                <IconComponent
                  src='/icons/blue-arrow-left.svg'
                  size='medium'
                  onclick={step !== "1" ? handleGoBack : null}
                />
                <div className="flex flex-col flex-1 gap-y-3 ml-8 items-center">
                  <span className="text-[20px] leading-[24px] font-bold">
                    Daftar menjadi Penjual muatparts
                  </span>
                  <BreadCrumb
                    data={BREADCRUMB_ITEMS.slice(0, step)}
                    maxWidth="188"
                    onclick={(val) => {
                      const index = BREADCRUMB_ITEMS.findIndex(item => item === val)
                      router.push(`/register?step=${Number(index)+1}`)
                    }}
                  />
                </div>
              </div>
              {step === "1" ? <InformasiTokoAkun /> : null}
              {step === "2" ? (
                <InformasiPendaftarDanRekening
                  bankOptions={bankOptions}
                  hasVerifiedLegality={hasVerifiedLegality}
                  hasVerifiedRekening={hasVerifiedRekening}
                /> 
              ) : null}
              
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              name="next"
              color="primary"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Selanjutnya"}
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default RegisterWeb;
