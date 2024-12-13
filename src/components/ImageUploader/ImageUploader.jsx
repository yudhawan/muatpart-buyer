"use client";

import { useEffect, useState } from "react";
import ImageUploaderWeb from "./ImageUploaderWeb";
import ImageUploaderResponsive from "./ImageUploaderResponsive";

const ImageUploader = (props) => {
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
    return <ImageUploaderResponsive {...props} />;
  }
  return <ImageUploaderWeb {...props} />;
};

export default ImageUploader;
