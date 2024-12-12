import { create } from "zustand";
import toast from "./toast";

const INITIAL_FORM = {
  step1: {
    tipeToko: 0,
    companyName: "",
    businessEntityID: null,
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
  step2: {
    ktpFile: "",
    ktpNo: null,
    ktpNama: "",
    hasBankAccount: false,
    bankID: null,
    accountNumber: null,
    accountName: null,
  },
};

const registerForm = create((set, get) => ({
  formData: [INITIAL_FORM.step1, INITIAL_FORM.step2],
  currentStep: 0,
  errors: {},
  isSubmitting: false,

  setIsSubmitting: (value) => set({ isSubmitting: value }),
  setFormData: (newData) => set({ formData: newData }),

  handleInputChange: (field, value) => {
    const { currentStep } = get();
    // Pastikan value tidak undefined
    const sanitizedValue = value === undefined ? "" : value;

    set((state) => ({
      formData: state.formData.map((data, index) =>
        index === currentStep ? { ...data, [field]: sanitizedValue } : data
      ),
      errors: {},
    }));
  },

  validateFirstStep: () => {
    const { formData } = get();
    const errors = {};
    const { setShowToast, setDataToast } = toast.getState();

    const fieldNames = {
      storeName: "Nama Toko",
      address: "Alamat",
      location: "Lokasi Toko",
      districtID: "Kecamatan",
      email: "Email",
      companyName: "Nama Perusahaan",
      businessEntityID: "Badan Usaha",
    };

    const requiredFields = [
      "storeName",
      "address",
      "location",
      "districtID",
      "email",
      ...(formData[0].tipeToko === 1
        ? ["companyName", "businessEntityID"]
        : []),
    ];

    // Improved validation check
    requiredFields.forEach((field) => {
      const value = formData[0][field];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim() === "")
      ) {
        errors[field] = `${fieldNames[field]} wajib diisi`;
      }
    });

    // Log untuk debugging
    console.log("Form Data:", formData[0]);
    console.log("Errors:", errors);

    if (Object.keys(errors).length > 0) {
      set({ errors });
      setDataToast({
        type: "error",
        message: "Isi semua inputan yang bertanda bintang (*)",
      });
      setShowToast(true);
      return false;
    }

    // Email validation
    if (formData[0].email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData[0].email)) {
        set({
          errors: {
            email: "Penulisan email salah",
          },
        });
        setDataToast({
          type: "error",
          message: "Penulisan email salah",
        });
        setShowToast(true);
        return false;
      }
    }

    set({ errors: {} });
    return true;
  },

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () =>
    set((state) => ({ currentStep: state.currentStep - 1, errors: {} })),
}));

export default registerForm;
