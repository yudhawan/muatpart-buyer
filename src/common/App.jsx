"use client";
import React, { useEffect, useState } from "react";
import ResponsiveProvider from "./ResponsiveContext";
import { viewport } from "@/store/viewport";
import { headerProps } from "@/containers/HeaderContainer/headerProps";
import SWRHandler, { SWRHandlerConfig } from "@/services/useSWRHook";
import { categoriesZustand } from "@/store/products/categoriesZustand";
import { useSearchParams } from "next/navigation";
import { authZustand } from "@/store/auth/authZustand";
import { userZustand } from "@/store/auth/userZustand";

function App({ children }) {
  
  const { setIsmobile, isMobile } = viewport();
  const { headerHeight } = headerProps();
  const {useSWRHook,useSWRMutateHook} = SWRHandlerConfig
  const {data} = useSWRHook(process.env.NEXT_PUBLIC_GLOBAL_API+'muatparts/product/category')
  const {data:auth,trigger} = useSWRMutateHook(process.env.NEXT_PUBLIC_GLOBAL_API+'muatparts/auth/credential-check')
  const {setCategories}=categoriesZustand()
  const {accessToken,refreshToken,setToken}=authZustand()
  const {setUser,name} = userZustand()
  const searchParams = useSearchParams()
  useEffect(()=>{
    if(accessToken&&refreshToken) trigger({accessToken,refreshToken}) 
  },[accessToken,refreshToken])
  useEffect(()=>{
    if(!accessToken&&searchParams.get('accessToken')) trigger({accessToken:searchParams.get('accessToken')}) 
  },[searchParams])

  useEffect(()=>{
    if(auth?.data?.Data) {
      let data = auth?.data?.Data
      setToken({accessToken:data?.accessToken,refreshToken:data?.refreshToken})
      delete data.accessToken
      delete data.refreshToken
      setUser(data)
    }
  },[auth])

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
