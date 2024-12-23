function MetricItem({ icon, value, subValue, label, showBorder }) {
  return (
    <div className={`flex flex-col justify-center items-center ${showBorder ? 'pr-4 border-r border-solid border-r-stone-300' : ''}`}>
      <div className="flex gap-1 items-center text-base font-bold">
        {icon ? (
          <img
            loading="lazy"
            src={icon}
            alt={`${label} icon`}
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
        ) : null}
        <div className="self-stretch my-auto">
          {value}
          {subValue && <span className="text-sm font-medium leading-4 text-neutral-500">{subValue}</span>}
        </div>
      </div>
      <div className="mt-2 font-medium text-[12px] leading-[14.4px]">
        {label}
      </div>
    </div>
  );
}

function StoreMetrics({ metrics }) {
  return (
    <div className="flex gap-3 justify-center items-center self-stretch my-auto min-w-[240px]">
      <div className="flex gap-3 items-start self-stretch my-auto min-w-[240px]">
        {metrics.map((metric, index) => (
          <MetricItem key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}

export default StoreMetrics;