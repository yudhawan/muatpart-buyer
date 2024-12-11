import Image from "next/image";
import OtpInput from "./OtpInput";

const Otp = () => {
	return (
		<div className="flex min-h-screen bg-primary-700">
			{/* Left logo */}
			<div className="fixed left-0 top-0">
				<Image
					src="/img/meteor1.png"
					alt="meteor1"
					width={162}
					height={162}
				/>
			</div>

			{/* Main content */}
			<div className="flex-1 flex justify-center items-center">
				<div className="flex flex-col items-center max-w-[444px] w-full px-4">
					<div className="flex flex-col items-center w-full text-xs font-bold text-center text-white">
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/62a328d57c09ac4505033b750a3a707107f7a9dcf1660a4481df292f1a218306"
							alt="Brand banner"
							className="w-[200px] object-contain"
						/>
						<div className="mt-1.5">Jalan Mudah Bersama</div>
					</div>

					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fcc7d87388aacb920974838e0ab4aae9d6af321534078134c6e2fd4d64f0254"
						alt="Verification illustration"
						className="mt-5 w-[92px] object-contain"
					/>

					<div className="text-base font-medium text-center text-white mt-5">
						Mohon cek pesan di email Anda
						<br />
						untuk melanjutkan pendaftaran
					</div>

					<div className="flex flex-col items-center mt-6 w-full">
						<div className="flex gap-6 items-center justify-center w-full flex-wrap">
							<div className="flex gap-3 items-center text-sm">
								<div className="font-bold text-white">Kode OTP dikirim ke email</div>
								<div className="font-semibold text-gray-200 truncate max-w-[112px]">
									angkutjayatrans@gmail.com
								</div>
							</div>
							<button className="px-3 py-1 text-xs font-semibold text-blue-600 bg-white rounded-xl">
								Ganti
							</button>
						</div>

						<div className="flex gap-3 items-center mt-3 justify-center">
							<label className="text-sm font-bold text-white w-[102px]">
								Masukkan OTP
							</label>
							<OtpInput />
						</div>
					</div>

					<div className="px-4 py-3 mt-6 text-xs font-medium text-center text-black bg-orange-200 rounded-md max-w-[319px]">
						Jika pesan OTP tidak ditemukan mohon periksa
						<br />
						folder <span className="font-bold">spam</span>,{" "}
						<span className="font-bold">sosial</span>, atau{" "}
						<span className="font-bold">promosi</span> pada email Anda.
					</div>

					<div className="mt-6 text-base font-medium text-center text-white">
						Kode OTP aktivasi akan berakhir dalam{" "}
						<span className="font-bold">02:00</span>
					</div>

					<button className="w-full max-w-[319px] px-6 py-3 mt-8 text-sm font-semibold text-center bg-gray-200 rounded-3xl text-zinc-500">
						Kirim Ulang
					</button>
				</div>
			</div>

			{/* Left logo */}
			<div className="fixed right-0 bottom-0">
				<Image
					src="/img/meteor2.png"
					alt="meteor2"
					width={162}
					height={162}
				/>
			</div>
		</div>
	);
};
  
export default Otp;