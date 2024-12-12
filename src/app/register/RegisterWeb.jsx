"use client";

import { useSearchParams, useRouter } from "next/navigation";
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import IconComponent from "@/components/IconComponent/IconComponent";
import InformasiTokoAkun from "@/containers/Register/InformasiTokoAkun";
import InformasiPendaftarDanRekening from "@/containers/Register/InformasiPendaftarDanRekening";
import KonfirmasiData from "@/containers/Register/KonfirmasiData";

const BREADCRUMB_ITEMS = [
  "Informasi Toko Akun",
  "Informasi Pendaftar dan Rekening",
  "Konfirmasi Data",
];

function RegisterWeb({ handleNext, isSubmitting }) {
  const router = useRouter();
  const step = useSearchParams().get("step") || "1";

  const handleGoBack = () =>
    step !== "1" && router.push(`/register?step=${Number(step) - 1}`);

  return (
    <div className="max-w-[758px] mx-auto mt-[108px] mb-5">
      <div className="bg-white rounded-[10px] border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="px-8 py-6">
          <div className="flex">
            <IconComponent
              src="/icons/blue-arrow-left.svg"
              size="medium"
              onclick={handleGoBack}
            />
            <div className="flex flex-col flex-1 gap-4 ml-8 items-center">
              <span className="text-[20px] leading-[24px] font-bold">
                Daftar menjadi Penjual muatparts Mart
              </span>
              <BreadCrumb
                data={BREADCRUMB_ITEMS.slice(0, step)}
                maxWidth="188"
              />
            </div>
          </div>

          {step === "1" && <InformasiTokoAkun />}
          {step === "2" && <InformasiPendaftarDanRekening />}
          {step === "3" && <KonfirmasiData />}
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
  );
}

export default RegisterWeb;
