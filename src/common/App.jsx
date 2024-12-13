"use client";
import React, { useEffect } from "react";
import ResponsiveProvider from "./ResponsiveContext";
import { viewport } from "@/store/viewport";
import { headerProps } from "@/containers/HeaderContainer/headerProps";

function App({ children }) {
  const { setIsmobile, isMobile } = viewport();
  const { headerHeight } = headerProps();
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
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        className={`w-full`}
      >
        {children}
      </div>
    </ResponsiveProvider>
  );
}

export default App;
