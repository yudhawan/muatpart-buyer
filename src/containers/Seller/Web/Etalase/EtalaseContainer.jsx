import { useEffect, useState, useRef, useMemo, Fragment } from "react";
import ProductGrid from "./ProductGrid"
import Sidebar from "./Sidebar"
import styles from "./EtalaseContainer.module.scss"
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Input from "@/components/Input/Input";
import IconComponent from "@/components/IconComponent/IconComponent";
import { useRouter } from "next/navigation";

const EtalaseContainer = ({
    etalaseData,
    productsWithFavorites,
    onChangeTab,
    storeName,
    // Shared search props
    search,
    setSearch,
    handleSearch,
    handleClearSearch,
    filter,
    setFilter,
    selectedEtalaseOption,
    setSelectedEtalaseOption
}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    // const [selected, setSelected] = useState("Terbaru");
    const options = [
        {
            label: "Terbaru",
            value: "newest"
        },
        {
            label: "Terlama",
            value: "oldest"
        },
    ];
    const selectedSort = options.find(item => item.value === filter.sort).label
    const dropdownRef = useRef(null);

    const breadcrumbData = useMemo(() => {
        const baseItems = ['Muatparts', storeName];

        if (!selectedEtalaseOption) return baseItems;

        const typeLabel = selectedEtalaseOption.type === 'showcase' ? 'Etalase' : 'Kategori';
        const items = [...baseItems, typeLabel];
        
        // Only add the value if it's not "Semua Produk"
        if (selectedEtalaseOption.value !== 'Semua Produk') {
            items.push(selectedEtalaseOption.value);
        }
        
        return items;
    }, [selectedEtalaseOption, storeName]);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectOption = (option) => {
        setFilter(prevState => ({ ...prevState, sort: option }))
        // setSelected(option);
        setIsOpen(false);
    };

    const handleClickBreadCrumb = (val) => {
        if (val === "Muatparts") {
            router.push("/")
        }
        if (val === storeName) {
            onChangeTab(0)
        }
        if (val === "Etalase") {
            setSelectedEtalaseOption({ type: "showcase", value: "Semua Produk" })
        }
    }

    return (
        <div className="flex gap-x-[38px] mt-6">
            <Sidebar
                // categories={etalaseData.categories}
                showcases={etalaseData.showcases}
                selectedOption={selectedEtalaseOption}
                onSelect={setSelectedEtalaseOption}
            />
            <div className="flex-1 flex flex-col gap-y-4">
                <BreadCrumb data={breadcrumbData} onclick={handleClickBreadCrumb} />
                <div className="flex gap-x-3">
                    <Input
                        classname={`w-[262px] ${styles.input_search}`}
                        placeholder="Cari Nama Produk/SKU"
                        icon={{
                        left: (
                            <IconComponent src={"/icons/search.svg"} />
                        ),
                        right: search ? (
                            <IconComponent
                            src={"/icons/silang.svg"}
                            onclick={handleClearSearch}
                            />
                        ) : null,
                        }}
                        value={search}
                        changeEvent={(e) => setSearch(e.target.value)}
                        onKeyUp={handleSearch}
                    />
                    {/* SORTING DROPDOWN */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="h-8 flex gap-2 items-center px-3 text-xs font-medium leading-tight whitespace-nowrap bg-white rounded-md border border-solid border-neutral-600 text-neutral-600"
                            aria-haspopup="listbox"
                            aria-expanded={isOpen}
                        >
                            <IconComponent src="/icons/sorting.svg"/>
                            <span className="font-medium text-[12px] leading-[14.4px]">{selectedSort}</span>
                            <IconComponent classname={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} src="/icons/chevron-down.svg"/>
                        </button>

                        {isOpen && (
                            <ul
                                className="absolute z-10 w-full mt-1 bg-white border border-solid border-neutral-600 rounded-md shadow-muat"
                                role="listbox"
                            >
                            {options.map((option, index) => (
                                <Fragment key={index}>
                                    <li
                                        onClick={() => selectOption(option.value)}
                                        className={`
                                            px-3 py-2 cursor-pointer hover:bg-neutral-200 font-medium text-[12px] leading-[14.4px]
                                            ${index === 0 ? 'rounded-t-md' : ''}
                                            ${index === options.length - 1 ? 'rounded-b-md' : ''}
                                        `}
                                        role="option"
                                        aria-selected={filter.sort === option.value}
                                    >
                                        {option.label}
                                    </li>
                                </Fragment>
                            ))}
                            </ul>
                        )}
                    </div>
                </div>
                <ProductGrid
                    products={productsWithFavorites(etalaseData.products)}
                />
            </div>
        </div>
    )
}

export default EtalaseContainer