import { useEffect, useState, useRef, useMemo } from "react";
import ProductGrid from "./ProductGrid"
import Sidebar from "./Sidebar"
import styles from "./EtalaseContainer.module.scss"
import BreadCrumb from "@/components/Breadcrumb/Breadcrumb";
import Input from "@/components/Input/Input";
import IconComponent from "@/components/IconComponent/IconComponent";

const EtalaseContainer = ({
    etalaseData,
    productsWithFavorites,
    // Shared search props
    search,
    setSearch,
    handleSearch,
    handleClearSearch
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Terbaru");
    const options = ["Terbaru", "Terlama"];
    const dropdownRef = useRef(null);

    const [selectedEtalaseOption, setSelectedEtalaseOption] = useState(null);

    const breadcrumbData = useMemo(() => {
        const baseItems = ['Muatparts', 'Makmur Jaya'];

        if (!selectedEtalaseOption) return baseItems;

        const typeLabel = selectedEtalaseOption.type === 'showcase' ? 'Etalase' : 'Kategori';
        const items = [...baseItems, typeLabel];
        
        // Only add the value if it's not "Semua Produk"
        if (selectedEtalaseOption.value !== 'Semua Produk') {
            items.push(selectedEtalaseOption.value);
        }
        
        return items;
    }, [selectedEtalaseOption]);

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

    useEffect(() => {
        if (etalaseData.showcases.length > 0) {
            setSelectedEtalaseOption({ type: "showcase", value: etalaseData.showcases[0] })
        }
    }, [JSON.stringify(etalaseData.showcases)])

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectOption = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const handleClickBreadCrumb = (val) => {
        // alert(val)
    }

    return (
        <div className="flex gap-x-[38px] mt-6">
            <Sidebar
                categories={etalaseData.categories}
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
                            <span className="font-medium text-[12px] leading-[14.4px]">{selected}</span>
                            <IconComponent classname={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} src="/icons/chevron-down.svg"/>
                        </button>

                        {isOpen && (
                            <ul
                                className="absolute z-10 w-full mt-1 bg-white border border-solid border-neutral-600 rounded-md shadow-muat"
                                role="listbox"
                            >
                            {options.map((option, index) => (
                                <li
                                    key={option}
                                    onClick={() => selectOption(option)}
                                    className={`
                                        px-3 py-2 cursor-pointer hover:bg-neutral-200 font-medium text-[12px] leading-[14.4px]
                                        ${index === 0 ? 'rounded-t-md' : ''}
                                        ${index === options.length - 1 ? 'rounded-b-md' : ''}
                                    `}
                                    role="option"
                                    aria-selected={selected === option}
                                >
                                    {option}
                                </li>
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