"use client";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import HomePageResponsive from "./HomePageResponsive";
import HomePageWeb from "./HomePageWeb";
import SWRHandler from "@/services/useSWRHook";

function HomePage() {
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
  if (isMobile)
    return (
      <HomePageResponsive lastSeenProducts={mostVisitedProducts?.Data ?? []} />
    );
  return (
    <HomePageWeb
      lastSeenProducts={mostVisitedProducts?.Data ?? []}
      mostVisitedProducts={mostVisitedProducts?.Data ?? []}
      youMightLike={mostVisitedProducts?.Data ?? []}
    />
  );
}

export default HomePage;
