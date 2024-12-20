import React, { Fragment, useEffect, useRef, useState } from 'react';
import RatingFilter from './RatingFilter';
import ReviewCard from './ReviewCard';
import styles from "./ReviewsContainer.module.scss"
import Input from '@/components/Input/Input';
import IconComponent from '@/components/IconComponent/IconComponent';

export default function ReviewsContainer() {
  const [currentFilter, setCurrentFilter] = useState({
    rating: null,
    withMedia: false
  });
  const [search, setSearch] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Terbaru");
  const options = ["Terbaru", "Terlama"];
  const dropdownRef = useRef(null);

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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(search)
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
      setSelected(option);
      setIsOpen(false);
  };

  // Sample data untuk demo
  const reviews = [
    {
      id: 1,
      rating: 4,
      date: "28 Aug 2021",
      time: "17.08",
      productImage: "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/637d991f82d042ef46c1efe24b7a4afc12a464a8317ac5596d4b710c2c900a70?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
      productName: "Filter Oli Mesin Honda Original",
      quality: "Genuine",
      userImage: "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/8d2d5f6f8dcacb0efdb215b721b9e926007945d2f6091a82bd92d1676f1da541?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
      userName: "Josh Verrelld",
      reviewTitle: "Mujianto",
      reviewText: "Barangnya ok, samsung terkenal dengan kualitasnya, tapi ini pengiriman lama, respon juga sangat lama, kalo memang gak siap jualan online ya jangan, besok2 mending beli dr.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/0bf4bc6bd0fb10999632def751cbc21b5b21cc3e1bd0098a2ac4a9415a457e9d?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
        "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/0bf4bc6bd0fb10999632def751cbc21b5b21cc3e1bd0098a2ac4a9415a457e9d?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
        "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/0bf4bc6bd0fb10999632def751cbc21b5b21cc3e1bd0098a2ac4a9415a457e9d?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
      ]
    },
    {
      id: 2,
      rating: 5,
      date: "27 Aug 2021",
      time: "16.30",
      productImage: "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/637d991f82d042ef46c1efe24b7a4afc12a464a8317ac5596d4b710c2c900a70?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
      productName: "Kampas Rem Depan Yamaha Genuine",
      quality: "Genuine",
      userImage: "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/8d2d5f6f8dcacb0efdb215b721b9e926007945d2f6091a82bd92d1676f1da541?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
      userName: "Sarah Wilson",
      reviewTitle: "Barang Bagus",
      reviewText: "Pengiriman cepat, packing rapi, barang sesuai deskripsi. Recommended seller!",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/0bf4bc6bd0fb10999632def751cbc21b5b21cc3e1bd0098a2ac4a9415a457e9d?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
        "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/0bf4bc6bd0fb10999632def751cbc21b5b21cc3e1bd0098a2ac4a9415a457e9d?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
        "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/0bf4bc6bd0fb10999632def751cbc21b5b21cc3e1bd0098a2ac4a9415a457e9d?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
      ]
    }
  ];

  return (
    <div className="flex gap-x-[38px] w-full mt-6">
      {/* Rating Filter - Kiri */}
      <div className="w-[264px] flex-shrink-0">
        <RatingFilter />
      </div>

      {/* Container Ulasan - Kanan */}
      <div className="flex-1 min-w-0 max-w-[898px]">
        <div className="flex flex-col pb-6">
          {/* Header */}
          <div className="flex flex-col justify-center w-full leading-tight">
            <div className="font-bold text-[18px] leading-[21.6px]">
              Ulasan Produk
            </div>
            <div className="mt-3 font-medium text-[12px] leading-[14.4px] text-neutral-700">
              Menampilkan 10 Ulasan Terbaru
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-x-3 mt-4">
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
                            onclick={(e) => {
                                setSearch("");
                                setSearchQuery("")
                            }}
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
                    className="h-8 w-[115px] flex gap-2 items-center px-3 py-2 text-xs font-medium leading-tight whitespace-nowrap bg-white rounded-md border border-solid border-neutral-600 text-neutral-600"
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

          {/* Review Cards */}
          <div className="mt-4 space-y-4">
            {reviews.map((review, key) => (
              <Fragment key={key}>
                  <ReviewCard
                    {...review}
                  />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}