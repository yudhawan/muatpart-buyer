"use client";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import TroliResponsive from "./TroliResponsive";
import TroliWeb from "./TroliWeb";
import SWRHandler from "@/services/useSWRHook";
import { sellerItems } from "./mock";

function Troli() {
  const PRODUCT_POPULAR_ENDPOINT =
    process.env.NEXT_PUBLIC_GLOBAL_API + "muatparts/product/popular";

  const [state, setState] = useState();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();

  const {
    data: mostVisitedProducts,
    error,
    isLoading,
  } = useSWRHook(PRODUCT_POPULAR_ENDPOINT);

  const { isMobile } = viewport();
  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile) return <TroliResponsive />;
  return (
    <TroliWeb
      sellerItems={sellerItems}
      yourWishlist={mostVisitedProducts?.Data ?? []}
      recommendedProducts={mostVisitedProducts?.Data ?? []}
    />
  );
}

export default Troli;
