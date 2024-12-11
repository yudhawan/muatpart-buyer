const { create } = require("zustand");

export const modal = create((set) => ({
  modalOpen: false,
  setModalOpen: (val) => set({ modalOpen: val }),
  modalContent: null,
  setModalContent: (content) => set({ modalContent: content }),
  modalConfig: {
    width: null,
    height: null,
    withHeader: true,
    withClose: true,
    classname: "",
  },
  setModalConfig: (config) =>
    set((state) => ({
      modalConfig: {
        ...state.modalConfig,
        ...config,
      },
    })),
}));
