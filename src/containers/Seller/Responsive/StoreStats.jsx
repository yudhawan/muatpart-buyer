import IconComponent from "@/components/IconComponent/IconComponent";

export default function StoreStats() {
    return (
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
        <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 items-center">
            <div className="font-bold text-[14px] leading-[15.4px]">
            08:00 - 17:00
            </div>
            <div className="self-center mt-2 font-medium text-[10px] leading-[10px] text-neutral-700">
            Jam Operasional
            </div>
        </div>
        </div>
    );
}