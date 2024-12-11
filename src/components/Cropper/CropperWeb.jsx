"use client";
import React, { useRef, useEffect } from "react";

//cropper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropper_az.css";

export default function CropperWeb({
  imageSource = "",
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
}) {
  const cropperRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        cancelCrop();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        cancelCrop();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      result(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    const cropper = cropperRef.current?.cropper;
    cropper.reset();
    setIsOpen(false);
  };

  const cancelCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.reset();
    setIsOpen(false);
    onClose(true);
  };

  const zoomOut = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.zoom(-0.1);
  };

  const zoomIn = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.zoom(0.1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
        <div
          ref={modalRef}
          className={`${
            isCircle ? "modal-cropper-circle" : ""
          } px-6 py-9 w-[424px] bg-white rounded-xl`}
        >
          <div className="bg-white flex flex-col gap-[18px] items-center mb-6">
            <span className="text-black">Ubah Foto Profil</span>
            <div className="w-[386px] h-[386px] relative">
              <div className="bg-white flex flex-col absolute right-2 bottom-2 border border-[#E2E2E2] rounded-xl z-[100] h-20">
                <div
                  className="h-1/2 text-[25px] cursor-pointer text-black flex justify-center items-center"
                  onClick={zoomIn}
                >
                  +
                </div>
                <div
                  className="h-1/2 text-[25px] cursor-pointer text-black flex justify-center items-center p-[15px]"
                  onClick={zoomOut}
                >
                  <div className="w-3 border-[1.25px] border-[#1B1B1B]"></div>
                </div>
              </div>
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                src={imageSource}
                aspectRatio={1}
                preview={".img-preview"}
                viewMode={0}
                background={true}
                responsive={true}
                autoCropArea={1}
                cropBoxResizable={true}
                minCropBoxHeight={isCircle ? 386 : 0}
                minCropBoxWidth={isCircle ? 386 : 0}
              />
              <div className="img-preview" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={cancelCrop}
              className="rounded-full bg-white border border-[#176CF7] text-[#176CF7] px-3 py-2.5 min-w-[112px] h-8 flex items-center justify-center outline-none"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={getCropData}
              className="rounded-full bg-[#176CF7] text-white px-3 py-2.5 min-w-[112px] h-8 flex items-center justify-center outline-none"
              autoFocus
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
