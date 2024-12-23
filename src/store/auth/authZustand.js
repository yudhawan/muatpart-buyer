import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const authZustand = create(persist(
    (set)=>({
        accessToken:'',
        refreshToken:'',
        setToken:val=>set(val),
        clearToken:()=>set({accessToken:'',refreshToken:''})
    }),
    {
        name:'t-ash',
        storage:createJSONStorage(()=>localStorage)
    }
))