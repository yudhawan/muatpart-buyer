
'use client';

import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import IconComponent from "@/components/IconComponent/IconComponent";
import InformasiPendaftarDanRekening from "@/containers/Register/InformasiPendaftarDanRekening";
import InformasiTokoAkun from "@/containers/Register/InformasiTokoAkun";
import Otp from "@/containers/Register/Otp";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterWeb({
  bankOptions
}) {
  const router = useRouter()
  const step = useSearchParams().get("step") || "1";

  const breadCrumbItems = ["Informasi Toko Akun", "Informasi Pendaftar dan Rekening", "Konfirmasi Data"]

  const handleSubmit = () => router.push(`/register?step=${Number(step)+1}`)

  const handleGoBack = () => router.push(`/register?step=${Number(step)-1}`)

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
                <div className="flex flex-col flex-1 gap-4 ml-8 items-center">
                  <span className="text-[20px] leading-[24px] font-bold">
                    Daftar menjadi Penjual muatparts
                  </span>
                  <BreadCrumb
                    data={breadCrumbItems.slice(0, step)}
                    maxWidth="188"
                    onclick={(val) => {
                      const index = breadCrumbItems.findIndex(item => item === val)
                      router.push(`/register?step=${Number(index)+1}`)
                    }}
                  />
                </div>
              </div>
              {step === "1" ? <InformasiTokoAkun /> : null}
              {step === "2" ? <InformasiPendaftarDanRekening bankOptions={bankOptions} /> : null}
              
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              name="next"
              color="primary"
              onClick={handleSubmit}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default RegisterWeb;
  