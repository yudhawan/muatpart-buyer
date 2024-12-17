import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import Image from "next/image";
import Button from "@/components/Button/Button";
import registerForm from "@/store/registerForm";
import UpdateEmailModal from "./UpdateEmailModal";
import toast from "@/store/toast";
import Toast from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";
import { modal } from "@/store/modal";
// import headerZustand from "@/store/zustand/header" // nanti kalo di rdp

const DoneVerifyOtpModal = () => {
    const { setModalOpen, setModalContent, setModalConfig } = modal();
    const router = useRouter()
    return (
        <div className="flex flex-col">
            <span className="font-bold text-[16px] leading-[19.2px]">
                Tinggal selangkah lagi untuk mulai berjualan!
            </span>
            <span className="mt-4 font-medium text-[14px] leading-[16.8px]">
                Tinggal selangkah lagi untuk mulai berjualan!
            </span>
            <div className="flex gap-x-3">
                <Button
                    color="primary_secondary"
                    Class="px-6 h-8"
                    onClick={() => setModalOpen(false)}
                >
                    Nanti
                </Button>
                <Button
                    color="primary"
                    Class="px-6 h-8"
                    onClick={() => {
                        router.push("/garasi") // sementara, nanti diganti
                        // router.push("/kelolaproduk/daftarproduk") nanti dganti ini
                    }}
                >
                    Tambah Produk
                </Button>
            </div>
        </div>
    )
}

export function OtpResponsive({
    remainingTime,
    verifyOtp,
    errorVerifyOtp,
    expiresIn,
    resendOtp
}) {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(true); // nanti ganti false
    const router = useRouter()
    const {
        formData,
    } = registerForm();
    const { setShowToast, setDataToast } = toast();
    const { setModalOpen, setModalContent, setModalConfig } = modal();

    // const { setHeader } = headerZustand() // nanti kalo di rdp

    // nanti kalo di rdp
    // useEffect(() => {
    //   setHeader("")
    // }, [])

    // set error
    useEffect(() => {
        if (errorVerifyOtp) {
            const message = errorVerifyOtp.response.data.Data.Message
            const type = "error"
            setShowToast(true)
            setDataToast({
                message,
                type
            });
        }
    }, [JSON.stringify(errorVerifyOtp)])

    useEffect(() => {
        if (remainingTime) {
            setTimeLeft(remainingTime)
            setIsTimerActive(true)
        }
    }, [remainingTime])

    useEffect(() => {
        if (expiresIn) {
            setTimeLeft(expiresIn)
            setIsTimerActive(true)
            setShowToast(true)
            setDataToast({
                message: "Berhasil mengirim ulang OTP",
                type: "success",
            });
        }
    }, [expiresIn])

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

    // Handle OTP completion
    useEffect(() => {
        const handleVerifyOtp = async () => {
            await verifyOtp({ 
                Email: formData[0].email,
                // Email: "wewdsd@yopmail.com",
                Otp: otp.join(""),
                // Role: 5,
                // SuperMenuID: 6 
            })
                .then(() => {
                    // nanti ganti dashboard
                    // setHeader(false) nanti di rdp
                    router.push("/")
                    setModalContent(<DoneVerifyOtpModal />);
                    setModalOpen(true);
                    setModalConfig({
                        withHeader: false
                    });
                })
                .catch(() => {
                    router.push("/")
                    setModalContent(<DoneVerifyOtpModal />);
                    setModalOpen(true);
                    setModalConfig({
                        withHeader: false
                    });
                })
        };

        if (otp.length === 6 && !otp.includes("")) {
            handleVerifyOtp();
        }
    }, [otp, formData[0].email]);

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendCode = async () => {
        await resendOtp({ Email: formData[0].email })
          .then(() => {
            setOtp(new Array(6).fill(""))
          })
    };

    return (
        <>
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
                                {formData[0].email}
                            </span>
                            <Button
                                color='primary_secondary'
                                onClick={() => setIsEmailModalOpen(true)}
                                disabled={isTimerActive}
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
                        onClick={handleResendCode}
                        disabled={isTimerActive}
                        Class="px-[14px] h-[34px]"
                    >
                        Kirim Ulang
                    </Button>
                </div>
            </div>
            {/* Email Update Modal */}
            <UpdateEmailModal
                isOpen={isEmailModalOpen}
                setIsOpen={setIsEmailModalOpen}
                setOtp={setOtp}
            />
            <Toast classname="top-0 !bottom-auto"/>
        </>
    );
}