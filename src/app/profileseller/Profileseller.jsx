"use client";

import { viewport } from "@/store/viewport";
import { useState, useEffect } from "react";
import ProfilesellerResponsive from "./ProfilesellerResponsive";
import ProfilesellerWeb from "./ProfilesellerWeb";
import SWRHandler from "@/services/useSWRHook";
import profileSeller from "@/store/profileSeller";
import { useSWRConfig } from "swr";

const api = process.env.NEXT_PUBLIC_GLOBAL_API;

function Profileseller() {
  const { profileData, setProfileData } = profileSeller();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const { isMobile } = viewport();
  const { mutate } = useSWRConfig();

  // Get initial profile data
  const { data: dataProfile } = useSWRHook(
    `${api}/muatparts/profile`,
    null,
    null,
    {
      method: "GET",
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );

  // Initialize SWR Handlers dengan key yang sesuai format API
  const { trigger: updateStoreTrigger } = useSWRMutateHook(
    `${api}/muatparts/profile/${profileData?.storeInformation?.id}`,
    "PUT"
  );

  const { trigger: updateCompanyTrigger } = useSWRMutateHook(
    `${api}/muatparts/profile/company/${profileData?.companyData?.id}`,
    "PUT"
  );

  const handleSaveStore = async (id, data) => {
    try {
      await updateStoreTrigger(
        {
          storeName: data.storeName,
          address: data.address,
          location: data.location,
          provinceID: data.provinceID,
          cityID: data.cityID,
          districtID: data.districtID,
          postalCode: data.postalCode,
          latitude: data.latitude,
          longitude: data.longitude,
          storeLogo: data.storeLogo,
        },
        `${api}/muatparts/profile/${id}`
      );

      mutate(`${api}/muatparts/profile`);
    } catch (error) {
      console.error("Save store error:", error);
      throw error;
    }
  };

  const handleSaveCompany = async (id, data) => {
    try {
      await updateCompanyTrigger(
        {
          address: data.address,
          location: data.location,
          provinceID: data.provinceID,
          cityID: data.cityID,
          districtID: data.districtID,
          postalCode: data.postalCode,
          latitude: data.latitude,
          longitude: data.longitude,
          companyLogo: data.companyLogo,
        },
        `${api}/muatparts/profile/company/${id}`
      ); // URL sebenarnya sebagai parameter kedua

      mutate(`${api}/muatparts/profile`);
    } catch (error) {
      console.error("Save company error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (dataProfile?.Data) {
      setProfileData(dataProfile.Data);
    }
  }, [dataProfile, setProfileData]);

  if (typeof isMobile !== "boolean") return <></>;
  if (isMobile)
    return (
      <ProfilesellerResponsive
        handleSaveStore={handleSaveStore}
        handleSaveCompany={handleSaveCompany}
      />
    );
  return (
    <ProfilesellerWeb
      handleSaveStore={handleSaveStore}
      handleSaveCompany={handleSaveCompany}
    />
  );
}

export default Profileseller;
