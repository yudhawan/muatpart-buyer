import { useEffect, useState, useRef } from "react";
import { LocationItem } from "./LocationItem";
import useLocationManagementStore from "@/store/locationManagementStore";

export function LocationPicker({
  isOpen,
  setIsOpen,
  searchResults,
  managedLocations,
  onSelectLocation,
  onClickSearchResult,
  locationRef,
}) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLocation = (result) => {
    onClickSearchResult(result);
    setIsOpen(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location:", latitude, longitude);
          // You can use the latitude and longitude to set the location or perform other actions
          setIsOpen(false);
          onSelectLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="absolute w-full flex">
      {isOpen && (
        <div className="flex z-10 flex-col items-start mt-1 pt-3 pb-5 w-full bg-white rounded-md border border-blue-600 border-solid">
          <div
            className="flex mx-5 gap-3 items-center max-w-full text-xs font-medium text-blue-600 cursor-pointer"
            onClick={handleGetCurrentLocation}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3795d733eb3bad624b2a2982f5874f44be0c8234b8b171d3ddf0475ccfc1ea24?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square fill-blue-600"
            />
            <div className="self-stretch my-auto h-2.5">Pilih Lokasi</div>
          </div>

          <div className="mt-3 w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px]" />

          <div className="flex flex-col mt-3 mx-5 max-w-full">
            <div className="text-xs font-medium leading-tight text-neutral-500">
              Hasil Pencarian
            </div>

            {searchResults?.slice(0, 3).map((result) => (
              <div
                key={result.id}
                className="flex gap-3 justify-between items-start w-full mt-3"
              >
                <button
                  className="flex gap-3 text-start"
                  onClick={() => handleSelectLocation(result)}
                >
                  <img
                    src={
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/82f18aaf313f3da9ec16ec7603481bb02dfb1070f0ff1bcdf920b0a36cffeffb?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
                    }
                    alt=""
                    className="object-contain shrink-0 w-5 aspect-square"
                  />
                  <div className="flex-1 shrink gap-2.5 self-stretch">
                    {result.title}
                  </div>
                </button>
                <img
                  src={
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/56d6cfa9a6052712d294250bcbc9fa99a70fe7037a219c462ef9f420a663ed35?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
                  }
                  alt=""
                  className="object-contain shrink-0 w-5 aspect-square cursor-pointer"
                />
              </div>
            ))}

            <div className="flex flex-col justify-center px-3 py-2 mt-3 w-full text-xs font-semibold text-blue-600 bg-white rounded border border-blue-600 border-solid">
              <div className="flex gap-2 items-center w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/18bbc0431f0ef562c9b534b68ee07c2e9210b58ffdb55a266b940f8e172fc591?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
                <div className="flex-1 shrink self-stretch my-auto basis-0">
                  Input Lokasi yang terdekat dengan Anda
                </div>
              </div>
            </div>

            <div className="flex-1 shrink gap-3 mt-3 w-full text-xs font-medium leading-tight text-neutral-500">
              Manajemen Lokasi
            </div>

            {managedLocations.map((location) => (
              <LocationItem
                key={location.id}
                title={location.title}
                address={location.address}
                isMain={location.isMain}
                icon={
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
                }
                actionIcon={
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"
                }
              />
            ))}

            <div className="mt-3 text-xs font-medium leading-tight text-right text-blue-600">
              <button>Lihat Manajemen Lokasi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
