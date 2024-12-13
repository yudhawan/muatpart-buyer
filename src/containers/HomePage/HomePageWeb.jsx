"use client";

import { useState } from "react";
import style from "./HomePage.module.scss";
import Image from "next/image";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import ProductComponent from "@/components/ProductComponent/ProductComponent";
import ImageSlider from "@/components/ImageSlider/ImageSlider";

function HomePageWeb({ lastSeenProducts }) {
  const [filter, setVehicle] = useState({
    vehicle: {
      name: "Semua Jenis Kendaraan",
      value: "",
    },
    brand: {
      name: "Semua Brand",
      value: "",
    },
    year: {
      name: "Semua Tahun",
      value: "",
    },
    model: {
      name: "Semua Model",
      value: "",
    },
    type: {
      name: "Semua Tipe",
      value: "",
    },
    keyword: "",
  });

  const [options, setOptions] = useState({
    vehicle: [
      { name: "Semua Jenis Kendaraan", value: "" },
      { name: "Mobil", value: "mobil" },
      { name: "Motor", value: "motor" },
    ],
    brand: [
      { name: "Semua Brand", value: "" },
      { name: "Toyota", value: "toyota" },
      { name: "Honda", value: "honda" },
    ],
    year: [
      { name: "Semua Tahun", value: "" },
      { name: "2021", value: "2021" },
      { name: "2020", value: "2020" },
    ],
    model: [
      { name: "Semua Model", value: "" },
      { name: "Corolla", value: "corolla" },
      { name: "Civic", value: "civic" },
    ],
    type: [
      { name: "Semua Tipe", value: "" },
      { name: "Sedan", value: "sedan" },
      { name: "Hatchback", value: "hatchback" },
    ],
  });

  const headerImages = [
    {
      src: "https://placehold.co/500x250/orange/white",
      alt: "Slider image 1",
    },
    {
      src: "https://placehold.co/500x250/purple/white",
      alt: "Slider image 2",
    },
    {
      src: "https://placehold.co/500x250/green/white",
      alt: "Slider image 3",
    },
  ];

  const promotionImages = [
    {
      src: "https://placehold.co/500x250/blue/white",
      alt: "Promotion image 1",
    },
    {
      src: "https://placehold.co/500x250/red/white",
      alt: "Promotion image 2",
    },
    {
      src: "https://placehold.co/500x250/brown/white",
      alt: "Promotion image 3",
    },
  ];

  const handleInputChange = (e) => {
    setVehicle({ ...filter, keyword: e.target.value });
  };

  return (
    <div>
      <pre>{/* <code>{JSON.stringify(filter, null, 2)}</code> */}</pre>
      <section className="bg-neutral-100">
        <div className="flex justify-center gap-10 max-w-[1280px] mx-auto py-6">
          <div className="max-w-[500px]">
            <ImageSlider baseImages={headerImages} />
          </div>
          <div className="w-[380px] space-y-3">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-sm">
                Pilih jenis kendaraan untuk mencari suku cadang
              </div>
              <Image
                src={"/icons/reset.svg"}
                width={16}
                height={16}
                alt="reset"
                onClick={() => {}}
                className="cursor-pointer hover:rotate-45 transition-transform"
              />
            </div>

            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-3 gap-3">
              <Dropdown
                options={options.vehicle}
                placeholder="Pilih Jenis Kendaraan"
                classname="!w-full col-span-4"
                onSearchValue
                leftIconElement={
                  <span
                    className={`${style.numberCircle} ${
                      filter.vehicle.value ? style.active : style.inactive
                    }`}
                  >
                    1
                  </span>
                }
                onSelected={(val) => setVehicle({ ...filter, vehicle: val[0] })}
              />
              <Dropdown
                options={options.brand}
                placeholder="Pilih Brand"
                classname="!w-full col-span-2"
                onSearchValue
                leftIconElement={
                  <span
                    className={`${style.numberCircle} ${
                      filter.brand.value ? style.active : style.inactive
                    }`}
                  >
                    2
                  </span>
                }
                onSelected={(val) => setVehicle({ ...filter, brand: val[0] })}
              />
              <Dropdown
                options={options.year}
                placeholder="Pilih Tahun"
                classname="!w-full col-span-2"
                onSearchValue
                leftIconElement={
                  <span
                    className={`${style.numberCircle} ${
                      filter.year.value ? style.active : style.inactive
                    }`}
                  >
                    3
                  </span>
                }
                onSelected={(val) => setVehicle({ ...filter, year: val[0] })}
              />
              <Dropdown
                options={options.model}
                placeholder="Pilih Model"
                classname="!w-full col-span-2"
                onSearchValue
                leftIconElement={
                  <span
                    className={`${style.numberCircle} ${
                      filter.model.value ? style.active : style.inactive
                    }`}
                  >
                    4
                  </span>
                }
                onSelected={(val) => setVehicle({ ...filter, model: val[0] })}
              />
              <Dropdown
                options={options.type}
                placeholder="Pilih Tipe"
                classname="!w-full col-span-2"
                onSearchValue
                leftIconElement={
                  <span
                    className={`${style.numberCircle} ${
                      filter.type.value ? style.active : style.inactive
                    }`}
                  >
                    5
                  </span>
                }
                onSelected={(val) => setVehicle({ ...filter, type: val[0] })}
              />
              <Input
                placeholder="Masukkan kata kunci (Nama Barang, Nomor Parts, Brand)"
                classname="!w-full col-span-4"
                icon={{
                  left: (
                    <span
                      className={`${style.numberCircle} ${
                        filter.keyword ? style.active : style.inactive
                      }`}
                    >
                      6
                    </span>
                  ),
                }}
                value={filter.keyword}
                changeEvent={handleInputChange}
              />
              <Button Class="!max-w-full col-span-4">Cari Sparepart</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex py-6 mx-auto">
        <ImageSlider baseImages={promotionImages} />
      </section>
      <section className="flex flex-col gap-4 w-[1080px] mx-auto py-6">
        <h1 className="text-neutral-900 font-semibold text-base">
          Terakhir Dilihat
        </h1>
        <div className="w-full flex gap-3 overflow-scroll no-scrollbar">
          {lastSeenProducts.products.map((val) => {
            return <ProductComponent key={val.id} {...val} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePageWeb;
