"use client";
import { useState, useEffect } from "react";
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
import { HapusKendaraanModal } from "./web";
import toast from "@/store/toast";
import TambahMobile from "@/app/garasi/firsttimer/mobile";
import { useRouter } from "next/navigation";
import { useHeader } from "@/common/ResponsiveContext";

export default function Mobile({
  selectedVehicle,
  setSelectedVehicle,
  categories,
  setCategories,
  searchTerm,
  setSearchTerm,
}) {
  const { setModalOpen, setModalContent, setModalConfig } = modal();
  const { setShowBottomsheet, setDataBottomsheet, setTitleBottomsheet } =
    toast();
  const { setAppBar } = useHeader();
  const formProps = useFormProps();
  const router = useRouter();

  useEffect(() => {
    setAppBar({
      title: "Garasi Saya",
      appBarType: "title",
    });
  }, []);

  return (
    <>
      {/* Vehicle Card */}
      <div className="bg-neutral-100 rounded-lg py-6 shadow-sm mb-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 h-fit">
          <div className="w-[116px] h-[116px] border border-neutral-400 rounded-md p-6 bg-neutral-50 relative">
            <Image
              src={selectedVehicle.image}
              alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
              width={68}
              height={68}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-3 justify-between w-[286px] mx-auto">
              <span className="font-bold text-base flex items-center justify-between gap-4">
                {selectedVehicle.type} · {selectedVehicle.brand} ·{" "}
                {selectedVehicle.year}
                <Pencil
                  className="cursor-pointer"
                  size={16}
                  onClick={() => {
                    setModalOpen(false);
                    // Create new instance of formProps
                    // const formProps = {
                    //   formState: {
                    //     vehicle: { value: "Mobil", error: "" },
                    //     brand: { value: "Toyota", error: "" },
                    //     year: { value: "2023", error: "" },
                    //     model: { value: "Innova", error: "" },
                    //     type: { value: "2.0 G", error: "" },
                    //   },
                    // };

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
                      classname: "!w-[296px] !h-fit",
                      withHeader: false,
                      withClose: true,
                    });
                  }}
                />
              </span>
              <p className="text-xs font-medium text-neutral-700">
                {selectedVehicle.model}
              </p>
              <p className="text-xs font-medium text-neutral-700">
                {selectedVehicle.variant}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <Button
                color="primary_secondary"
                Class="!min-w-[158px] !h-8 !text-sm !font-semibold"
                onClick={() => {
                  setTitleBottomsheet("Daftar Kendaraan");
                  setDataBottomsheet(<DaftarKendaraanBottomsheet />);
                  setShowBottomsheet(true);
                }}
              >
                Ganti (1)
              </Button>
              <Button
                Class="!min-w-[158px] !text-sm !h-8 !font-semibold"
                onClick={() => {
                  router.push("/garasi/firsttimer?isAdd=true");
                }}
              >
                Tambah
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8 p-6 mx-auto">
        <h3 className="text-base font-bold mb-4">
          Cari Suku Cadang yang cocok dengan {selectedVehicle.brand}{" "}
          {selectedVehicle.year}
        </h3>
        <div className="flex gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari Suku Cadang"
              value={searchTerm}
              changeEvent={(e) => setSearchTerm(e.target.value)}
              classInput="w-full !pl-[35px]"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-6">
        <h3 className="text-base font-bold mb-4">
          Kategori untuk {selectedVehicle.brand} {selectedVehicle.year}
        </h3>
        {/* <DataNotFound
          image={"/img/daftarprodukicon.png"}
          title="Belum ada kategori yang cocok dengan jenis kendaraan kamu"
          textClass="!w-full"
        /> */}
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-[14px] w-full h-fit rounded-md border hover:border-primary-600 cursor-pointer relative"
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
                <p className="text-sm font-bold max-w-[109px] truncate">
                  {category.name}
                </p>
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

export const DaftarKendaraanBottomsheet = ({
  selectedVehicle,
  setSelectedVehicle,
}) => {
  const { setModalOpen, setModalContent, setModalConfig } = modal();
  const { setShowBottomsheet, setShowToast, setDataToast } = toast();
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

  useEffect(() => {
    setShowBottomsheet(false);
    setShowToast(true);
    setDataToast({ type: "success", message: "Berhasil mengganti kendaraan" });
  }, [selectedKendaraan]);

  return (
    <div className="relative">
      <div className="w-full mx-auto flex flex-col gap-2 overflow-auto max-h-[400px] !z-10">
        {vehicleList.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`flex w-full h-[84px] border cursor-pointer ${
              selectedKendaraan === vehicle.brand
                ? "bg-primary-50 border-primary-700"
                : "bg-white border-neutral-400"
            } rounded-lg p-3`}
            onClick={() => setSelectedKendaraan(vehicle.brand)}
          >
            <div className="relative w-[68px] h-auto aspect-square">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.brand}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex ml-2 font-bold text-sm justify-center flex-col gap-1">
              <p>{vehicle.year} •</p>
              <p>{vehicle.brand}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        Class="!max-w-full !min-w-full !h-8 !font-semibold text-sm mx-auto mt-4"
        onClick={() => {
          setShowBottomsheet(false);
          setModalOpen(false);
          setModalContent(<WebModal mode="add" {...formProps} />);
          setModalOpen(true);
          setModalConfig({
            width: 471,
            height: 291,
            classname: "!w-[471px] !h-fit !z-20",
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
