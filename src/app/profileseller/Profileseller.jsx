"use client";

import { viewport } from "@/store/viewport";
import { useState, useEffect } from "react";
import ProfilesellerResponsive from "./ProfilesellerResponsive";
import ProfilesellerWeb from "./ProfilesellerWeb";
import SWRHandler from "@/services/useSWRHook";
import profileSeller from "@/store/profileSeller";

const api = process.env.NEXT_PUBLIC_API_FRIDAY;

function Profileseller() {
  // const [profileData, setProfileData] = useState();
  const { setProfileData } = profileSeller();
  const { useSWRHook } = new SWRHandler();
  const { isMobile } = viewport();

   const { data: dataProfile } = useSWRHook(
     `${api}v1/muatparts/profile`, // url
     null, // customFetch
     null, // cbError
     {
       // option
       method: "GET",
       revalidateOnFocus: false,
       revalidateOnMount: true,
       revalidateOnReconnect: false,
       refreshInterval: 0,
     }
   );

   useEffect(() => {
     if (dataProfile?.Data) {
       setProfileData(dataProfile.Data);
     }
   }, [dataProfile, setProfileData]);

  if (typeof isMobile !== "boolean") return <></>; //buat skeleton
  if (isMobile) return <ProfilesellerResponsive />;
  return <ProfilesellerWeb />;
}

export default Profileseller;
