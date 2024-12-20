import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const userZustand = create(persist(
    (set)=>({
        id:'',
        name:'',
        phone:'',
        role:'',
        setUser:val=>set(val),
        removeUser:()=>set({
            id:'',
            name:'',
            phone:'',
            role:'',
        })
    }),
    {
        name:'t-ng',
        storage:createJSONStorage(()=>localStorage)
    }
))