import { create } from "zustand";

const registerForm = create((set, get) => ({
  formData: [
    {
      storeName: "",
      logo: null,
      address: "",
      location: "",
      districtID: null,
      cityID: null,
      provinceID: null,
      postalCode: null,
      latitude: "",
      longitude: "",
      email: "",
    },
    {
      ktpFile: "",
      ktpNo: null,
      ktpNama: "",
      hasBankAccount: false,
      bankID: null,
      accountNumber: null,
      accountName: null,
    },
  ],

  currentStep: 0,
  errors: {},

  handleInputChange: (field, value) => {
    const { currentStep } = get();
    set((state) => {
      const newFormData = [...state.formData];
      newFormData[currentStep] = {
        ...newFormData[currentStep],
        [field]: value,
      };
      return {
        formData: newFormData,
        errors: {}, // Reset errors when input changes
      };
    });
  },

  validateFirstStep: () => {
    const { formData } = get();
    const errors = {};

    // 1. Required fields validation
    const requiredFields = [
      "storeName",
      "address",
      "location",
      "districtID",
      "email",
    ];
    requiredFields.forEach((field) => {
      if (!formData[0][field]) {
        errors[field] = "Wajib diisi";
      }
    });

    // If required fields not filled, stop here
    if (Object.keys(errors).length > 0) {
      set({ errors });
      return false;
    }

    // 2. Store name length validation
    if (formData[0].storeName.length < 3) {
      set({ errors: { storeName: "Minimal 3 karakter" } });
      return false;
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData[0].email)) {
      set({ errors: { email: "Format email tidak valid" } });
      return false;
    }

    // All validations passed
    set({ errors: {} });
    return true;
  },

  nextStep: () => {
    const { currentStep, validateFirstStep } = get();

    if (currentStep === 0) {
      if (validateFirstStep()) {
        set({ currentStep: currentStep + 1 });
      }
    } else {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () =>
    set((state) => ({
      currentStep: state.currentStep - 1,
      errors: {}, // Reset errors when going back
    })),
}));

export default registerForm;
