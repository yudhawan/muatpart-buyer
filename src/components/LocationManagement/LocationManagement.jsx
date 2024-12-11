"use client";

import { useState } from "react";

import AddressForm from "./AddressForm";

// ***NOTE
// list msg error pada location management dikirim berupa object, bentuknya seperti di bawah ini:
// {
//     "storeName": "Wajib diisi",
//     "email": "Wajib diisi"
// }
// ***NOTE


const LocationManagement = ({ errors }) => {
  const [addressData, setAddressData] = useState({});

  return (
    <div>
      <AddressForm
        errors={errors}
        AddressData={(data) => setAddressData(data)}
      />
      {addressData.length && <pre>{JSON.stringify(addressData, null, 2)}</pre>}
    </div>
  );
};

export default LocationManagement;
