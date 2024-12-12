"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";

function HomePageWeb() {
  const [vehicle, setVehicle] = useState({});

  // const resetAllState()

  return (
    <div>
      <section className="bg-neutral-100">
        <div className="flex max-w-[1280px] mx-auto py-6">
          <div className="w-6/12 bg-violet-300 m-5">a</div>
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
                placeholder="Pilih Jenis Kendaraan"
                classname="!w-full col-span-4"
                onSearchValue
              />
              <Dropdown
                placeholder="Pilih Brand"
                classname="!w-full col-span-2"
                onSearchValue
              />
              <Dropdown
                placeholder="Pilih Tahun"
                classname="!w-full col-span-2"
                onSearchValue
              />
              <Dropdown
                placeholder="Pilih Model"
                classname="!w-full col-span-2"
                onSearchValue
              />
              <Dropdown
                placeholder="Pilih Tipe"
                classname="!w-full col-span-2"
                onSearchValue
              />
              <Dropdown
                placeholder="Masukkan kata kunci (Nama Barang, Nomor Parts, Brand)"
                classname="!w-full col-span-4"
                onSearchValue
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePageWeb;
