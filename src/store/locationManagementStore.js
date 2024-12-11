import {create} from 'zustand';

const useLocationManagementStore = create((set) => ({
  address: '',
  location: '',
  kecamatan: '',

  kota: '',
  provinsi: '',

  postalCode: '',
  setAddress: (address) => set({ address }),
  setLocation: (location) => set({ location }),
  setPostalCode: (postalCode) => set({ postalCode }),
  setKecamatan: (kecamatan) => set({ kecamatan }),
}));

export default useLocationManagementStore;