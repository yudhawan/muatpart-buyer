const { create } = require("zustand");

export const viewport = create((set)=>({
    isMobile:null,
    setIsmobile:val=>set({isMobile:val})
}))