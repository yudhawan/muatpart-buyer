"use client";

import { useState } from "react";
import style from "./HomePage.module.scss";
import Image from "next/image";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import ProductComponent from "@/components/ProductComponent/ProductComponent";
import ImageSlider from "@/components/ImageSlider/ImageSlider";

function HomePageWeb({ lastSeenProducts, mostVisitedProducts, youMightLike }) {
  const [filter, setVehicle] = useState({
    vehicle: {
      value: "",
      name: "",
    },
    brand: {
      value: "",
      name: "",
    },
    year: {
      value: "",
      name: "",
    },
    model: {
      value: "",
      name: "",
    },
    type: {
      value: "",
      name: "",
    },
    keyword: "",
  });

  // reset state
  const resetFilter = () => {
    setVehicle({
      vehicle: {
        value: "",
        name: "",
      },
      brand: {
        value: "",
        name: "",
      },
      year: {
        value: "",
        name: "",
      },
      model: {
        value: "",
        name: "",
      },
      type: {
        value: "",
        name: "",
      },
      keyword: "",
    });
  };

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

  const bannerImages = [
    {
      src: "https://placehold.co/1000x250/blue/white",
      alt: "Promotion image 1",
    },
    {
      src: "https://placehold.co/1000x250/red/white",
      alt: "Promotion image 2",
    },
    {
      src: "https://placehold.co/1000x250/brown/white",
      alt: "Promotion image 3",
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
      {/* <pre>
        <code>{JSON.stringify(filter, null, 2)}</code>
      </pre> */}
      <section className="bg-neutral-100 py-6">
        <div className="flex justify-center gap-10 max-w-7xl mx-auto">
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
                onClick={() => resetFilter()}
                className="cursor-pointer hover:rotate-45 transition-transform"
              />
            </div>

            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-3 gap-3">
              <Dropdown
                defaultValue={filter.vehicle}
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
                defaultValue={filter.brand}
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
                defaultValue={filter.year}
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
                defaultValue={filter.model}
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
                defaultValue={filter.type}
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
      <section className="bg-white py-6">
        <div className="w-[1000px] mx-auto">
          <ImageSlider baseImages={bannerImages} />
        </div>
      </section>
      <section className="bg-white py-6">
        <div className="w-[1080px] mx-auto space-y-7">
          <h1 className="text-neutral-900 font-bold text-lg">
            Produk Yang Banyak Dikunjungi
          </h1>
          <div className="w-full grid grid-cols-6 gap-3">
            {Array(Math.ceil(18 / mostVisitedProducts.products.length))
              .fill(mostVisitedProducts.products)
              .flat()
              .slice(0, 18)
              .map((val) => {
                return <ProductComponent key={val.id} {...val} />;
              })}
          </div>

          <Button Class="place-self-center">Muat Lebih Banyak</Button>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="w-[1080px] mx-auto space-y-7">
          <h1 className="text-neutral-900 font-bold text-lg">
            Mungkin Kamu Juga Suka
          </h1>
          <div className="w-full grid grid-cols-6 gap-3">
            {Array(Math.ceil(18 / mostVisitedProducts.products.length))
              .fill(mostVisitedProducts.products)
              .flat()
              .slice(0, 18)
              .map((val) => {
                return <ProductComponent key={val.id} {...val} />;
              })}
          </div>

          <Button Class="place-self-center">Muat Lebih Banyak</Button>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="w-[1012px] mx-auto space-y-7">
          <h1 className="text-neutral-900 font-bold text-lg">
            Promo muatparts Mart
          </h1>
          <div className="flex gap-3">
            <ImageSlider baseImages={promotionImages} />
            <ImageSlider baseImages={promotionImages} />
          </div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="w-[1080px] mx-auto space-y-7">
          <h1 className="text-neutral-900 font-bold text-lg">
            Terakhir Dilihat
          </h1>
          <div className="w-full grid grid-cols-6 gap-3">
            {lastSeenProducts.products.map((val) => {
              return <ProductComponent key={val.id} {...val} />;
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 relative">
        <h1 className="text-neutral-900 my-10 font-bold text-[28px] text-center">
          Keuntungan belanja di muatparts
        </h1>
        <div className="absolute flex flex-col items-center max-w-7xl left-0 right-0 bottom-0 mx-auto">
          <div className="grid grid-cols-4 gap-14">
            <div className="max-w-[200px] space-y-3">
              <Image
                src={"/img/web-keuntungan-1.png"}
                alt="image"
                width={185.4}
                height={178}
              />
              <div className="text-center font-bold leading-5">
                Layanan pengembalian 7 hari setelah pesanan selesai
              </div>
            </div>
            <div className="max-w-[200px] space-y-3">
              <Image
                src={"/img/web-keuntungan-2.png"}
                alt="image"
                width={200}
                height={200}
              />
              <div className="text-center font-bold leading-5">
                Keamanan Pembayaran
              </div>
            </div>
            <div className="max-w-[200px] space-y-3">
              <Image
                src={"/img/web-keuntungan-3.png"}
                alt="image"
                width={200}
                height={200}
              />
              <div className="text-center font-bold leading-5">
                Gratis Pengiriman
              </div>
            </div>
            <div className="max-w-[200px] space-y-3">
              <Image
                src={"/img/web-keuntungan-4.png"}
                alt="image"
                width={200}
                height={200}
              />
              <div className="text-center font-bold leading-5">
                Sparepart Terlengkap
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-[200px] mt-24 w-full rounded-t-[40px]"></div>
      </section>

      <section className="bg-white py-16">
        <h1 className="text-neutral-900 my-10 font-bold text-[28px] text-center">
          Penjual yang Telah Bergabung
        </h1>
        <div className="w-[1120px] mx-auto">
          <ImageSlider baseImages={bannerImages} />
        </div>
      </section>
    </div>
  );
}

export default HomePageWeb;
