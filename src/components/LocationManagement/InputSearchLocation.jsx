import { useState, useEffect, useCallback } from "react";
import SWRHandler from "@/services/useSWRHook";
import Input from "../Input/Input";
import ModalComponent from "../Modals/ModalComponent";
import Image from "next/image";
import TextArea from "../TextArea/TextArea";
import Dropdown from "../Dropdown/Dropdown";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import InputSearch from "./InputSearch";
import debounce from "@/libs/debounce";

const InputSearchLocation = ({
     changeEvent,
     locationRef,
     onClickSearchResult,
     onSelectLocation,
     addressValue,
     locationValue = {
          id: null,
          title: "",
     },
     openAddManual,
     autoFillForm,
}) => {
     const AUTOCOMPLETE_ENDPOINT = `${process.env.NEXT_PUBLIC_INTERNAL_API}/autocompleteStreet`;
     const DISTRICT_ENDPOINT = `${process.env.NEXT_PUBLIC_INTERNAL_API}/district_by_token`;
     const MANUALSEARCH_ENDPOINT = `${process.env.NEXT_PUBLIC_INTERNAL_API}/autocompleteStreetLocal`;

     const swrHandler = new SWRHandler();

     const [isOpenAddManual, setIsOpenAddManual] = useState(false);

     const [manualInput, setManualInput] = useState({
          DistrictID: "",
          DistrictName: "",
          CityID: "",
          CityName: "",
          ProvinceID: "",
          ProvinceName: "",
          PostalCode: "",
     });

     const [searchResults, setSearchResults] = useState([]);
     const [manualSearchResponse, setManualSearchResponse] = useState([]);

     const [address, setAddress] = useState(addressValue);
     const [location, setLocation] = useState({
          id: locationValue.id,
          title: locationValue.title,
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

     const [postalCodeList, setPostalCodeList] = useState([]);

     const [isOpen, setIsOpen] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const managedLocations = [
          {
               id: 1,
               title: "Gudang Surabaya 14B, Gudang Houseware Surabaya",
               address: "Kebraon Indah Permai B53, RT 02, RT.02/RW.13, Kebraon, Kec. Karangpilang, Surabaya, Jawa Timur 60222",
               isMain: true,
               icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
               actionIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
          },
          {
               id: 2,
               title: "Kecamatan Rungkut, Kota Surabaya",
               address: "Jl Tenggilis Mejoyo, Surabaya",
               icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
               actionIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
          },
          {
               id: 3,
               title: "Gudang Osowilangun – Surabaya Warehouse 12B no 1234",
               address: "Tambak Osowilangun, Kec. Benowo, Surabaya, Jawa Timur 60191",
               icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4604dd6ebddc0cbf5d395f5a01ae9b932f909db8c7b87c63b509c08bf277aa78?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
               actionIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7d328b73c69f198f5a2e179490e54dba59b6ee2b8151a56d019ece81fe47673?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da",
          },
     ];

     const autoCompleteFetcher = async (url, body) => {
          const formData = new URLSearchParams();
          formData.append("phrase", body);

          const response = await fetch(url, {
               method: "POST",
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
               },
               body: formData.toString(),
          });

          return response.json();
     };

     const districtFetcher = async (url, body) => {
          const formData = new URLSearchParams();
          formData.append("placeId", body);

          const response = await fetch(url, {
               method: "POST",
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
               },
               body: formData.toString(),
          });

          return response.json();
     };

     const manualSearchFetcher = async (url, body) => {
          const formData = new URLSearchParams();
          formData.append("phrase", body);

          const response = await fetch(url, {
               method: "POST",
               headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
               },
               body: formData.toString(),
          });

          return response.json();
     };

     // const { data: districtData, error: districtError } = swrHandler.useSWRHook(
     //   location.id ? DISTRICT_ENDPOINT : null,
     //   districtFetcher,
     //   (error) => {
     //     // console.error("District fetch error:", error);
     //   }
     // );

     // const { data: manualSearchData, error: manualSearchError } =
     //   swrHandler.useSWRHook(
     //     manualInput.length > 2 ? MANUALSEARCH_ENDPOINT : null,
     //     manualSearchFetcher,
     //     (error) => {
     //       // console.error("Manual search error:", error);
     //     }
     //   );

     const handleInputFocus = () => {
          setIsOpen(true);
          if (!location.title && addressValue) {
               setLocation({
                    id: null,
                    title: addressValue,
               });
          }
     };

     // const handleInputChange = (e) => {
     //   const value = e.target.value;
     //   setLocation({
     //     id: null,
     //     title: value,
     //   });
     //   setIsOpen(true);
     // };

     //  const handleInputChange = debounce((e) => {
     //       const value = e.target.value;
     //       console.log(e);
     //       setLocation({
     //            id: null,
     //            title: value,
     //       });
     //       setIsOpen(true);
     //  });

     const [locationTes, setLocationTes] = useState("");

     const handleInputChange = (e) => {
          const value = e.target.value;
          setLocationTes(value);
          handleDebouncedChange(value);
     };

     const handleDebouncedChange = useCallback(
          debounce((value) => {
               console.log(value);
               setLocation({
                    id: null,
                    title: value,
               });
               setIsOpen(true);
          }, 500),
          []
     );

     const handleGetCurrentLocation = () => {
          if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(
                    (position) => {
                         const { latitude, longitude } = position.coords;
                         console.log("Current Location:", latitude, longitude);
                         setIsOpen(false);
                         onSelectLocation({ latitude, longitude });
                    },
                    (error) => {
                         console.error("Error getting location:", error);
                    }
               );
          } else {
               console.error("Geolocation is not supported by this browser.");
          }
     };

     const handleSelectLocation = (result) => {
          onClickSearchResult(result);
          setLocation({
               id: result.ID,
               title: result.Title,
          });
          setIsOpen(false);
     };

     const handleSaveLocation = async (result) => {
          setIsOpen(false);
          setLocation({
               id: result.ID,
               title: result.Title,
          });

          try {
               const districtData = await districtFetcher(DISTRICT_ENDPOINT, result.ID);

               console.log("District data: ", districtData);

               if (districtData && districtData.Message.Code === 200) {
                    setIsModalOpen(true);
                    handleAutofillForm(districtData);
               } else {
                    console.log("b");
                    setIsOpenAddManual(true);
               }
          } catch (error) {
               console.error("Error fetching district data:", error);
          }
     };

     const fetchAutoCompleteData = async () => {
          try {
               const setAutoCompleteResponse = await autoCompleteFetcher(AUTOCOMPLETE_ENDPOINT, location.title);
               console.log("Auto complete data: ", setAutoCompleteResponse);
               setAutoCompleteResponse(setAutoCompleteResponse.Data.data.Data);
          } catch (error) {
               console.error("Error fetching auto complete data:", error);
          }
     };

     const fetchDistrictData = async () => {
          try {
               const districtData = await districtFetcher(DISTRICT_ENDPOINT, location.id);
               console.log("District data: ", districtData);
          } catch (error) {
               console.error("Error fetching district data:", error);
          }
     };

     const fetchManualSearchData = async () => {
          try {
               const manualData = await manualSearchFetcher(MANUALSEARCH_ENDPOINT, manualInput);
               setManualSearchResponse(manualData.Data.data.Data);
          } catch (error) {
               console.error("Error fetching manual search data:", error);
          }
     };

     useEffect(() => {
          if (location.title) {
               fetchAutoCompleteData();
          }
     }, [location.title]);

     useEffect(() => {
          if (location.id) {
               fetchDistrictData();
          }
     }, [location.id]);

     useEffect(() => {
          if (openAddManual) {
               setIsOpenAddManual(true);
          }
     }, [openAddManual]);

     useEffect(() => {
          if (manualInput.length > 2) {
               fetchManualSearchData();
          }
     }, [manualInput]);

     const handleManualSearch = debounce((e) => {
          const value = e.target.value;
          setManualInput(value);
     }, 500);

     const handleAutofillForm = (districtData) => {
          console.log("District data: ", districtData);

          const newDistrict = {
               name: districtData.Data.Districts[0].District,
               value: districtData.Data.Districts[0].DistrictID,
          };

          const newCity = {
               name: districtData.Data.CompleteLocation.city,
               id: districtData.Data.CompleteLocation.cityid,
          };

          const newProvince = {
               name: districtData.Data.CompleteLocation.province,
               id: districtData.Data.CompleteLocation.provinceid,
          };

          const newPostalCodeList = districtData.Data.Districts[0].PostalCodes.map((i) => ({
               value: i.ID,
               name: i.PostalCode,
          }));

          const findPostalCode = districtData.Data.Districts[0].PostalCodes.find((item) => item.PostalCode === districtData.Data.CompleteLocation.postal);

          const newPostalCode = {
               name: findPostalCode.Description,
               value: findPostalCode.ID,
          };

          const newCoordinates = {
               lat: districtData.Data.Lat,
               long: districtData.Data.Long,
          };

          // Set all the states
          setDistrict(newDistrict);
          setCity(newCity);
          setProvince(newProvince);
          setPostalCodeList(newPostalCodeList);
          setPostalCode(newPostalCode);
          setCoordinates(newCoordinates);
     };

     const handleAutofillFormManual = () => {
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
          autoFillForm(manualInput);
          // setIsModalOpen(true);
     };

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (locationRef.current && !locationRef.current.contains(event.target)) {
                    setIsOpen(false);
               } else {
                    setIsOpen(true);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     // useEffect(() => {
     //   if (!districtData) return;

     //   if (districtData.Message.Code === 400) {
     //     setCoordinates({
     //       lat: districtData.Data.lat,
     //       long: districtData.Data.lng,
     //     });
     //     setIsOpenAddManual(true);
     //     return;
     //   }
     // }, [districtData]);

     return (
          <>
               {/* <pre>
        {JSON.stringify(
          {
            // address,
            // addressValue,
            // location,
            // district,
            // city,
            // province,
            // postalCode,
            // coordinates,
          },
          null,
          2
        )}
      </pre> */}

               {/* <Input placeholder="Masukkan Lokasi Toko" value={location.title} changeEvent={handleInputChange} focusEvent={handleInputFocus} /> */}
               <Input placeholder="Masukkan Lokasi Toko" value={locationTes} changeEvent={handleInputChange} focusEvent={handleInputFocus} />

               <div className="absolute w-full flex">
                    {isOpen && (
                         <div className="flex z-10 flex-col items-start mt-1 pt-3 pb-5 w-full bg-white rounded-md border border-blue-600 border-solid">
                              <div className="flex mx-5 gap-3 items-center max-w-full text-xs font-medium text-blue-600 cursor-pointer" onClick={handleGetCurrentLocation}>
                                   <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3795d733eb3bad624b2a2982f5874f44be0c8234b8b171d3ddf0475ccfc1ea24?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square fill-blue-600" />
                                   <div className="self-stretch my-auto h-2.5">Pilih Lokasi</div>
                              </div>

                              <div className="mt-3 w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px]" />

                              <div className="flex flex-col mt-3 mx-5 max-w-full">
                                   <div className="text-xs font-medium leading-tight text-neutral-500">Hasil Pencarian</div>

                                   {searchResults?.map((result) => (
                                        <div key={result.ID} className="flex gap-3 justify-between items-start w-full mt-3">
                                             <button className="flex gap-3 text-start" onClick={() => handleSelectLocation(result)}>
                                                  <img src={"https://cdn.builder.io/api/v1/image/assets/TEMP/82f18aaf313f3da9ec16ec7603481bb02dfb1070f0ff1bcdf920b0a36cffeffb?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"} alt="" className="object-contain shrink-0 w-5 aspect-square" />
                                                  <div className="flex-1 shrink gap-2.5 self-stretch">{result.Title}</div>
                                             </button>
                                             <img src={"https://cdn.builder.io/api/v1/image/assets/TEMP/56d6cfa9a6052712d294250bcbc9fa99a70fe7037a219c462ef9f420a663ed35?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da"} alt="" className="object-contain shrink-0 w-5 aspect-square cursor-pointer" onClick={() => handleSaveLocation(result)} />
                                        </div>
                                   ))}

                                   <div className="flex flex-col justify-center px-3 py-2 mt-3 w-full text-xs font-semibold text-blue-600 bg-white rounded border border-blue-600 border-solid">
                                        <div className="flex gap-2 items-center w-full">
                                             <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/18bbc0431f0ef562c9b534b68ee07c2e9210b58ffdb55a266b940f8e172fc591?placeholderIfAbsent=true&apiKey=edf1b856b0f745739c22ab52d9ed84da" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
                                             <div className="flex-1 shrink self-stretch my-auto basis-0">Input Lokasi yang terdekat dengan Anda</div>
                                        </div>
                                   </div>

                                   <div className="flex-1 shrink gap-3 mt-3 w-full text-xs font-medium leading-tight text-neutral-500">Manajemen Lokasi</div>

                                   {managedLocations.map((item) => (
                                        <div className="flex flex-col mt-4 w-full text-xs">
                                             <div className="flex gap-3 items-center w-full font-bold leading-3 text-black">
                                                  <img src={item.icon} alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
                                                  <div className="flex flex-1 shrink gap-2 items-center basis-0 min-w-[240px]">
                                                       <div className="flex-1 shrink my-auto text-xs font-bold leading-3 text-black basis-0 text-ellipsis">
                                                            {item.title}
                                                            <br />
                                                       </div>
                                                       {item.isMain && <div className="gap-1 self-stretch p-1 my-auto text-xs font-semibold leading-tight text-orange-500 whitespace-nowrap bg-yellow-100 rounded">Utama</div>}
                                                  </div>
                                                  <img src={item.actionIcon} alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square cursor-pointer" />
                                             </div>
                                             <div className="flex-1 shrink gap-2.5 self-stretch px-8 mt-1 w-full font-medium leading-tight text-ellipsis text-neutral-500">{item.address}</div>
                                        </div>
                                   ))}

                                   <div className="mt-3 text-xs font-medium leading-tight text-right text-blue-600">
                                        <button onClick={() => setIsModalOpen(true)}>Lihat Manajemen Lokasi</button>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>

               <ModalComponent isOpen={isOpenAddManual} showButtonClose={false} full={true} hideHeader preventAreaClose={true} classname="w-[472px] overflow-visible">
                    <div className="p-6 relative space-y-6">
                         <div className="text-center font-bold text-sm">Isi Kelurahan/Kecamatan/Kode Pos</div>

                         <div className="w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px]" />

                         <InputSearch name="search" placeholder="Cari Kelurahan/Kecamatan/Kode Pos" options={manualSearchResponse} changeEvent={handleManualSearch} icon={{ left: "/icons/search.svg" }} getOptionLabel={(option) => option.Description} />

                         <div className="flex items-center justify-center gap-3">
                              <Button onClick={() => setIsOpenAddManual(false)} color="primary_secondary">
                                   Batalkan
                              </Button>
                              <Button onClick={() => handleAutofillFormManual()}>Simpan</Button>
                         </div>
                    </div>
               </ModalComponent>

               <ModalComponent isOpen={isModalOpen} preventAreaClose setClose={() => setIsModalOpen(false)} classnameContent="w-[400px]" hideHeader>
                    <div className="">
                         <div className="text-base font-bold p-4">Detail Alamat</div>

                         <div className="max-h-96 overflow-auto space-y-3 p-4 pt-0">
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Label Alamat*</div>
                                   <Input placeholder="Masukkan Alamat" />
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Lokasi*</div>
                                   <div className="flex items-center gap-3">
                                        <Image src={"/icons/marker.svg"} width={30} height={30} alt="marker" />
                                        <div className="font-semibold">{location.title || "Lokasi Toko"}</div>
                                   </div>
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Alamat*</div>
                                   <TextArea placeholder="Masukkan alamat lengkap dengan detail.Contoh : Nama Jalan (bila tidak ditemukan), Gedung, No. Rumah/Patokan, Blok/Unit" maxLength={60} resize="none" hasCharCount={false} value={address} changeEvent={(e) => setAddress(e.target.value)} />
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Kecamatan</div>
                                   <div className="font-semibold">{district.name}</div>
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Kota</div>
                                   <div className="font-semibold">{city.name}</div>
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Provinsi</div>
                                   <div className="font-semibold">{province.name}</div>
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Kode Pos*</div>
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
                                        classname="!w-full"
                                   />
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">Nama PIC*</div>
                                   <Input placeholder="Nama PIC Lokasi" />
                              </div>
                              <div className="">
                                   <div className="text-[10px] text-neutral-600 font-semibold">No. HP PIC*</div>
                                   <Input placeholder="Contoh : 08xxxxxxxxxx" />
                              </div>
                              <Checkbox label="Jadikan alamat sebagai alamat utama" />

                              <div className="flex gap-3 justify-center pt-[10px]">
                                   <Button color="primary_secondary" onClick={() => setIsModalOpen(false)}>
                                        Batalkan
                                   </Button>
                                   <Button onClick={() => setIsModalOpen(false)}>Simpan</Button>
                              </div>
                         </div>
                    </div>
               </ModalComponent>
          </>
     );
};

export default InputSearchLocation;
