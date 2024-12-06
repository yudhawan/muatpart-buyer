import React from "react";
import { Dropdown } from "./ui/Dropdown";
import { CustomTextArea } from "./ui/CustomTextArea";
import useLocationManagementStore from "@/store/locationManagementStore";
import { CustomInput } from "./ui/CustomInput";

const AddressForm = () => {
  const {
    address,
    location,
    kecamatan,
    kota,
    provinsi,
    postalCode,

    setAddress,
    setLocation,
    setKecamatan,
    setPostalCode,
  } = useLocationManagementStore();
  const postalCodeList = [
    "12345",
    "67890",
    "54321",
    "09876",
    "13579",
    "24680",
    "97531",
    "86420",
    "75319",
    "64280",
  ];

  const kecamatanList = [
    "Kebayoran Baru",
    "Kebayoran Lama",
    "Kebon Jeruk",
    "Kelapa Gading",
    "Kemayoran",
    "Kembangan",
    "Kuningan",
    "Mampang Prapatan",
    "Matraman",
    "Palmerah",
  ];

  return (
    <div className="space-y-4 my-4 mx-12 text-xs">
      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Alamat*</label>
        <CustomTextArea
          className="w-2/3"
          label="Alamat"
          maxLength={60}
          errorMessage="Alamat tidak boleh kosong"
          onChange={(value) => setAddress(value)}
          onBlur={(value) => setLocation(value)}
        />
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Lokasi*</label>
        <CustomInput
          autoFillValue={location}
          onChange={(value) => setLocation(value)}
        />
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kecamatan*</label>
        <Dropdown
          className="w-2/3"
          items={kecamatanList}
          label="Kecamatan"
          onChange={setKecamatan}
        />
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kota</label>
        <div className="w-2/3 text-neutral-900 font-medium">
          {kota ? kota : "-"}
        </div>
      </div>
      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Provinsi</label>
        <div className="w-2/3 text-neutral-900 font-medium">
          {provinsi ? provinsi : "-"}
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kode Pos*</label>
        <Dropdown
          className="w-2/3"
          items={postalCodeList}
          label="Kode Pos"
          onChange={setPostalCode}
        />
      </div>
      <ul>
        <li>Alamat: {address}</li>
        <li>Lokasi: {location}</li>
        <li>Kecamatan: {kecamatan}</li>
        <li>Kode Pos: {postalCode}</li>
      </ul>
    </div>
  );
};

export default AddressForm;
