const DaySchedule = ({ day, hours }) => {
  return (
    <div className="flex flex-1 shrink gap-10 justify-between items-center py-3 basis-0 min-w-[290px] size-full font-medium text-[12px] leading-[14.4px]">
        <div className="self-stretch py-1 my-auto whitespace-nowrap text-ellipsis">
          {day}
        </div>
        <div className="self-stretch py-1 my-auto text-ellipsis">
          {hours}
        </div>
    </div>
  );
}

export default DaySchedule