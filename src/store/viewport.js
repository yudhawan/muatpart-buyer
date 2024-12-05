const { create } = require("zustand");

export const viewport = create((set)=>({
    isMobile:false,
    setIsmobile:val=>set({isMobile:val})
}))