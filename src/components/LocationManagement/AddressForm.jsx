import React, { useState } from "react";
import useLocationManagementStore from "@/store/locationManagementStore";
import Dropdown from "../Dropdown/Dropdown";
import TextArea from "../TextArea/TextArea";
import Input from "../Input/Input";
import SWRHandler from "@/services/useSWRHook";
import MiniMap from "@/containers/MapContainer/MiniMap";
import Modal from "../Modals/modal";
import MapContainer from "@/containers/MapContainer/MapContainer";
import ModalComponent from "../Modals/ModalComponent";
import IconComponent from "../IconComponent/IconComponent";
import Image from "next/image";

const AddressForm = () => {
  const [addressInput, setAddressInput] = useState("");
  const swrHandler = new SWRHandler();
  const [isOpenMap,setOpenMap]=useState(false)
  const [getSearchLokasi,setSearchLokasi]=useState('')

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

  const formData = new FormData();
  formData.append("phrase", addressInput);
  formData.append("dataType", "json");

  const customFetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  const { data: autocompleteData, error: autocompleteError } =
    swrHandler.useSWRHook(
      addressInput
        ? `${process.env.NEXT_PUBLIC_INTERNAL_API}get_autocomplete_street`
        : null,
      customFetcher,
      (error) => {
        console.error("Autocomplete error:", error);
      }
    );

  const handleAddressBlur = (e) => {
    const value = e.target.value;
    setAddressInput(value);
    setAddress(value);
  };

  // Effect to handle autocomplete response
  React.useEffect(() => {
    if (autocompleteData) {
      console.log("Autocomplete results:", autocompleteData);
      // Handle the autocomplete data here
      // Update other fields based on selected address
    }
  }, [autocompleteData]);

  const kecamatanList = [
    { name: "Kecamatan 1", value: "kecamatan1" },
    { name: "Kecamatan 2", value: "kecamatan2" },
    { name: "Kecamatan 3", value: "kecamatan3" },
  ];

  const postalCodeList = [
    { name: "Kode Pos 1", value: "kodepos1" },
    { name: "Kode Pos 2", value: "kodepos2" },
    { name: "Kode Pos 3", value: "kodepos3" },
  ];

  return (
    <div className="space-y-4 my-4 mx-12 text-xs">
      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Alamat*</label>
        <div className="w-2/3">
          <TextArea
            maxLength={60}
            resize="none"
            placeholder="Masukkan alamat lengkap dengan detail. Contoh : Nama Jalan (bila tidak ditemukan), Gedung, No. Rumah/Patokan, Blok/Unit"
            blurEvent={handleAddressBlur}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {autocompleteError && (
            <p className="text-red-500 mt-1">
              Error fetching address suggestions
            </p>
          )}
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Lokasi*</label>
        <div className="w-2/3">
          <Input
            placeholder="Masukkan Lokasi Toko"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kecamatan*</label>
        <div className="w-2/3">
          <Dropdown
            options={kecamatanList}
            onSearchValue={(value) => console.log(value)}
            placeholder="Pilih Kecamatan"
            searchPlaceholder="Cari Kecamatan"
          />
        </div>
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
        <div className="w-2/3">
          <Dropdown
            options={postalCodeList}
            onSearchValue={(value) => console.log(value)}
            placeholder="Pilih Kode Pos"
            searchPlaceholder="Cari Kode Pos"
          />
        </div>
      </div>
      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Titik Lokasi*</label>
        <div className="w-2/3">
          <MiniMap onClick={()=>setOpenMap(true)}  />
        </div>
      </div>
      <ModalComponent isOpen={isOpenMap} setClose={()=>setOpenMap(false)} hideHeader>
        <div className="flex item-start gap-4 pt-[14px] px-3">
          <MapContainer width={600} height={390} onPosition={(val)=>console.log(val.lat,val.lng)} />
          <div className="flex flex-col gap-[22px]">
            <span className="text-base font-semibold text-neutral-900">Atur Pin Lokasi</span>
            <Input classname={'w-[255px] max-w-none'} value={getSearchLokasi} changeEvent={e=>setSearchLokasi(e.target.value)} placeholder="Cari Lokasi" icon={{left:<IconComponent src={'/icons/marker.svg'} />,right:getSearchLokasi?<span className="flex items-center" onClick={()=>setSearchLokasi('')}><Image src={'/icons/closes.svg'} width={10} height={10} alt="closes" /></span>:''}} />
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};
 
export default AddressForm;
