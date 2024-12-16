"use client";

import { useState, useRef, useEffect } from "react";
import FirstTimer from "@/app/garasi/firsttimer/page";
import ListGarasi from "@/app/garasi/list/page";
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import Toast from "@/components/Toast/Toast";
import toast from "@/store/toast";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import Modal from "@/components/AI/Modal";
import Button from "@/components/Button/Button";
import { useSearchParams } from "next/navigation";

const MainPageGarasi = () => {
  const { dataBottomsheet } = toast();
  const isAdd = useSearchParams().get("isAdd");

  return (
    <>
      <Toast />
      <Bottomsheet>{dataBottomsheet}</Bottomsheet>
      <Modal />
      {isAdd ? <ListGarasi /> : <FirstTimer />}
    </>
  );
};

export default MainPageGarasi;

export const Card = ({ children, classname }) => {
  return (
    <div
      className={`w-full h-fit bg-white border rounded-md border-neutral-600 text-neutral-900 ${classname}`}
    >
      {children}
    </div>
  );
};

export const Dropdown = ({
  withSearch,
  customLabel,
  label,
  value,
  onChange,
  options,
  disabled = false,
  error = null,
  onBeforeOpen,
  classname,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleDropdownClick = () => {
    // Jika disabled, tidak lakukan apa-apa
    if (disabled) return;

    // Jika ada onBeforeOpen, cek dulu apakah boleh dibuka
    if (onBeforeOpen) {
      const canOpen = onBeforeOpen();
      if (!canOpen) return;
    }

    // Jika lolos semua pengecekan, buka dropdown
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main dropdown button */}
      <button
        onClick={handleDropdownClick}
        className={`w-[166px] h-8 p-2.5 bg-white flex items-center justify-between border rounded-lg !font-medium !text-xs
          ${disabled ? "bg-gray-50 cursor-not-allowed" : "cursor-pointer"}
          ${error ? "border-red-500" : "border-neutral-600"}
          ${classname}
          ${isOpen ? " !border-primary-700" : ""}`}
        type="button"
      >
        {customLabel ? (
          customLabel
        ) : (
          <span className={`${!value && "text-gray-500"} truncate`}>
            {value || label}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 sm:mt-0 sm:border-primary-700 bg-white border border-gray-200 rounded-lg shadow-lg !font-medium !text-xs">
          {withSearch && (
            <div className="p-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-2  text-neutral-600"
                  size={16}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-neutral-600 rounded-lg hover:border-primary-700 focus-visible:outline-none focus:border-primary-700 placeholder:text-neutral-600"
                  placeholder="Cari Kendaraan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-[160px] scrollbar-custombadanusaha overflow-y-auto">
            {filteredOptions?.map((option) => (
              <button
                key={option}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 sm:text-neutral-600 sm:px-[10px] truncate"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
            {filteredOptions?.length === 0 && (
              <div className="px-4 py-2 text-neutral-900 text-sm text-center">
                Data Tidak Ditemukan
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export const vehicleData = {
  Mobil: {
    brands: {
      Toyota: {
        years: {
          2024: {
            models: {
              Avanza: {
                types: ["1.3 G", "1.5 G", "1.5 Veloz"],
              },
              Innova: {
                types: ["2.0 G", "2.4 V Diesel", "2.4 Venturer"],
              },
              Fortuner: {
                types: ["2.4 G 4x2", "2.7 SRZ 4x2", "2.8 VRZ 4x4"],
              },
            },
          },
          2023: {
            models: {
              Avanza: {
                types: ["1.3 E", "1.3 G", "1.5 G"],
              },
              Innova: {
                types: ["2.0 G", "2.4 G Diesel", "2.4 V"],
              },
            },
          },
        },
      },
      Honda: {
        years: {
          2024: {
            models: {
              Brio: {
                types: ["Satya E", "Satya S", "RS"],
              },
              "HR-V": {
                types: ["1.5 S", "1.5 E", "1.5 Turbo RS"],
              },
              "CR-V": {
                types: ["2.0 i-VTEC", "1.5 Turbo", "Hybrid e:HEV"],
              },
            },
          },
          2023: {
            models: {
              Brio: {
                types: ["Satya S", "RS"],
              },
              "HR-V": {
                types: ["1.5 S", "1.5 Turbo RS"],
              },
            },
          },
        },
      },
    },
  },
  Motor: {
    brands: {
      Honda: {
        years: {
          2024: {
            models: {
              BeAT: {
                types: ["CBS", "CBS-ISS", "Deluxe"],
              },
              PCX: {
                types: ["CBS", "ABS", "e:HEV"],
              },
              CB150R: {
                types: ["Streetfire", "Streetfire SE", "Streetfire Raptor"],
              },
            },
          },
          2023: {
            models: {
              BeAT: {
                types: ["CBS", "CBS-ISS"],
              },
              PCX: {
                types: ["CBS", "ABS"],
              },
            },
          },
        },
      },
      Yamaha: {
        years: {
          2024: {
            models: {
              NMAX: {
                types: ["Connected", "Connected ABS", "Connected ABS Deluxe"],
              },
              "XSR 155": {
                types: ["Standard", "Sport", "Cafe Racer"],
              },
              R15: {
                types: ["Standard", "M", "Connected-ABS"],
              },
            },
          },
          2023: {
            models: {
              NMAX: {
                types: ["Standard", "Connected ABS"],
              },
              R15: {
                types: ["Standard", "M"],
              },
            },
          },
        },
      },
    },
  },
  Truk: {
    brands: {
      Hino: {
        years: {
          2024: {
            models: {
              "Dutro Cargo": {
                types: ["110 SDL", "110 SDL Long", "130 MDL"],
              },
              "Ranger Cargo": {
                types: ["FM 260 JD", "FM 260 JM", "FL 235 JW"],
              },
              "Profia Cargo": {
                types: ["FW 350 TH", "FS 285 PJ", "SH 350"],
              },
            },
          },
          2023: {
            models: {
              "Dutro Cargo": {
                types: ["110 SDL", "110 SDL Long"],
              },
              "Ranger Cargo": {
                types: ["FM 260 JD", "FM 260 JM"],
              },
            },
          },
        },
      },
      Mitsubishi: {
        years: {
          2024: {
            models: {
              Canter: {
                types: ["FE 71", "FE 73", "FE 84"],
              },
              Fuso: {
                types: ["FM 517 HL", "FN 527 ML", "FJ 2523"],
              },
              Fighter: {
                types: ["FN 61 FL", "FN 62 F", "FN 62 FL"],
              },
            },
          },
          2023: {
            models: {
              Canter: {
                types: ["FE 71", "FE 73"],
              },
              Fuso: {
                types: ["FM 517 HL", "FN 527 ML"],
              },
            },
          },
        },
      },
    },
  },
  Bus: {
    brands: {
      "Mercedes-Benz": {
        years: {
          2024: {
            models: {
              "OH 1626": {
                types: ["Standard", "Long Chassis"],
              },
              "OH 1836": {
                types: ["Standard", "Air Suspension"],
              },
            },
          },
          2023: {
            models: {
              "OH 1626": {
                types: ["Standard"],
              },
            },
          },
        },
      },
      Scania: {
        years: {
          2024: {
            models: {
              K360: {
                types: ["IB 4x2", "IB 6x2"],
              },
              K410: {
                types: ["IB 4x2", "IB 6x2", "EB 6x2"],
              },
            },
          },
          2023: {
            models: {
              K360: {
                types: ["IB 4x2"],
              },
              K410: {
                types: ["IB 4x2", "IB 6x2"],
              },
            },
          },
        },
      },
    },
  },
};

export const ButtonSubmitMobileNav = ({ title, onclick, children }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full py-3 px-4 shadow-muat rounded-t-[10px] z-30 bg-white">
      {children ? (
        children
      ) : (
        <Button onClick={onclick} Class="!min-w-full !w-full !font-semibold">
          {title}
        </Button>
      )}
    </div>
  );
};
