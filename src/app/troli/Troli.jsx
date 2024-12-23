"use client";
import { viewport } from "@/store/viewport";
import React, { useState } from "react";
import TroliResponsive from "./TroliResponsive";
import TroliWeb from "./TroliWeb";
import SWRHandler from "@/services/useSWRHook";
import { sellerItems } from "./mock";

function Troli() {
  const [state, setState] = useState();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const { isMobile } = viewport();
  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile) return <TroliResponsive />;
  return <TroliWeb sellerItems={sellerItems} />;
}

export default Troli;
