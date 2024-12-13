"use client";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import HomePageResponsive from "./HomePageResponsive";
import HomePageWeb from "./HomePageWeb";
import SWRHandler from "@/services/useSWRHook";
import { mockProductsData } from "./mock";

function HomePage() {
  const [state, setState] = useState();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const { isMobile } = viewport();
  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile)
    return <HomePageResponsive lastSeenProducts={mockProductsData} />;
  return <HomePageWeb lastSeenProducts={mockProductsData} />;
}

export default HomePage;
