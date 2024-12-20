"use client";

import { viewport } from "@/store/viewport";
import SellerWeb from "./SellerWeb";
import SellerResponsive from "./SellerResponsive";
import { useState } from "react";

function Seller() {
  const [activeTab, setActiveTab] = useState(0);
  const { isMobile } = viewport();

  const tabs = ["Beranda", "Etalase", "Ulasan"];

  if (typeof isMobile !== "boolean") return null;

  return isMobile ? (
    <SellerResponsive
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabs={tabs}
    />
  ) : (
    <SellerWeb
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabs={tabs}
    />
  );
}

export default Seller;
