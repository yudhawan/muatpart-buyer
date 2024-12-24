"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import DataNotFound from "@/components/DataNotFound/DataNotFound";
import { modal } from "@/store/modal";
import { WebModal } from "../firsttimer/web";
import { useFormProps } from "../firsttimer/page";
import toast from "@/store/toast";
import { Skeleton } from "@/app/profileseller/ProfilesellerWeb";

export default function Web({
  selectedVehicle,
  setSelectedVehicle,
  categories,
  setCategories,
  searchTerm,
  setSearchTerm,
  garageList,
}) {
  const { setModalOpen, setModalContent, setModalConfig } = modal();
  const formProps = useFormProps();
  if (!garageList)
    return (
      <div className="px-10 py-4">
        <Skeleton fill={10} />
      </div>
    );

  // return console.log(garageList, " aw")
  return (
    <>
      {/* Vehicle Card */}
      <div className="bg-neutral-100 rounded-lg py-6 shadow-sm mb-8 flex items-center justify-center">
        <div className="flex items-center gap-6 h-fit">
          <div className="w-[116px] h-[116px] border border-neutral-400 rounded-md p-6 bg-neutral-50 relative">
            <Image
              src={selectedVehicle[0]?.image || ""}
              alt={`${selectedVehicle[0].brand} ${selectedVehicle[0].model}`}
              width={68}
              height={68}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-between h-[116px]">
            <div className="flex flex-col justify-between">
              <span className="font-bold text-lg flex items-center gap-4">
                {selectedVehicle[0].type} · {selectedVehicle[0].brand} ·{" "}
                {selectedVehicle[0].year}
                <div className="flex gap-4">
                  <Pencil
                    className="cursor-pointer"
                    size={16}
                    onClick={() => {
                      setModalOpen(false);
                      setModalContent(
                        <WebModal
                          mode="edit"
                          initialData={{
                            type: "Mobil",
                            brand: "Toyota",
                            year: "2023",
                            model: "Innova",
                            variant: "2.0 G",
                          }}
                          {...formProps}
                        />
                      );
                      setModalOpen(true);
                      setModalConfig({
                        width: 471,
                        height: 291,
                        classname: "!w-[471px] !h-fit",
                        withHeader: false,
                        withClose: true,
                      });
                    }}
                  />
                  <Trash2
                    className="cursor-pointer"
                    size={16}
                    onClick={() => {
                      setModalContent(<HapusKendaraanModal />);
                      setModalOpen(true);
                      setModalConfig({
                        width: 386,
                        classname: "!w-fit !h-fit",
                        withHeader: true,
                        withClose: true,
                      });
                    }}
                  />
                </div>
              </span>
              <p className="text-xs font-medium text-neutral-700">
                {selectedVehicle[0].model}
              </p>
              <p className="text-xs font-medium text-neutral-700">
                {selectedVehicle[0].variant}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                color="primary_secondary"
                Class="!min-w-[112px] !h-8 !text-sm !font-semibold"
                onClick={() => {
                  setModalOpen(false);
                  setModalContent(<DaftarKendaraanModal {...useFormProps} />);
                  setModalOpen(true);
                  setModalConfig({
                    classname: "!w-[564px] !h-fit",
                    withHeader: false,
                    withClose: true,
                  });
                }}
              >
                Ganti (1)
              </Button>
              <Button
                Class="!min-w-[112px] !text-sm !h-8 !font-semibold"
                onClick={() => {
                  setModalOpen(false);
                  setModalContent(<WebModal mode="add" {...formProps} />);
                  setModalOpen(true);
                  setModalConfig({
                    width: 471,
                    height: 291,
                    classname: "!w-[471px] !h-fit",
                    withHeader: false,
                    withClose: true,
                  });
                }}
              >
                Tambah
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8 p-6 mx-auto w-[690px]">
        <h3 className="text-lg text-center font-bold mb-4">
          Cari Suku Cadang yang cocok dengan {selectedVehicle[0].brand}{" "}
          {selectedVehicle[0].year}
        </h3>
        <div className="flex gap-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-[9px] text-neutral-600"
              size={16}
            />
            <Input
              placeholder="Cari Suku Cadang"
              value={searchTerm}
              changeEvent={(e) => setSearchTerm(e.target.value)}
              classInput="w-full !pl-[30px]"
            />
          </div>
          <Button Class="!min-w-[112px] !text-sm !h-8 !font-semibold">
            Cari
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-[100px] pb-6">
        <h3 className="text-lg font-bold mb-4">
          Kategori untuk {selectedVehicle[0].brand} {selectedVehicle[0].year}
        </h3>
        {/* <DataNotFound
          image={"/img/daftarprodukicon.png"}
          title="Belum ada kategori yang cocok dengan jenis kendaraan kamu"
          textClass="!w-full"
        /> */}
        <div className="grid grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-[14px] rounded-md border hover:border-primary-600 cursor-pointer relative"
            >
              <div className="aspect-square relative mb-2">
                <Image
                  src={`/img/${category.icon}.png`}
                  alt={category.name}
                  // width={68}
                  // height={68}
                  className="object-contain"
                  fill
                />
              </div>
              <div className="flex gap-2 items-center justify-center text-center text-neutral-900 pt-3">
                <p className="text-sm font-bold">{category.name}</p>
                <p className="text-xs font-medium">({category.count})</p>
              </div>
              {category.isRecommended && (
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Rekomendasi
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const DaftarKendaraanModal = ({
  selectedVehicle,
  setSelectedVehicle,
}) => {
  const { setModalOpen, setModalContent, setModalConfig } = modal();
  const { setShowToast, setDataToast } = toast();
  const formProps = useFormProps();

  const vehicleList = [
    {
      id: 1,
      year: "2022",
      brand: "Mitsubishi Fuso",
      imageUrl: "/img/chopper.png",
    },
    {
      id: 2,
      year: "2022",
      brand: "Scania",
      imageUrl: "/img/chopper.png",
    },
    {
      id: 3,
      year: "2022",
      brand: "FAW",
      imageUrl: "/img/chopper.png",
    },
    {
      id: 4,
      year: "2022",
      brand: "Hino",
      imageUrl: "/img/chopper.png",
    },
    {
      id: 5,
      year: "2022",
      brand: "Mercedes-Benz",
      imageUrl: "/img/chopper.png",
    },
  ];

  const [selectedKendaraan, setSelectedKendaraan] = useState("Scania");

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const slidesPerView = 3;
  const maxIndex = vehicleList.length - slidesPerView;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (selectedKendaraan !== "Scania") {
      setModalOpen(false);
      setShowToast(true);
      setDataToast({
        type: "success",
        message: "Berhasil mengganti kendaraan",
      });
    }
  }, [selectedKendaraan]);

  return (
    <div className="py-8">
      <h1 className="text-lg font-bold mb-4 mx-auto text-center">
        Daftar Kendaraan
      </h1>

      {/* Vehicle Cards */}
      <div className="relative mb-6">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md ${
            currentIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className={`absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md ${
            currentIndex === maxIndex
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="w-[384px] mx-auto">
          {" "}
          {/* 120px * 3 cards + 8px * 2 gaps = 384px */}
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-2 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 125}px)`, // 120px card + 2px gap
              }}
            >
              {vehicleList.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`flex-none w-[120px] border cursor-pointer ${
                    selectedKendaraan === vehicle.brand
                      ? "bg-primary-50 border-primary-700"
                      : "bg-white border-neutral-400"
                  } rounded-lg p-3`}
                  onClick={() => setSelectedKendaraan(vehicle.brand)}
                >
                  <div className="relative w-full aspect-square mb-2">
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.brand}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">{vehicle.year} •</p>
                    <p className="text-xs font-semibold">{vehicle.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Button */}
      <Button
        Class="!w-[174px] !h-8 !font-semibold text-sm mx-auto"
        onClick={() => {
          setModalOpen(false);
          setModalContent(<WebModal mode="add" {...formProps} />);
          setModalOpen(true);
          setModalConfig({
            width: 471,
            height: 291,
            classname: "!w-[471px] !h-fit",
            withHeader: false,
            withClose: true,
          });
        }}
      >
        Tambah Kendaraan
      </Button>
    </div>
  );
};

export const HapusKendaraanModal = () => {
  const { setShowToast, setDataToast } = toast();
  const { setModalOpen } = modal();

  const handleDelete = () => {
    console.log("trr");

    setModalOpen(false);
    setShowToast(true);
    setDataToast({
      message: "Berhasil menghapus kendaraan",
      type: "success",
    });
  };
  return (
    <div className="p-9 space-y-6 sm:space-y-4 w-fit">
      <span className="hidden sm:block font-bold text-base text-center text-neutral-900 ">
        Hapus Data Kendaraan
      </span>
      <span className="font-medium text-sm leading-[16.8px] text-center text-neutral-900 block w-[338px] sm:w-auto sm:flex sm:justify-center mt-0">
        Apakah kamu yakin ingin menghapus data kendaraan ini?
      </span>
      <div className="!font-semibold !text-sm flex gap-2 w-fit justify-center mx-auto">
        <Button
          color="primary_secondary"
          Class="!w-[112px] !h-8 sm:!font-semibold"
          onClick={() => setModalOpen(false)}
        >
          Batal
        </Button>
        <Button
          Class="!w-[112px] !h-8 sm:!font-semibold"
          onClick={() => handleDelete()}
        >
          Ya
        </Button>
      </div>
    </div>
  );
};
