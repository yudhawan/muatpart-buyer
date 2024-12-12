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
      ktpFile: null,
      ktpNo: null,
      namaKtpPendaftar: "",
      hasBankAccount: false,
      bankID: null,
      rekeningNumber: null,
      namaPemilik: null,
    },
  ],

  currentStep: 1, // nanti ganti 0
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

  setFormData: (step, field, value) => {
    set((state) => {
      const newFormData = [...state.formData];
      newFormData[step] = {
        ...newFormData[step],
        [field]: value,
      };
      return {
        formData: newFormData
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

  validateSecondStep: () => {
    const { formData } = get();
    const currentStepData = formData[1];
    const errors = {};
console.log('curr',currentStepData)
    // Required KTP fields validation
    if (!currentStepData.ktpFile) {
      errors.ktpFile = "KTP Pendaftar wajib diisi";
    }

    if (!currentStepData.ktpNo) {
      errors.ktpNo = "No. KTP Pendaftar wajib diisi";
    } else if (currentStepData.ktpNo.toString().length !== 16) {
      errors.ktpNo = "No. KTP Pendaftar harus 16 digit";
    }

    if (!currentStepData.namaKtpPendaftar) {
      errors.namaKtpPendaftar = "Nama KTP Pendaftar wajib diisi";
    }

    // Bank account validation if hasBankAccount is true
    if (currentStepData.hasBankAccount) {
      if (!currentStepData.bankID) {
        errors.bankName = "Nama Bank wajib dipilih";
      }
      
      if (!currentStepData.rekeningNumber) {
        errors.rekeningNumber = "Nomor Rekening wajib diisi";
      }

      // Validate that user has clicked 'Periksa' button by checking if namaPemilik exists
      if (currentStepData.bankID && currentStepData.rekeningNumber && !currentStepData.namaPemilik) {
        errors.rekeningNumber = "Nomor Rekening wajib diperiksa";
      }
    }

    if (Object.keys(errors).length > 0) {
      set({ errors });
      return false;
    }

    // All validations passed
    set({ errors: {} });
    return true;
  },

  nextStep: () => {
    const { currentStep, validateFirstStep, validateSecondStep } = get();

    if (currentStep === 0) {
      if (validateFirstStep()) {
        set({ currentStep: currentStep + 1 });
      }
    } else if (currentStep === 1) {
      if (validateSecondStep()) {
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
