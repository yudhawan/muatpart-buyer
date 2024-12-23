import IconComponent from "@/components/IconComponent/IconComponent";
import Image from "next/image";

export function EtalaseItem({ name, imageUrl, iconUrl, isLast }) {
  return (
    <div
      className={`flex flex-col ${
        isLast ? "mt-3 bg-white rounded-md" : "border-b border-solid border-b-neutral-400 cursor-pointer"
      }`}
    >
      <div className={`flex flex-col ${!isLast ? "px-[9px] py-3" : "px-[9px] pb-3"} ${
        !isLast ? "w-full" : ""
      }`}>
        <div className="flex gap-8 items-center w-full">
          <div className="flex gap-2.5 items-center self-stretch my-auto min-w-[240px]">
            <Image
                className="rounded-[2.47px]"
                src="/img/temp-product-terlaris.png"
                alt={`${name} category thumbnail`}
                width={42}
                height={42}
            />
            <div className="self-stretch my-auto w-[230px] font-semibold text-[14px] leading-[16.8px]">{name}</div>
            <IconComponent
              src="/icons/chevron-right.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}