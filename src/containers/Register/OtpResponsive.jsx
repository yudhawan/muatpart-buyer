import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import Image from "next/image";
import Button from "@/components/Button/Button";
// import headerZustand from "@/store/zustand/header" // nanti kalo di rdp

export function OtpResponsive() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(true); // nanti ganti false

    // const { setHeader } = headerZustand() // nanti kalo di rdp

    // nanti kalo di rdp
    // useEffect(() => {
    //   setHeader("")
    // }, [])

    useEffect(() => {
        let timerId;
        if (isTimerActive && timeLeft > 0) {
          timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
          }, 1000);
        } else if (isTimerActive && timeLeft === 0) {
          setIsTimerActive(false);
        }
        return () => {
          if (timerId) {
            clearTimeout(timerId);
          }
        };
      }, [timeLeft, isTimerActive]);

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex overflow-hidden flex-col items-center bg-primary-700 h-screen min-h-full">
            <Image
                src="/img/muatmuat.png"
                alt="muatmuat"
                width={120}
                height={21}
                className="mt-[26px]"
            />
            <Image
                src="/img/verification-responsive.png"
                alt="Verification illustration"
                width={109}
                height={118}
                className="mt-[37px]"
            />
            <div className="flex flex-col mt-5 items-center gap-y-[18px] max-w-[300px]">
                <span className="font-semibold text-[14px] leading-[16.8px] text-neutral-50 text-center">
                    Mohon cek pesan di email Anda untuk melanjutkan pendaftaran
                </span>
                <div className="flex flex-col gap-y-2 items-center">
                    <span className="font-semibold text-[14px] leading-[16.8px] text-neutral-50 text-center">
                        Kode OTP dikirim ke email
                    </span>
                    <div className="flex gap-x-4 items-center">
                        <span className="font-semibold text-[14px] leading-[16.8px] text-neutral-50">
                            nodas@nodas.com
                        </span>
                        <Button
                            color='primary_secondary'
                            onClick={() => {}}
                            // disabled={isTimerActive}
                            Class="px-6 h-8"
                        >
                            Ganti
                        </Button>
                    </div>
                </div>
                <OtpInput otp={otp} setOtp={setOtp} />
                <div className="bg-[#FFC217] p-2 rounded-md w-[328px] text-center font-medium text-[12px] leading-[14.4px]">
                    Jika pesan OTP tidak ditemukan mohon periksa folder{" "}
                    <span className="font-bold">spam</span>,{" "}
                    <span className="font-bold">sosial</span>, atau{" "}
                    <span className="font-bold">promosi</span> pada email Anda.
                </div>
                <div className="font-medium text-[12px] leading-[14.4px] max-w-[250px] text-neutral-50 text-center">
                    {`Kode OTP aktivasi akan berakhir dalam ${formatTime(timeLeft)}`}
                </div>
                <Button
                    name="resend"
                    color={isTimerActive ? 'primary_secondary' : 'warning'}
                    onClick={() => {}}
                    disabled={isTimerActive}
                    Class="px-[14px] h-[34px]"
                >
                    Kirim Ulang
                </Button>
            </div>
        </div>
    );
}