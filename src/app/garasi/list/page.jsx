"use client";

import { useState, useEffect } from "react";
import Web from "@/app/garasi/list/web";
import Mobile from "@/app/garasi/list/mobile";
import Toast from "@/components/Toast/Toast";
import Modal from "@/components/AI/Modal";
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import toast from "@/store/toast";

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
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicle);
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const { dataBottomsheet } = toast();

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
