import React from "react";

export function SidebarItem({ icon, label, isActive, altText, onClick }) {
  return (
    <div
      className={`flex gap-2 items-center px-2 py-3 w-full bg-white relative hover:bg-gray-100 cursor-pointer rounded-lg ${
        isActive ? "" : ""
      }`}
      onClick={onClick}
    >
      <img
        loading="lazy"
        src={icon}
        alt={altText || ""}
        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
      />
      <div
        className={`flex-1 shrink self-stretch my-auto basis-0 text-xs font-semibold leading-tight ${
          isActive ? "text-red-700" : ""
        }`}
      >
        {label}
      </div>
      {isActive && (
        <div className="flex absolute bottom-0 left-0 z-0 shrink-0 self-start w-1 h-10 bg-red-700 rounded-r-sm" />
      )}
    </div>
  );
}
