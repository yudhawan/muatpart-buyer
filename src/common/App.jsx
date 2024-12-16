"use client";
import React, { useEffect } from "react";
import ResponsiveProvider from "./ResponsiveContext";
import { viewport } from "@/store/viewport";
import { headerProps } from "@/containers/HeaderContainer/headerProps";
import SWRHandler from "@/services/useSWRHook";
import { categoriesZustand } from "@/store/products/categoriesZustand";

function App({ children }) {
  const { setIsmobile, isMobile } = viewport();
  const { headerHeight } = headerProps();
  const {useSWRHook} = new SWRHandler()
  const {data} = useSWRHook(process.env.NEXT_PUBLIC_GLOBAL_API+'muatparts/product/category')
  const {setCategories}=categoriesZustand()
  useEffect(()=>{
    if(data?.Data?.length) setCategories(data?.Data)
  },[data])
  useEffect(() => {
    if (window.innerWidth < 500) setIsmobile(true);
    else setIsmobile(false);
    window.addEventListener("resize", () => {
      if (window.innerWidth < 500) setIsmobile(true);
      else setIsmobile(false);
    });
    return () => window.addEventListener("resize", () => {});
  }, []);
  return (
    <ResponsiveProvider>
      <div
        style={{
          marginTop: `${headerHeight}px`,
          // height: `calc(100vh - ${headerHeight}px)`,
        }}
        className={`w-full bg-neutral-50`}
      >
        {children}
      </div>
    </ResponsiveProvider>
  );
}

export default App;
