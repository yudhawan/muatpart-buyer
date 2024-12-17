import InformasiPendaftarDanRekeningResponsive from "@/containers/Register/InformasiPendaftarDanRekeningResponsive";
import { OtpResponsive } from "@/containers/Register/OtpResponsive";
import React, { useEffect } from "react";
import { useHeader } from "@/common/ResponsiveContext";
import { useRouter, useSearchParams } from "next/navigation";
import registerForm from "@/store/registerForm";
import InformasiTokoAkunResponsive from "@/containers/Register/InformasiTokoAkunResponsive";
import NavSelectedMobile from "@/components/Bottomsheet/NavSelectedMobile";
import Button from "@/components/Button/Button";
import NavbarCount from "@/components/NavbarCount/navbarCount";
import KonfirmasiDataResponsive from "@/containers/Register/KonfirmasiDataResponsive";

function RegisterResponsive({
  handleNext,
  isSubmitting,
  bankOptions,
  hasVerifiedLegality,
  hasVerifiedRekening,
  remainingTime,
  verifyOtp,
  errorVerifyOtp,
  expiresIn,
  resendOtp
}) {
  const { prevStep, formData, currentStep } = registerForm();
  const router = useRouter();
  const step = useSearchParams().get("step") || "1";

  const {
    appBarType, //pilih salah satu : 'titleSecondary' || 'searchSecondary' || 'navbarMobileDefaultScreen' || 'search' || 'title'
    appBar, // muncul ini : {onBack:null,title:'',showBackButton:true,appBarType:'',appBar:null,header:null}
    renderAppBarMobile, // untuk render komponen header mobile dengan memasukkanya ke useEffect atau by trigger function / closer
    setAppBar, // tambahkan payload seperti ini setAppBar({onBack:()=>setScreen('namaScreen'),title:'Title header',appBarType:'type'})
    handleBack, // dipanggil di dalam button di luar header, guna untuk kembali ke screen sebelumnya
    clearScreen, // reset appBar
    setScreen, // set screen
    screen, // get screen,
    search, // {placeholder:'muatparts',value:'',type:'text'}
    setSearch, // tambahkan payload seperti ini {placeholder:'Pencarian',value:'',type:'text'}
  } = useHeader();

  if (screen === "example")
    return (
      <div className=" flex flex-col">
        <p>Example</p>
        <button
          className="bg-primary-600"
          onClick={() => {
            setScreen("example2");
          }}
        >
          Go to Example 2
        </button>
      </div>
    );
  if (screen === "example3")
    return (
      <div className=" flex flex-col">
        <p>Example 3</p>
        <button
          className="bg-primary-600"
          onClick={() => setScreen("example4")}
        >
          Go to Example 4
        </button>
      </div>
    );

  const handleGoBack = () => {
    if (currentStep + 1 !== 1) {
      prevStep();
      router.push(`/register?step=${currentStep}`);
    }
  };

  useEffect(() => {
    setAppBar({
      title: "Daftar Menjadi Toko",
      appBarType: "title",
    });
  }, []);

  useEffect(() => {
    if (screen === "example2") {
      setAppBar({
        title: "Example 2",
        appBarType: "search",
        onBack: () => {
          setScreen("example");
          setAppBar({
            title: "Example",
            appBarType: "title",
            onBack: () => clearScreen(),
          });
        },
      });
      setSearch({
        placeholder: "Pencarian Example 2",
      });
    }
    if (screen === "example3") {
      setAppBar({
        title: "Example 3",
        appBarType: "titleSecondary",
        onBack: () => setScreen("example2"),
      });
    }
    if (screen === "example4") {
      setAppBar({
        title: "Example 4",
        appBarType: "searchSecondary",
        onBack: () => setScreen("example3"),
      });
      setSearch({
        placeholder: "Pencarian Example 4",
      });
    }
  }, [screen]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (step === "4")
    return (
      <OtpResponsive
        verifyOtp={verifyOtp}
        errorVerifyOtp={errorVerifyOtp}
        expiresIn={expiresIn}
        resendOtp={resendOtp}
        remainingTime={remainingTime}
      />
    );

  return (
    <>
      <NavbarCount
        classname="w-full fixed top-[6px] left-0"
        title="Daftar Menjadi Toko"
        subtitle={
          currentStep + 1 === 1
            ? "Informasi Toko & Akun"
            : currentStep + 1 === 2
            ? "Informasi Pendaftar & Rekening"
            : "Konfirmasi Data"
        }
        count="3"
        active={currentStep + 1}
        backAction={() => console.log("ngale")}
      />
      <div>
        {/* <button
        className="bg-primary-600"
        onClick={() => {
          setScreen("example");
          setAppBar({
            title: "Example",
            appBarType: "title",
            onBack: () => clearScreen(),
          });
        }}
      >
        To example Screen
      </button>
      <p>register Responsive</p> */}
        {currentStep + 1 === 1 && <InformasiTokoAkunResponsive />}
        {currentStep + 1 === 2 && (
          <InformasiPendaftarDanRekeningResponsive
            bankOptions={bankOptions}
            hasVerifiedLegality={hasVerifiedLegality}
            hasVerifiedRekening={hasVerifiedRekening}
          />
        )}
        {currentStep + 1 === 3 && <KonfirmasiDataResponsive />}
      </div>
      <NavSelectedMobile classname="left-0 flex items-center gap-2 justify-end">
        {currentStep + 1 !== 1 && (
          <Button
            color="primary_secondary"
            Class={` ${
              currentStep + 1 === 1 ? "!min-w-[160px]" : "!min-w-[50%]"
            } !h-8 !font-semibold !text-xs`}
            onClick={handleGoBack}
          >
            Kembali
          </Button>
        )}

        <Button
          Class={` ${
            currentStep + 1 === 1 ? "!min-w-[160px]" : "!min-w-[50%]"
          } !h-8 !font-semibold !text-xs`}
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Loading..."
            : currentStep + 1 === 3
            ? "Daftar"
            : "Selanjutnya"}
        </Button>
      </NavSelectedMobile>
    </>
  );
}

export default RegisterResponsive;
