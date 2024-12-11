"use client";

import { useState } from "react";

import AddressForm from "./AddressForm";

const LocationManagement = () => {
  const [addressData, setAddressData] = useState({});

  return (
    <div>
      <AddressForm AddressData={(data) => setAddressData(data)} />
      <pre>{JSON.stringify(addressData, null, 2)}</pre>
    </div>
  );
};

export default LocationManagement;
