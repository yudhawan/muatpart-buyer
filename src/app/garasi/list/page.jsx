"use client";

import { useState, useEffect } from "react";
import Web from "@/app/garasi/list/web";
import Mobile from "@/app/garasi/list/mobile";
import Toast from "@/components/Toast/Toast";
import Modal from "@/components/AI/Modal";
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import toast from "@/store/toast";
import SWRHandler from "@/services/useSWRHook";

const api = process.env.NEXT_PUBLIC_API_HASYIM;
// Data awal
const initialVehicle = {
  type: "Truk",
  brand: "Mitsubishi Fuso",
  year: "2022",
  model: "Canter FE160",
  variant: "FEC72S Straight Truck - Low TRB",
  image: "/img/chopper.png",
};

const initialCategories = [
  {
    id: "transmisi",
    name: "Transmisi",
    icon: "chopper",
    count: 2,
  },
  // ... kategori lainnya
];

const MainListGarasi = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [garageList, setGarageList] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const { dataBottomsheet } = toast();
  const { useSWRHook } = new SWRHandler();
  const defaultID = 'f0f02206-e33f-4967-914c-2ca6b30fd6b8'

  const { data: garageSelected, error: garageSelectedError } = useSWRHook(
    `${api}v1/muatparts/garasi/lists?id=${defaultID}`
  );
  const { data: garageLists, error: garageError } = useSWRHook(
    `${api}v1/muatparts/garasi/lists`
  );

  useEffect(() => {
    console.log(garageSelected)
    
    if (garageSelected) {
      setSelectedVehicle(garageSelected.Data);
    }
  }, [garageSelected]);

  useEffect(() => {
    console.log(garageLists);

    if (garageLists) {
      setGarageList(garageLists.Data);
    }
  }, [garageLists]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sharedProps = {
    selectedVehicle,
    setSelectedVehicle,
    categories,
    setCategories,
    searchTerm,
    setSearchTerm,
    garageList,
    selectedVehicle,
  };

  return isMobile ? (
    <>
      <Toast />
      <Modal />
      <Bottomsheet>{dataBottomsheet}</Bottomsheet>
      <Mobile {...sharedProps} />
    </>
  ) : (
    <>
      <Toast />
      <Modal />
      <div className="pt-8 w-full">
        <span className="pb-1 px-10 capitalize font-bold text-xl">
          garasi saya
        </span>
        <Web {...sharedProps} />
      </div>
    </>
  );
};

export default MainListGarasi;
