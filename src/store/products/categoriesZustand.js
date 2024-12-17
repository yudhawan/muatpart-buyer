import { create } from "zustand";

export const categoriesZustand = create((set)=>({
    categories:[],
    setCategories:val=>set({categories:val})
}))