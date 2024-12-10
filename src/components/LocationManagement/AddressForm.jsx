import { useState, useEffect, useRef } from "react";
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
import Button from "../Button/Button";
import InputSearch from "../InputSearch/InputSearch";
import debounce from "@/libs/debounce";
import InputSearchLocation from "../InputSearchLocation/InputSearchLocation";

const AddressForm = () => {
  // Start State Management
  const swrHandler = new SWRHandler();
  const locationRef = useRef(null);

  const [manualInput, setManualInput] = useState("");
  const [kecamatanList, setKecamatanList] = useState([]);
  const [postalCodeList, setPostalCodeList] = useState([]);

  const [isOpenMap, setOpenMap] = useState(false);
  const [isOpenAddManual, setIsOpenAddManual] = useState(false);
  const [isOpenConfirmChangeLocation, setIsOpenConfirmChangeLocation] =
    useState(false);

  const [getSearchLokasi, setSearchLokasi] = useState("");

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    id: "",
    title: "",
  });
  const [district, setDistrict] = useState({
    name: "",
    value: "",
  });
  const [city, setCity] = useState({
    name: "",
    id: null,
  });
  const [province, setProvince] = useState({
    name: "",
    id: null,
  });
  const [postalCode, setPostalCode] = useState({
    name: "",
    value: "",
  });
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null,
  });

  // End State Management

  // Start Form Data

  const autocompleteFormData = new FormData();
  autocompleteFormData.append("phrase", location.title || address);
  autocompleteFormData.append("dataType", "json");

  const districtFormData = new FormData();
  districtFormData.append("place_id", location.id);

  const latLongFormData = new FormData();
  latLongFormData.append("Lat", coordinates.lat);
  latLongFormData.append("Long", coordinates.long);

  const manualSearchFormData = new FormData();
  manualSearchFormData.append("phrase", manualInput);

  // End Form Data

  // Start Fetchers

  const autoCompleteFetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: autocompleteFormData,
    }).then((res) => res.json());
  };

  const districtFetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: districtFormData,
    }).then((res) => res.json());
  };

  const latLongFetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: latLongFormData,
    }).then((res) => res.json());
  };

  const manualSearchFetcher = (url) => {
    return fetch(url, {
      method: "POST",
      body: manualSearchFormData,
    }).then((res) => res.json());
  };

  // End Fetchers

  // Start SWR Hooks

  const { data: autocompleteData, error: autocompleteError } =
    swrHandler.useSWRHook(
      location.title.length > 2 || address.length > 2
        ? `${process.env.NEXT_PUBLIC_INTERNAL_API}/get_autocomplete_street`
        : null,
      autoCompleteFetcher,
      (error) => {
        // console.error("Autocomplete error:", error);
      }
    );

  const { data: districtData, error: districtError } = swrHandler.useSWRHook(
    location.id
      ? `${process.env.NEXT_PUBLIC_INTERNAL_API}/get_districts_by_token`
      : null,
    districtFetcher,
    (error) => {
      // console.error("District fetch error:", error);
    }
  );

  const { data: latLongData, error: latLongError } = swrHandler.useSWRHook(
    coordinates.lat && coordinates.long
      ? `${process.env.NEXT_PUBLIC_INTERNAL_API}/get_information_location_by_lat_long`
      : null,
    latLongFetcher,
    (error) => {
      // console.error("Lat long error:", error);
    }
  );

  const { data: manualSearchData, error: manualSearchError } =
    swrHandler.useSWRHook(
      manualInput.length > 2
        ? `${process.env.NEXT_PUBLIC_INTERNAL_API}/get_autocomplete_street_local`
        : null,
      manualSearchFetcher,
      (error) => {
        // console.error("Manual search error:", error);
      }
    );

  // End SWR Hooks

  // Start Handlers

  const handleAddressChange = debounce((e) => {
    const value = e.target.value;
    setAddress(value);
  }, 500);

  const handleManualSearch = debounce((e) => {
    const value = e.target.value;
    setManualInput(value);
  }, 500);

  const handleLocationChange = debounce((e) => {
    const value = e.target.value;
    setLocation({
      id: "",
      title: value,
    });

    if (value.length === 0) {
      resetAllStates();
    }
  }, 500);

  const handleAutofillForm = () => {
    if (manualInput) {
      setDistrict({
        name: manualInput.DistrictName,
        value: manualInput.DistrictID,
      });
      setCity({
        name: manualInput.CityName,
        id: manualInput.CityID,
      });
      setProvince({
        name: manualInput.ProvinceName,
        id: manualInput.ProvinceID,
      });
      setPostalCode({
        name: manualInput.PostalCode,
        value: null,
      });
      setIsOpenAddManual(false);
    }
  };

  const resetAllStates = () => {
    setAddress("");
    setLocation({
      title: "",
      id: null,
    });
    setDistrict({
      name: "",
      value: null,
    });
    setCity({
      name: "",
      id: null,
    });
    setProvince({
      name: "",
      id: null,
    });
    setPostalCode({
      name: "",
      value: null,
    });
    setCoordinates({
      lat: null,
      long: null,
    });
  };

  // End Handlers

  useEffect(() => {
    if (autocompleteData) {
      // Handle the autocomplete data here
      // Update other fields based on selected address
    }
  }, [autocompleteData]);

  useEffect(() => {
    if (districtData) {
      if (districtData.Message.Code === 500) {
        setIsOpenAddManual(true);
      } else {
        setDistrict({
          name: districtData.Data.Districts[0].District,
          value: districtData.Data.Districts[0].DistrictID,
        });
        setCity({
          name: districtData.Data.CompleteLocation.city,
          id: districtData.Data.CompleteLocation.cityid,
        });
        setProvince({
          name: districtData.Data.CompleteLocation.province,
          id: districtData.Data.CompleteLocation.provinceid,
        });

        setKecamatanList(
          districtData.Data.Districts[0].DistrictList.map((i) => ({
            value: i.DistrictID,
            name: i.District,
          }))
        );
        setPostalCodeList(
          districtData.Data.Districts[0].PostalCodes.map((i) => ({
            value: i.ID,
            name: i.PostalCode,
          }))
        );

        const findPostalCode = districtData.Data.Districts[0].PostalCodes.find(
          (item) =>
            item.PostalCode === districtData.Data.CompleteLocation.postal
        );
        setPostalCode({
          name: findPostalCode.Description,
          value: findPostalCode.ID,
        });
      }
    }
  }, [districtData]);

  useEffect(() => {
    if (manualSearchData) {
      // Handle the manual search data here
    }
  }, [manualSearchData]);

  useEffect(() => {
    if (latLongData) {
      // Handle the lat long data here
      if (latLongData.Message.Code === 200) {
        // Additional logic here
      }
    }
  }, [latLongData]);

  return (
    <div className="space-y-4 my-4 mx-12 text-xs">
      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Alamat*</label>
        <div className="w-2/3">
          <TextArea
            maxLength={60}
            resize="none"
            placeholder="Masukkan alamat lengkap dengan detail. Contoh : Nama Jalan (bila tidak ditemukan), Gedung, No. Rumah/Patokan, Blok/Unit"
            value={address}
            changeEvent={handleAddressChange}
          />
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Lokasi*</label>
        <div className="w-2/3 relative" ref={locationRef}>
          <InputSearchLocation
            onClickSearchResult={(val) => {
              setLocation({
                id: val.id,
                title: val.title,
              });
            }}
            onSelectLocation={(val) => {}}
            searchResults={autocompleteData?.slice(0, 3)}
            changeEvent={handleLocationChange}
            locationRef={locationRef}
            addressValue={address}
            locationValue={location}
          />
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kecamatan*</label>
        <div className="w-2/3">
          <Dropdown
            options={kecamatanList}
            onSearchValue
            placeholder="Pilih Kecamatan"
            searchPlaceholder="Cari Kecamatan"
            defaultValue={district}
            onSelected={(val) =>
              setDistrict({
                name: val[0].name,
                value: val[0].value,
              })
            }
          />
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kota</label>
        <div className="w-2/3 text-neutral-900 font-medium">
          {city.name ? city.name : "-"}
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Provinsi</label>
        <div className="w-2/3 text-neutral-900 font-medium">
          {province.name ? province.name : "-"}
        </div>
      </div>

      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">Kode Pos*</label>
        <div className="w-2/3">
          <Dropdown
            options={postalCodeList}
            onSearchValue
            placeholder="Pilih Kode Pos"
            searchPlaceholder="Cari Kode Pos"
            defaultValue={postalCode}
            onSelected={(val) =>
              setPostalCode({
                name: val[0].name,
                value: val[0].value,
              })
            }
          />
        </div>
      </div>
      <div className="flex">
        <label className="w-1/3 text-neutral-600 font-medium">
          Titik Lokasi*
        </label>
        <div className="w-2/3">
          <MiniMap onClick={() => setOpenMap(true)} />
        </div>
      </div>

      <ModalComponent
        isOpen={isOpenMap}
        setClose={() => setOpenMap(false)}
        hideHeader
      >
        <div className="flex item-start gap-4 pt-[14px] px-3">
          <MapContainer
            width={600}
            height={390}
            onPosition={(val) => console.log(val.lat, val.lng)}
          />
          <div className="flex flex-col gap-[22px]">
            <span className="text-base font-semibold text-neutral-900">
              Atur Pin Lokasi
            </span>
            <Input
              classname={"w-[255px] max-w-none"}
              value={getSearchLokasi}
              changeEvent={(e) => setSearchLokasi(e.target.value)}
              placeholder="Cari Lokasi"
              icon={{
                left: <IconComponent src={"/icons/marker.svg"} />,
                right: getSearchLokasi ? (
                  <span
                    className="flex items-center"
                    onClick={() => setSearchLokasi("")}
                  >
                    <Image
                      src={"/icons/closes.svg"}
                      width={10}
                      height={10}
                      alt="closes"
                    />
                  </span>
                ) : (
                  ""
                ),
              }}
            />
          </div>
        </div>
      </ModalComponent>

      <ModalComponent
        isOpen={isOpenAddManual}
        showButtonClose={false}
        full={true}
        hideHeader
        preventAreaClose={true}
        classname="w-[472px] overflow-visible"
      >
        <div className="p-6 relative space-y-6">
          <div className="text-center font-bold text-sm">
            Isi Kelurahan/Kecamatan/Kode Pos
          </div>

          <div className="w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px]" />

          <InputSearch
            name="search"
            placeholder="Cari Kelurahan/Kecamatan/Kode Pos"
            options={manualSearchData?.Data}
            changeEvent={handleManualSearch}
            icon={{ left: "/icons/search.svg" }}
            getOptionLabel={(option) => option.Description}
          />

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => setIsOpenAddManual(false)}
              color="primary_secondary"
            >
              Batalkan
            </Button>
            <Button onClick={() => handleAutofillForm()}>Simpan</Button>
          </div>
        </div>
      </ModalComponent>

      <Modal
        isOpen={isOpenConfirmChangeLocation}
        setIsOpen={setIsOpenConfirmChangeLocation}
        closeArea={false}
        closeBtn={true}
      >
        <div className="space-y-6">
          <div className="text-center font-medium text-sm">
            Apakah kamu yakin ingin mengganti lokasi?
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              color="primary_secondary"
              onClick={() => setIsOpenConfirmChangeLocation(false)}
            >
              Tidak
            </Button>
            <Button>Ya</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddressForm;
