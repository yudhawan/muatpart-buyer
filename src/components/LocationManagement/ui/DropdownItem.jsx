import * as React from "react";

export function DropdownItem({ item, isSelected, onSelect }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      className={`flex gap-2.5 items-center px-2.5 py-2 w-full whitespace-nowrap cursor-pointer hover:bg-gray-50
        ${isSelected ? "font-bold" : ""}`}
    >
      <div className="flex-1 shrink self-stretch my-auto basis-0">{item}</div>
      {isSelected && (
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a1432f9b86d49bd6e010a1496ccc6919388e2e8f8f9e2e5d84eb94ddd3e75f0?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
        />
      )}
    </div>
  );
}
