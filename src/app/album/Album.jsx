"use client";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import AlbumResponsive from "./AlbumResponsive";
import AlbumWeb from "./AlbumWeb";
import SWRHandler from "@/services/useSWRHook";
import { albumItems } from "./mock";

function Album() {
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
  if (isMobile) return <AlbumResponsive />;
  return (
    <AlbumWeb
      albumItems={albumItems}
      lastVisited={mostVisitedProducts?.Data ?? []}
    />
  );
}

export default Album;
