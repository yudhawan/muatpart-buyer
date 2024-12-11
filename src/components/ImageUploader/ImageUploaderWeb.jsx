"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import styles from "./ImageUploader.module.scss";
import repeatDanger from "./assets/repeatDanger.svg";
import uploadImage from "./assets/uploadImage.svg";
import closeImage from "./assets/closeGrey.svg";
import CropperImage from "../Cropper/Cropper";
import IconComponent from "../IconComponent/IconComponent";

export default function ImageUploaderWeb({
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
  onFinishCrop = () => {}
}) {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null); //set image source for cropper
  const [isOpen, setIsOpen] = useState(false); //open cropper modal
  const [cropData, setCropData] = useState(null); //get crop result
  const base64Image = value || cropData;
  const [imageFiles, setImageFiles] = useState(null);

  const getFile = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      setImageFiles(files);
    } else if (e.target) {
      files = e.target.files;
      setImageFiles(files[0]);
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
        onError(false);
      }
    }
  };

  const getCroppedData = (value) => {
    onFinishCrop(imageFiles)
    if (value) {
      setCropData(value);
      getImage(value);
      onUpload(value);
      onError(false);
      imageRef.current.value = null;
    }
  };

  const clearInput = (value) => {
    if (value) {
      imageRef.current.value = null;
      setImage(null);
    }
  };

  const removeImage = (e) => {
    imageRef.current.value = null;
    setImage(null);
    setCropData(null);
    getImage(null);
    e.stopPropagation();
  };

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
        onClick={() => imageRef.current.click()}
      >
        <input
          type="file"
          onChange={getFile}
          ref={imageRef}
          className="hidden"
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
      />
    </>
  );
}
