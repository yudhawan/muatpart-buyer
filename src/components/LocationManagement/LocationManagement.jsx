"use client";

import { useState, useEffect } from "react";

import AddressForm from "./AddressForm";

// ***NOTE
// list msg errors pada location management dikirim berupa object, bentuknya seperti di bawah ini:
// {
//     "storeName": "Wajib diisi",
//     "email": "Wajib diisi",
// }
// ***NOTE

const LocationManagement = ({ errors, value }) => {
  const [addressData, setAddressData] = useState({});

  useEffect(() => {
    value(addressData);
  }, [addressData]);

  return (
    <div>
      <AddressForm AddressData={(data) => setAddressData(data)} />
      <pre>{JSON.stringify(addressData, null, 2)}</pre>
    </div>
  );
};

export default LocationManagement;
