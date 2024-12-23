import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import IconComponent from "@/components/IconComponent/IconComponent";
import RadioButton from "@/components/Radio/RadioButton";
import toast from "@/store/toast";
import { useState } from "react";
import styles from "./ReviewFilter.module.scss"
import { useHeader } from "@/common/ResponsiveContext";
// import Filter from "./Filter";

function ReviewFilters() {
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [sort, setSort] = useState(null)
    const {
        setShowBottomsheet,
        setTitleBottomsheet,
        setDataBottomsheet,
        titleBottomsheet
    } = toast();
    const {
        appbar,
        setAppBar, 
        clearScreen,
        setScreen,
        screen
      }=useHeader()

    const handleSortSelect = (value) => () => {
        setSort(value)
        renderSortBottomsheet(value)
    }

    const renderSortBottomsheet = (currentSort) => {
        setDataBottomsheet(
            <div className="flex flex-col gap-y-3">
                <span className="font-bold text-[14px] leading-[15.4px]">Ulasan</span>
                <RadioButton
                    label="Terbaru"
                    name="newest"
                    classnameRound="after:-mt-[1px]"
                    checked={currentSort === "newest"}
                    onClick={handleSortSelect("newest")}
                />
                <RadioButton
                    label="Terlama"
                    name="oldest"
                    classnameRound="after:-mt-[1px]"
                    checked={currentSort === "oldest"}
                    onClick={handleSortSelect("oldest")}
                />
            </div>
        )
    }

    const handleOpenBottomsheet = () => {
        setShowBottomsheet(true)
        setTitleBottomsheet("Urutkan")
        renderSortBottomsheet(sort)
    }

    const handleOpenFilter = () => {
        setAppBar({
            appBarType:'header_title_modal_secondary',
            title:'Filter',
            // onAction:()=>console.log('reset'),
            onBack:()=>clearScreen()
          })
          setScreen('filter')
    }

    return (
        <>
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
                        <button
                            className="flex gap-x-2 items-center overflow-hidden justify-center px-3 py-2 text-primary-700 bg-primary-50 rounded-3xl border border-primary-700 border-solid max-w-[262px]"
                            onClick={handleOpenFilter}
                        >
                            <div className="self-stretch my-auto text-ellipsis font-medium text-[14px] leading-[15.4px]">Filter</div>
                            <IconComponent
                                classname={styles.icon_active}
                                src="/icons/filter.svg"
                                height={14}
                                width={14}
                            />
                        </button>
                        <button
                            className="flex overflow-hidden gap-2 items-center justify-center px-3 py-2 rounded-3xl border border-solid bg-neutral-200 border-neutral-200 max-w-[262px]"
                            onClick={handleOpenBottomsheet}
                        >
                            <div className="self-stretch my-auto text-ellipsis font-medium text-[14px] leading-[15.4px]">Urutkan</div>
                            <IconComponent
                                classname={styles.icon_inactive}
                                src="/icons/sorting.svg"
                                height={14}
                                width={14}
                            />
                        </button>
                        <button className="flex overflow-hidden flex-col justify-center px-3 py-2 rounded-3xl border border-solid bg-neutral-200 border-neutral-200 max-w-[262px]">
                            <div className="self-stretch min-h-[14px] text-ellipsis font-medium text-[14px] leading-[15.4px]">
                                Gambar
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {titleBottomsheet === "Urutkan" ? <Bottomsheet withReset onClickReset={handleSortSelect(null)}/> : null}
            {/* {isOpenFilter ? <Filter setIsOpen={setIsOpenFilter}/> : null} */}
        </>
    );
}

export default ReviewFilters;