import { create } from 'zustand';

const useLocationStore = create((set, get) => ({
  address: "",
  location: {
    id: "",
    title: "",
  },
  district: {
    name: "",
    value: "",
  },
  city: {
    name: "",
    id: null,
  },
  province: {
    name: "",
    id: null,
  },
  postalCode: {
    name: "",
    value: "",
  },
  coordinates: {
    lat: -7.2575,
    long: 112.7521,
  },
  kecamatanList: [],
  postalCodeList: [],
  searchResults: [],

  setAddress: (address) => set({ address }),
  setLocation: (location) => set({ location }),
  setDistrict: (district) => set({ district }),
  setCity: (city) => set({ city }),
  setProvince: (province) => set({ province }),
  setPostalCode: (postalCode) => set({ postalCode }),
  setCoordinates: (coordinates) => set({ coordinates }),
  setKecamatanList: (list) => set({ kecamatanList: list }),
  setPostalCodeList: (list) => set({ postalCodeList: list }),
  setSearchResults: (results) => set({ searchResults: results }),

  resetAllStates: () => set({
    address: "",
    location: {
      id: "",
      title: "",
    },
    district: {
      name: "",
      value: "",
    },
    city: {
      name: "",
      id: null,
    },
    province: {
      name: "",
      id: null,
    },
    postalCode: {
      name: "",
      value: "",
    },
    coordinates: {
      lat: -7.2575,
      long: 112.7521,
    },
    kecamatanList: [],
    postalCodeList: [],
    searchResults: [],
  }),
}));

export default useLocationStore;
