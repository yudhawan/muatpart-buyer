"use client";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import HomePageResponsive from "./HomePageResponsive";
import HomePageWeb from "./HomePageWeb";
import SWRHandler from "@/services/useSWRHook";
import { headerImages, bannerImages, promotionImages } from "./mock";

function HomePage() {
  const VEHICLE_OPTIONS_ENDPOINT =
    process.env.NEXT_PUBLIC_GLOBAL_API + "muatparts/garasi/vehicle";

  const PRODUCT_POPULAR_ENDPOINT =
    process.env.NEXT_PUBLIC_GLOBAL_API + "muatparts/product/popular";

  const JOINED_SELLERS_ENDPOINT =
    process.env.NEXT_PUBLIC_GLOBAL_API + "muatparts/landing/partners";

  const [state, setState] = useState();

  const { useSWRHook, useSWRMutateHook } = new SWRHandler();

  const { data: mostVisitedProducts } = useSWRHook(PRODUCT_POPULAR_ENDPOINT);

  const { data: vehicleOptions } = useSWRHook(VEHICLE_OPTIONS_ENDPOINT);

  const { data: joinedSellers } = useSWRHook(JOINED_SELLERS_ENDPOINT);

  const { isMobile } = viewport();
  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile)
    return (
      <HomePageResponsive
        lastSeenProducts={mostVisitedProducts?.Data ?? []}
        headerImages={headerImages}
        bannerImages={bannerImages}
        promotionImages={promotionImages}
        joinedSellers={joinedSellers?.Data ?? []}
      />
    );
  return (
    <HomePageWeb
      vehicleOptions={vehicleOptions?.Data ?? []}
      lastSeenProducts={mostVisitedProducts?.Data ?? []}
      mostVisitedProducts={mostVisitedProducts?.Data ?? []}
      youMightLike={mostVisitedProducts?.Data ?? []}
      headerImages={headerImages}
      bannerImages={bannerImages}
      promotionImages={promotionImages}
      joinedSellers={joinedSellers?.Data ?? []}
    />
  );
}

export default HomePage;
