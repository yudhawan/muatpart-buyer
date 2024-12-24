import { create } from "zustand";

const useAlbumStore = create((set) => ({
  modalNewAlbum: false,
  setModalNewAlbum: (value) => set({ modalNewAlbum: value }),
}));

export default useAlbumStore;