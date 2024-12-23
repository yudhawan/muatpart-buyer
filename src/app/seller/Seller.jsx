"use client";

import { viewport } from "@/store/viewport";
import SellerWeb from "./SellerWeb";

function Seller() {
  const { isMobile } = viewport();

  if (typeof isMobile !== "boolean") return null;

  return isMobile ? (
    <div>
      responsive
    </div>
  ) : (
    <SellerWeb
    />
  );
}

export default Seller;
