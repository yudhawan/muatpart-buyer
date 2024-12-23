import { Fragment } from "react";

function NavigationTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex flex-col items-start w-full font-semibold leading-tight text-center text-black whitespace-nowrap">
      <div className="flex flex-col justify-center">
        <div className="flex gap-1 items-start">
          {tabs.map((tab, index) => (
            <Fragment key={tab}>
              <button
                onClick={() => onTabChange(index)}
                className={`flex flex-col justify-center items-center min-h-[40px] cursor-pointer hover:bg-gray-50 focus:outline-none ${
                  index === activeTab
                    ? "font-bold text-primary-700 border-b-2 border-solid border-b-primary-700"
                    : ""
                }`}
              >
                <div className="gap-1 self-stretch px-6 text-[16px] leading-[19.2px]">{tab}</div>
              </button>
              {index < tabs.length - 1 && (
                <div className="shrink-0 self-stretch w-0 h-10 border border-solid bg-stone-300 border-stone-300" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavigationTabs;