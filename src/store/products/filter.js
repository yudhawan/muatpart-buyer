import { create } from "zustand";

export const filterProduct = create((set)=>({
    garage: [],
    vehicleType: {},
    price: {
        minimum: null,
        maximum: null
    },
    distance: '',
    location: [],
    shipping: [],
    lastActiveSeller: '',
    category: [],
    brand: [],
    saleType: '',
    promo: [],
    productType: '',
    productRating: [],
    setFilterProduct: (field,val)=>set({[field]:val})

}))