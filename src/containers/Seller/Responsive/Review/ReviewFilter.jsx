import IconComponent from "@/components/IconComponent/IconComponent";

function ReviewFilters() {
    return (
        <div className="flex overflow-hidden flex-col justify-center p-4 w-full bg-white">
            <div className="flex overflow-hidden flex-col w-full bg-white">
                <div className="flex flex-col justify-center px-3 py-4 w-full bg-white rounded-lg border border-solid border-stone-300">
                    <div className="flex items-center w-full">
                        <IconComponent
                            src="/icons/star.svg"
                            width={22}
                            height={22}
                        />
                        <div className="ml-1 font-bold text-[14px] leading-[15.4px] w-[60px]">
                            4,9/
                            <span className="font-semibold text-[11px] leading-[13.2px] text-neutral-600">
                                5{" "}
                            </span>
                        </div>
                        <div className="flex flex-col justify-center my-auto text-[12px] leading-[14.4px]">
                            <div className="gap-1 self-start font-bold text-black">
                                Ulasan dan Rating
                            </div>
                            <div className="flex gap-1 items-center mt-2 font-medium text-neutral-700">
                                <div className="my-auto">103 rating</div>
                                <div className="size-0.5 bg-neutral-700 rounded" />
                                <div className="my-auto">103 ulasan</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 items-end self-start mt-4 text-sm font-medium leading-none text-black whitespace-nowrap">
                <button className="flex overflow-hidden flex-col justify-center px-3 py-2 text-blue-600 bg-sky-100 rounded-3xl border border-blue-600 border-solid max-w-[262px]">
                    <div className="flex gap-2 items-center">
                    <div className="self-stretch my-auto text-ellipsis">Filter</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0d76e67eee26f4d2579ff85522237209e4f620ef7e542499c9e5689fe85b6df?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
                        alt="Filter icon"
                        className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                    />
                    </div>
                </button>
                <button className="flex overflow-hidden flex-col justify-center px-3 py-2 rounded-3xl border border-solid bg-zinc-100 border-zinc-100 max-w-[262px]">
                    <div className="flex gap-2 items-center">
                    <div className="self-stretch my-auto text-ellipsis">Urutkan</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/68d1fef290c6d06d579c8f24a277323467a36d7cc957d5c051090e08843254e5?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
                        alt="Sort icon"
                        className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                    />
                    </div>
                </button>
                <button className="flex overflow-hidden flex-col justify-center px-3 py-2 rounded-3xl border border-solid bg-zinc-100 border-zinc-100 max-w-[262px]">
                    <div className="gap-2 self-stretch min-h-[14px] text-ellipsis">
                    Gambar
                    </div>
                </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewFilters;