import { create } from "zustand";
import { persist } from "zustand/middleware";

export const authZustand = create(persist(
    (set)=>({
        token:'',
        refreshToken:'',
        setToken:val=>set({token:val.token,refreshToken:val.refreshToken})
    }),
    {
        name:'t-ash',
    }
))