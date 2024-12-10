"use client";

import { useState } from "react";

import AddressForm from "./AddressForm";

const LocationManagement = () => {
  return (
    <div>
      <AddressForm />
      {/* <pre>{JSON.stringify(addressData, null, 2)}</pre> */}
    </div>
  );
};

export default LocationManagement;
