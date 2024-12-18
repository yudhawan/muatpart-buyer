// store/profileStore.js
import { create } from "zustand";

const useProfileStore = create((set, get) => ({
  // Main data
  profileData: null,

  // Edit states
  storeEdit: {
    data: {
      storeName: "",
      storeLogo: "",
      address: "",
      location: "",
      provinceID: "",
      cityID: "",
      districtID: "",
      postalCode: "",
      latitude: "",
      longitude: "",
    },
    errors: {},
  },

  companyEdit: {
    data: {
      companyLogo: "",
      address: "",
      location: "",
      provinceID: "",
      cityID: "",
      districtID: "",
      postalCode: "",
      latitude: "",
      longitude: "",
    },
    errors: {},
  },

  // Setters
  setProfileData: (data) => set({ profileData: data }),

  // Initialize edit data
  initializeStoreEdit: () => {
    const { profileData } = get();
    const storeInfo = profileData?.storeInformation || {};

    set((state) => ({
      storeEdit: {
        ...state.storeEdit,
        data: {
          storeName: storeInfo.storeName || "",
          storeLogo: storeInfo.storeLogo || "",
          address: storeInfo.address || "",
          location: storeInfo.location || "",
          provinceID: storeInfo.provinceID || "",
          cityID: storeInfo.cityID || "",
          districtID: storeInfo.districtID || "",
          postalCode: storeInfo.postalCode || "",
          latitude: storeInfo.latitude || "",
          longitude: storeInfo.longitude || "",
        },
      },
    }));
  },

  initializeCompanyEdit: () => {
    const { profileData } = get();
    const companyInfo = profileData?.companyData || {};

    set((state) => ({
      companyEdit: {
        ...state.companyEdit,
        data: {
          companyLogo: companyInfo.companyLogo || "",
          address: companyInfo.address || "",
          location: companyInfo.location || "",
          provinceID: companyInfo.provinceID || "",
          cityID: companyInfo.cityID || "",
          districtID: companyInfo.districtID || "",
          postalCode: companyInfo.postalCode || "",
          latitude: companyInfo.latitude || "",
          longitude: companyInfo.longitude || "",
        },
      },
    }));
  },

  // Update fields

  updateStoreField: (key, value) =>
    set((state) => ({
      storeEdit: {
        ...state.storeEdit,
        data: { ...state.storeEdit.data, [key]: value },
        errors: { ...state.storeEdit.errors, [key]: "" },
      },
    })),

  updateCompanyField: (key, value) =>
    set((state) => ({
      companyEdit: {
        ...state.companyEdit,
        data: { ...state.companyEdit.data, [key]: value },
        errors: { ...state.companyEdit.errors, [key]: "" },
      },
    })),

  // Reset forms
  resetForms: () =>
    set((state) => ({
      storeEdit: { data: {}, errors: {} },
      companyEdit: { data: {}, errors: {} },
    })),
}));

export default useProfileStore;
