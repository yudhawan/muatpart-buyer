import { Fragment } from "react";
import DaySchedule from "./DaySchedule";
import IconComponent from "@/components/IconComponent/IconComponent";
import styles from "./JamOperasionalModal.module.scss"

const scheduleData = [
  { day: "Senin", hours: "07:00 - 16:00 WIB" },
  { day: "Selasa", hours: "07:00 - 16:00 WIB" },
  { day: "Rabu", hours: "07:00 - 16:00 WIB" },
  { day: "Kami", hours: "07:00 - 16:00 WIB" },
  { day: "Jumat", hours: "07:00 - 16:00 WIB" },
  { day: "Sabtu", hours: "07:00 - 16:00 WIB" },
  { day: "Minggu", hours: "Buka 24 jam" }
];

const JamOperasionalModal = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed inset-0 z-[90] flex items-center justify-center ${!isOpen ? "hidden" : "block"}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl px-6 py-8 flex flex-col shadow-muat gap-y-4 items-center">
        {/* Header */}
        <button
            className="absolute top-[8px] right-[9px]"
            onClick={() => setIsOpen(false)}
        >
            <IconComponent
            classname={styles.icon_primary}
            src="/icons/silang.svg"
            />
        </button>
        <div className="flex flex-col rounded-xl items-center">
            <div className="font-bold text-[16px] leading-[19.2px]">
                Jam Operasional
            </div>
            <div className="flex overflow-hidden flex-col justify-center py-3 px-6 mt-3 w-full text-xs font-medium text-black bg-white rounded-xl border border-solid border-stone-300">
                <div className="flex flex-col w-full">
                {scheduleData.map((schedule, index) => (
                    <Fragment key={index}>
                        <DaySchedule
                            day={schedule.day}
                            hours={schedule.hours}
                        />
                    </Fragment>
                ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default JamOperasionalModal;