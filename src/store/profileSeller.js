// store/profileStore.js
import { create } from "zustand";

const useProfileStore = create((set, get) => ({
  profileData: null,
  editData: {},
  errors: {},

  setProfileData: (data) => set({ profileData: data }),

  initializeEditData: () => {
    const { profileData } = get();
    const isCompany = profileData?.profile?.accountType === "Perusahaan";
    const storeInfo = profileData?.storeInformation || {};

    // Common fields for both types
    const commonFields = {
      address: storeInfo.address || "",
      location: storeInfo.location || "",
      district: storeInfo.district || "",
      city: storeInfo.city || "",
      province: storeInfo.province || "",
      postalCode: storeInfo.postalCode || "",
      latitude: storeInfo.latitude || "",
    };

    // Add specific fields based on type
    const specificFields = isCompany
      ? {
          companyName: storeInfo.companyName || "",
          companyLogo: storeInfo.companyLogo || "",
          businessEntity: storeInfo.businessEntity || "",
          businessField: storeInfo.businessField || "",
        }
      : {
          storeName: storeInfo.storeName || "",
          storeLogo: storeInfo.storeLogo || "",
        };

    set({ editData: { ...commonFields, ...specificFields } });
  },

  updateField: (key, value) =>
    set((state) => ({
      editData: { ...state.editData, [key]: value },
      errors: { ...state.errors, [key]: "" },
    })),

  validateAndSave: () => {
    const { profileData, editData } = get();
    const isCompany = profileData?.profile?.accountType === "Perusahaan";
    const errors = {};

    const commonRequired = ["address", "location", "district", "postalCode"];
    const specificRequired = isCompany
      ? ["companyName", "businessEntity", "businessField"]
      : ["storeName"];

    [...commonRequired, ...specificRequired].forEach((field) => {
      if (!editData[field]) {
        errors[field] = "Data harus diisi";
      }
    });

    set({ errors });

    if (Object.keys(errors).length === 0) {
      console.log("Final data:", editData);
      return true;
    }
    return false;
  },

  resetEditState: () => set({ isEditMode: false, editData: {}, errors: {} }),
}));

export default useProfileStore;
