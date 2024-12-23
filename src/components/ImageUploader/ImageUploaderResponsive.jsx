"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import styles from "./ImageUploader.module.scss";
import repeatDanger from "./assets/repeatDanger.svg";
import uploadImage from "./assets/uploadImage.svg";
import closeImage from "./assets/closeGrey.svg";
import CropperImage from "../Cropper/Cropper";
import IconComponent from "../IconComponent/IconComponent";
import toast from "@/store/toast";

export default function ImageUploaderResponsive({
  className,
  getImage, //get image
  error = false,
  isNull = false, //image status
  isMain = false, //main image status
  uploadText = "Unggah", //upload image text
  errorText = "Ulangi", //error upload image text
  maxSize = 0,
  isCircle = false,
  onUpload = () => {}, //function that return image of uploaded image
  onError = () => {}, //function that return error when uploading image,
  value = null,
  previewTitle
}) {
  const { setShowBottomsheet, setTitleBottomsheet, setDataBottomsheet } = toast();
  const cameraRef = useRef(null);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null); //set image source for cropper
  const [isOpen, setIsOpen] = useState(false); //open cropper modal
  const [isShowPreview, setIsShowPreview] = useState(false) // open preview setelah crop
  const [cropData, setCropData] = useState(null); //get crop result
  const base64Image = value || cropData;

  const getFile = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      //(reader.result, "39");
      setImage(reader.result);
    };
    if (reader && e) {
      if (files.length > 0) {
        //(files[0]);
        if (maxSize * 1000 > 0 && files[0].size > maxSize * 1000) {
          onError(true);
          return;
        }
        reader.readAsDataURL(files[0]);
        setIsOpen(true);
        setIsShowPreview(false)
        onError(false);
      }
    }
  };

  const getCroppedData = (value) => {
    if (value) {
      setCropData(value);
      getImage(value);
      onUpload(value);
      onError(false);
      cameraRef.current.value = null
      fileRef.current.value = null;
    }
  };

  const clearInput = (value) => {
    if (value) {
      cameraRef.current.value = null
      fileRef.current.value = null;
      setImage(null);
    }
  };

  const removeImage = (e) => {
    cameraRef.current.value = null
    fileRef.current.value = null;
    setImage(null);
    setCropData(null);
    getImage(null);
    e.stopPropagation();
  };

  const handleOpenFileUploadBottomsheet = () => {
    console.log("test1")
    setShowBottomsheet(true)
    setTitleBottomsheet(" -")
    setDataBottomsheet(
      <div className="flex justify-around">
        {uploadOptions.map((option, key) => (
          <div className="flex flex-col gap-y-4 items-center" key={key}>
            <div className="p-5 bg-primary-700 cursor-pointer rounded-[50px] size-16" onClick={option.onClick}>
              <IconComponent
                src={option.src}
                size="medium"
              />
            </div>
            <span className="font-semibold text-[16px] leading-[19.2px]">{option.title}</span>
          </div>
        ))}
      </div>
    )
  }

  const uploadOptions = [
    {
      src: "/icons/camera.svg",
      title: "Ambil Foto",
      onClick: () => cameraRef.current.click()
    },
    {
      src: "/icons/Upload.svg",
      title: "Unggah File",
      onClick: () => fileRef.current.click()
    },
  ]

  return (
    <>
      <div
        className={`${
          error ? styles.ImageUploaderError : styles.ImageUploader
        } ${!error && image ? styles.borderImage : styles.borderDashed} ${
          !base64Image && styles.ImageUploaderNull
        } relative flex items-end group hover:!border-primary-700 size-[72px] ${className}`}
        style={
          !error && base64Image
            ? { backgroundImage: `url(${base64Image})` }
            : { backgroundImage: `none` }
        }
        onClick={handleOpenFileUploadBottomsheet}
      >
        <input
          ref={cameraRef}
          type="file"
          className="hidden"
          onChange={getFile}
          capture
        />
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={getFile}
        />
        {!error && !base64Image && (
          <>
            <IconComponent size="small" src={uploadImage} />
            <span className="text-black group-hover:text-primary-700">
              {uploadText}
            </span>
          </>
        )}
        {error && (
          <>
            <IconComponent size="small" src={repeatDanger} />
            <span className="text-[#EE4343] group-hover:text-primary-700">
              {errorText}
            </span>
          </>
        )}
        {base64Image && !error && (
          <button
            className="absolute bg-[#FFFFFF] w-[16px] h-[16px] flex justify-center items-center rounded-[24px] top-[4px] right-[4px]"
            onClick={removeImage}
          >
            <Image src={closeImage} alt="close image" />
          </button>
        )}
        {isMain && base64Image && !error && (
          <div className="bg-[#E3F5ED] text-[#0FBB81] text-[14px] font-[600] flex items-center justify-center p-[7px] rounded-[6px] w-[60px] h-[24px] absolute bottom-[4px] right-[6px]">
            Utama
          </div>
        )}
      </div>
      <CropperImage
        imageSource={image}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        result={getCroppedData}
        onClose={clearInput}
        required={true}
        isCircle={isCircle}
        previewTitle={previewTitle}
        uploadOptions={uploadOptions}
        isShowPreview={isShowPreview}
        setIsShowPreview={setIsShowPreview}
      />
    </>
  );
}
