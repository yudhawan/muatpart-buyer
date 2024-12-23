import { create } from "zustand";

export const laporkanProduk = create((set, get) => ({
  dataLaporkan: {
    OpsiPelanggaran: { value: "", validation: "" },
    DetailPelanggaran: { value: "", validation: "" },
    FotoPelanggaran: { value: [], validation: "" },
    LinkPelanggaran: { value: "", validation: "" },
    CheckboxPelanggaran: { value: false, validation: "" },
  },

  // Existing setDataLaporkan
  setDataLaporkan: (field, value) => {
    set((state) => ({
      dataLaporkan: {
        ...state.dataLaporkan,
        [field]: {
          ...state.dataLaporkan[field],
          value: value,
        },
      },
    }));
  },

  setApiValidationErrors: (errors) => {
    set((state) => {
      const newData = { ...state.dataLaporkan };

      // Reset semua validation dulu
      Object.keys(newData).forEach((key) => {
        newData[key] = {
          ...newData[key],
          validation: "",
        };
      });

      // Set validation message sesuai response API
      errors.forEach((error) => {
        // Mapping field dari API ke field di state
        switch (error.path) {
          case "link":
            newData.LinkPelanggaran = {
              ...newData.LinkPelanggaran,
              validation: error.msg,
            };
            break;
          case "option":
            newData.OpsiPelanggaran = {
              ...newData.OpsiPelanggaran,
              validation: error.msg,
            };
            break;
          case "details":
            newData.DetailPelanggaran = {
              ...newData.DetailPelanggaran,
              validation: error.msg,
            };
            break;
          // Case lainnya sesuai field yang ada
        }
      });

      return {
        dataLaporkan: newData,
      };
    });
  },

  validateForm: (toastFunctions, isDesktop = false) => {
    const { setShowToast, setDataToast } = toastFunctions;
    const { dataLaporkan } = get();
    let isValid = true;
    const updatedData = { ...dataLaporkan };
    let firstError = "";

    // Validasi semua field
    Object.keys(dataLaporkan).forEach((field) => {
      console.log(dataLaporkan, field, " kodok")
      // Skip validation untuk field optional (LinkPelanggaran)
      if (field === "LinkPelanggaran") return;

      const currentValue = dataLaporkan[field].value;
      let validationMessage = "";

      // Reset validation message
      updatedData[field] = {
        ...updatedData[field],
        validation: "",
      };

      // Check empty values
      if (field === "OpsiPelanggaran" && !currentValue) {
        validationMessage = "Opsi Pelanggaran wajib diisi";
        setDataToast({ type: "error", message: "Field wajib diisi!" });
        setShowToast(true);
        isValid = false;
      }

      // Special validation for DetailPelanggaran
      if (field === "DetailPelanggaran") {
        if (!currentValue) {
          validationMessage = "Detail Pelanggaran wajib diisi";
          setDataToast({ type: "error", message: "Field wajib diisi!" });
          setShowToast(true);
          isValid = false;
        } else if (currentValue.length < 30) {
          validationMessage = "Detail Pelanggaran min. 30 karakter";
          isValid = false;
        }
      }

      if (field === "FotoPelanggaran") {
        if (!Array.isArray(currentValue) || currentValue.length === 0) {
          validationMessage = "Foto Bukti Laporan wajib diisi";
          isValid = false;
        }
      }


      updatedData[field] = {
        ...updatedData[field],
        validation: validationMessage,
      };

      // Store first error for mobile toast
      if (!firstError && validationMessage) {
        firstError = validationMessage;
      }
    });

    set({ dataLaporkan: updatedData });

    return isValid;
  },

  resetForm: () => {
    set({
      dataLaporkan: {
        OpsiPelanggaran: { value: "", validation: "" },
        DetailPelanggaran: { value: "", validation: "" },
        FotoPelanggaran: { value: [], validation: "" },
        LinkPelanggaran: { value: "", validation: "" },
        CheckboxPelanggaran: { value: false, validation: "" },
      },
    });
  },
}));
