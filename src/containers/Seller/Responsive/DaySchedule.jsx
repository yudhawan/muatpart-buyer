export function DaySchedule({ day, hours, className = "" }) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex flex-col justify-center w-full">
        <div className="flex gap-3 items-start w-full font-medium text-[14px] leading-[15.4px]">
          <div className="w-20">{day}</div>
          <div>{hours}</div>
        </div>
      </div>
    </div>
  );
}