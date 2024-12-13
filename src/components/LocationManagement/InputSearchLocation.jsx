import { useState, useEffect } from "react";
import Input from "../Input/Input";
import ModalComponent from "../Modals/ModalComponent";
import Image from "next/image";
import TextArea from "../TextArea/TextArea";
import Dropdown from "../Dropdown/Dropdown";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";

const InputSearchLocation = ({
  errors,
  searchResults,
  changeEvent,
  locationRef,
  onClickSearchResult,
  onSelectLocation,
  addressValue,
  locationValue = {
    id: null,
    title: "",
  },
}) => {
  const [location, setLocation] = useState(locationValue.title);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const managedLocations = [
    {
      id: 1,
      title: "Gudang Surabaya 14B, Gudang Houseware Surabaya",
      address:
        "Kebraon Indah Permai B53, RT 02, RT.02/RW.13, Kebraon, Kec. Karangpilang, Surabaya, Jawa Timur 60222",
      isMain: true,
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
      actionIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
    },
    {
      id: 2,
      title: "Kecamatan Rungkut, Kota Surabaya",
      address: "Jl Tenggilis Mejoyo, Surabaya",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
      actionIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
    },
    {
      id: 3,
      title: "Gudang Osowilangun – Surabaya Warehouse 12B no 1234",
      address: "Tambak Osowilangun, Kec. Benowo, Surabaya, Jawa Timur 60191",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
      actionIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
    },
  ];

  const handleInputFocus = () => {
    setIsOpen(true);
    if (!location && addressValue) {
      setLocation(addressValue);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setIsOpen(true);
    changeEvent(e);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location:", latitude, longitude);
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

  const handleSelectLocation = (result) => {
    onClickSearchResult(result);
    setLocation(result.title);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Input
        status={`${errors.location && "error"}`}
        supportiveText={{
          title: `${errors.location ? errors.location : ""}`,
        }}
        placeholder="Masukkan Lokasi Toko"
        value={location}
        changeEvent={handleInputChange}
        focusEvent={handleInputFocus}
      />

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

              {searchResults?.map((result) => (
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
                    onClick={() => setIsModalOpen(true)}
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

              {managedLocations.map((item) => (
                <div className="flex flex-col mt-4 w-full text-xs">
                  <div className="flex gap-3 items-center w-full font-bold leading-3 text-black">
                    <img
                      src={item.icon}
                      alt=""
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    />
                    <div className="flex flex-1 shrink gap-2 items-center basis-0 min-w-[240px]">
                      <div className="flex-1 shrink my-auto text-xs font-bold leading-3 text-black basis-0 text-ellipsis">
                        {item.title}
                        <br />
                      </div>
                      {item.isMain && (
                        <div className="gap-1 self-stretch p-1 my-auto text-xs font-semibold leading-tight text-orange-500 whitespace-nowrap bg-yellow-100 rounded">
                          Utama
                        </div>
                      )}
                    </div>
                    <img
                      src={item.actionIcon}
                      alt=""
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 shrink gap-2.5 self-stretch px-8 mt-1 w-full font-medium leading-tight text-ellipsis text-neutral-500">
                    {item.address}
                  </div>
                </div>
              ))}

              <div className="mt-3 text-xs font-medium leading-tight text-right text-blue-600">
                <button>Lihat Manajemen Lokasi</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        setIsOpen={() => setIsModalOpen(false)}
        classnameContent="w-[400px]"
        hideHeader
      >
        <div className="">
          <div className="text-base font-bold p-4">Detail Alamat</div>

          <div className="max-h-96 overflow-auto space-y-3 p-4 pt-0">
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Label Alamat*
              </div>
              <Input placeholder="Masukkan Alamat" />
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Lokasi*
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={"/icons/marker.svg"}
                  width={30}
                  height={30}
                  alt="marker"
                />
                <div className="font-semibold">
                  Graha Airi, Jl. Kedung Doro No.101 A, RT.001/RW.06,
                  Kedungdoro, Kec. Tegalsari, Surabaya, Jawa Timur 60261
                </div>
              </div>
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Alamat*
              </div>
              <TextArea
                placeholder="Masukkan alamat lengkap dengan detail.Contoh : Nama Jalan (bila tidak ditemukan), Gedung, No. Rumah/Patokan, Blok/Unit"
                maxLength={60}
                resize="none"
                hasCharCount={false}
              />
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Kecamatan
              </div>
              <div className="font-semibold">Tegalsari</div>
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Kota
              </div>
              <div className="font-semibold">Surabaya</div>
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Provinsi
              </div>
              <div className="font-semibold">Jawa Timur</div>
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Kode Pos*
              </div>
              <Dropdown onSearchValue placeholder="Pilih Kode Pos" />
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                Nama PIC*
              </div>
              <Input placeholder="Nama PIC Lokasi" />
            </div>
            <div className="">
              <div className="text-[10px] text-neutral-600 font-semibold">
                No. HP PIC*
              </div>
              <Input placeholder="Contoh : 08xxxxxxxxxx" />
            </div>
            <Checkbox label="Jadikan alamat sebagai alamat utama" />

            <div className="flex gap-3 justify-center pt-[10px]">
              <Button
                color="primary_secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Batalkan
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Simpan</Button>
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default InputSearchLocation;
