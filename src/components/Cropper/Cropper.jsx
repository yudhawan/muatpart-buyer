"use client";

import { useEffect, useState } from "react";
import CropperWeb from "./CropperWeb";
import CropperResponsive from "./CropperResponsive";

const Cropper = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <CropperResponsive {...props} />
  }
  return <CropperWeb {...props} />
}

export default Cropper