import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import IconComponent from "@/components/IconComponent/IconComponent";
import toast from "@/store/toast";
import { DaySchedule } from "./DaySchedule";

export default function StoreStats() {
    const {
        setShowBottomsheet,
        setTitleBottomsheet,
        setDataBottomsheet,
        titleBottomsheet
    } = toast();
    const scheduleData = [
        { day: "Senin", hours: "08:00 - 17:00 WIB" },
        { day: "Selasa", hours: "08:00 - 17:00 WIB" },
        { day: "Rabu", hours: "08:00 - 17:00 WIB" },
        { day: "Kamis", hours: "08:00 - 17:00 WIB" },
        { day: "Jumat", hours: "08:00 - 17:00 WIB" },
        { day: "Sabtu", hours: "08:00 - 17:00 WIB" }
    ];
    return (
        <>
            <div className="flex gap-2 justify-center items-center w-full">
                <div className="flex gap-1 items-start self-stretch pr-2 my-auto border-r border-solid border-r-neutral-400">
                    <IconComponent src={'/icons/product-star.svg'} width={14} height={14} />
                    <div className="flex flex-col justify-center">
                        <div className="font-bold text-[14px] leading-[15.4px]">
                            4,9/
                            <span className="font-semibold text-[12px] leading-[13.2px] text-neutral-600">
                            5{" "}
                            </span>
                        </div>
                        <div className="mt-2 font-medium text-[10px] leading-[10px] text-neutral-700">
                            Rating dan Ulasan
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center self-stretch pr-2 my-auto whitespace-nowrap border-r border-solid border-r-neutral-400 w-[78px]">
                    <div className="font-bold text-[14px] leading-[15.4px]">
                        150
                    </div>
                    <div className="mt-2 font-medium text-[10px] leading-[10px] text-neutral-700">
                        Produk
                    </div>
                </div>
                <div
                    className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 items-center cursor-pointer"
                    onClick={() => {
                        setShowBottomsheet(true)
                        setTitleBottomsheet("Jam Operasional")
                        setDataBottomsheet(
                            <>
                                {scheduleData.map((schedule, index) => (
                                    <DaySchedule
                                        key={schedule.day}
                                        day={schedule.day}
                                        hours={schedule.hours}
                                        className={index > 0 ? "mt-6" : ""}
                                    />
                                ))}
                            </>
                        )
                    }}
                >
                    <div className="font-bold text-[14px] leading-[15.4px]">
                    08:00 - 17:00
                    </div>
                    <div className="self-center mt-2 font-medium text-[10px] leading-[10px] text-neutral-700">
                    Jam Operasional
                    </div>
                </div>
            </div>
            {titleBottomsheet === "Jam Operasional" ? <Bottomsheet/> : null}
        </>
    );
}