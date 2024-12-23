"use client";

import { useEffect, useState } from "react";
import style from "./HomePage.module.scss";
import Image from "next/image";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import MultipleItems from "@/components/ReactSlick/MultipleItems";
import ProductGrid from "@/components/ProductsSectionComponent/ProductGrid";
import CategoriesHandler from "@/libs/CategoriesHandler";

function HomePageWeb({
  headerImages,
  bannerImages,
  promotionImages,
  joinedSellers,
  vehicleOptions,
  lastSeenProducts,
  mostVisitedProducts,
  youMightLike,
}) {
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

  useEffect(() => {
    if (vehicleOptions) {
      const vehicle = vehicleOptions.map((val) => {
        return {
          name: val.value,
          value: val.id,
        };
      });

      setOptions({
        ...options,
        vehicle: [{ name: "Semua Jenis Kendaraan", value: "" }, ...vehicle],
      });
    }
  }, [vehicleOptions]);

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
            <MultipleItems
              items={headerImages}
              settings={{
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                arrows: false,
              }}
              size={500}
              className="rounded-xl"
            />
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
          <MultipleItems
            items={bannerImages}
            settings={{
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              dots: true,
            }}
            size={1000}
            className="rounded-xl"
          />
        </div>
      </section>

      <ProductGrid
        totalProducts={Array(42).fill(mostVisitedProducts).flat().slice(0, 42)}
        title="Produk Yang Banyak Dikunjungi"
      />

      <ProductGrid
        totalProducts={Array(42).fill(youMightLike).flat().slice(0, 42)}
        title="Mungkin Kamu Juga Suka"
      />

      <section className="bg-white py-6">
        <div className="w-[1012px] mx-auto space-y-7">
          <h1 className="text-neutral-900 font-bold text-lg">
            Promo muatparts Mart
          </h1>
          <MultipleItems
            items={promotionImages}
            settings={{
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
            }}
            size={500}
            className="rounded-xl"
          />
        </div>
      </section>

      <ProductGrid
        totalProducts={Array(6).fill(lastSeenProducts).flat().slice(0, 6)}
        title="Terakhir Dilihat"
      />

      <section className="bg-neutral-100 relative pt-px">
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
        <div className="w-[1080px] mx-auto">
          <h1 className="text-neutral-900 mt-10 mb-24 font-bold text-[28px] text-center">
            Penjual yang Telah Bergabung
          </h1>
          <MultipleItems
            items={joinedSellers}
            settings={{
              slidesToShow: joinedSellers.length < 8 ? joinedSellers.length : 8,
              slidesToScroll: 1,
              autoplay: false,
            }}
            size={64}
            arrowPadding="32px"
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  );
}

export default HomePageWeb;
