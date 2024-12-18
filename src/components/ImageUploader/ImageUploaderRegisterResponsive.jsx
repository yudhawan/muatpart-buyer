"use client";

import { useState, useEffect, useRef } from "react";
import { modal } from "@/store/modal";
import Button from "../Button/Button";
import CropperImage from "../Cropper/Cropper";
import { useSWRConfig } from "swr";
import SWRHandler from "@/services/useSWRHook";
import toast from "@/store/toast";
import Bottomsheet from "../Bottomsheet/Bottomsheet";
import { Camera, Upload } from "lucide-react";

const api = process.env.NEXT_PUBLIC_API_HASYIM_DEVLINUX;

// value berupa return an value img dari komponen ini
// defaultValue yakni default value yang akan terpasang pada komponen ini (terpasang pada img bulat sebelah tombol ubah)

const ImageUploaderRegisterResponsive = ({ value, defaultValue }) => {
  const { setShowBottomsheet, setDataBottomsheet, setTitleBottomsheet } =
    toast();
  const { setModalOpen, setModalConfig, setModalContent } = modal();
  const [resultCrops, setResultCrops] = useState(
    defaultValue !== null ? defaultValue : ""
  );

  useEffect(() => {
    resultCrops !== "" && value(resultCrops);
  }, [resultCrops]);

  useEffect(() => {
    defaultValue !== null && setResultCrops(defaultValue);
  }, [defaultValue]);

  const handleUbah = () => {
    // setModalContent(<UnggahFoto resultCrop={setResultCrops} />);
    // setModalConfig({
    //   classname: "!w-[550px]",
    //   withHeader: true,
    //   withClose: true,
    // });
    // setModalOpen(true);
    setTitleBottomsheet("  -");
    setShowBottomsheet(true);
    setDataBottomsheet(
      <div className="flex justify-evenly items-center">
        <div
          className="flex flex-col gap-3 items-center cursor-pointer"
          onClick={() => console.log("ambil foto")}
        >
          <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center">
            <Camera size={24} color="white" />
          </div>
          <span className="text-sm font-semibold text-neutral-900">
            Ambil Foto
          </span>
        </div>
        <div
          className="flex flex-col gap-3 items-center cursor-pointer"
          onClick={() => console.log("upload foto")}
        >
          <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center">
            <Upload size={24} color="white" />
          </div>
          <span className="text-sm font-semibold text-neutral-900">
            Upload File
          </span>
        </div>
      </div>
    );
  };

  const handleDelete = () => {
    setModalContent(
      <div className="py-9 px-6">
        <span className="font-medium text-sm block text-center mb-6">
          Apakah kamu yakin ingin menghapus gambar?
        </span>
        <div className="flex justify-center gap-2">
          <Button color="primary_secondary" onClick={() => setModalOpen(false)}>
            Tidak
          </Button>
          <Button
            onClick={() => {
              setResultCrops("");
              setModalOpen(false);
            }}
          >
            Ya
          </Button>
        </div>
      </div>
    );
    setModalConfig({
      classname: "!w-[386px]",
      withHeader: true,
      withClose: true,
    });
    setModalOpen(true);
    setResultCrops("");
  };

  return (
    <>
      <Bottomsheet />
      <div className="flex flex-col items-center gap-4">
        <img
          src={`${
            resultCrops
              ? resultCrops
              : "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1733985462989.webp"
          }`}
          loading="lazy"
          className="size-[72px] rounded-full"
        />

        <div className="flex gap-3">
          {resultCrops && (
            <Button
              onClick={handleDelete}
              Class="!h-8 !font-semibold"
              color="primary_secondary"
            >
              Hapus
            </Button>
          )}

          <Button onClick={handleUbah} Class="!h-8 !font-semibold">
            {resultCrops ? "Ubah" : "Unggah"}
          </Button>
        </div>
        <span className="w-full text-center font-medium text-xs text-neutral-600 leading-[14.4px]">
          Format file jpg/png maks. 10MB
        </span>
      </div>
    </>
  );
};

export default ImageUploaderRegisterResponsive;

const UnggahFoto = ({ resultCrop }) => {
  const { setModalOpen } = modal();
  const { setShowToast, setDataToast } = toast();
  const { mutate } = useSWRConfig();
  const { useSWRMutateHook } = new SWRHandler();
  const { trigger: setPhoto } = useSWRMutateHook(
    api + "v1/register/seller/logo",
    "POST"
  );

  const handleImageResult = async ({ result, error }) => {
    if (error) {
      setShowToast(true);
      setDataToast({ type: "error", message: error });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", result);

      await setPhoto(formData)
        .then((response) => {
          mutate(api + "v1/register/seller/logo");
          resultCrop(response.data.Data.url);
          setModalOpen(false);
        })
        .catch((err) => {
          console.error("Upload error:", err);
          setShowToast(true);
          setDataToast({ type: "error", message: "Gagal memproses foto" });
        });
    } catch (err) {
      console.error("Error processing upload:", err);
      setShowToast(true);
      setDataToast({ type: "error", message: "Gagal memproses foto" });
    }
  };

  return (
    <div className="py-9 px-16">
      <span className="text-neutral-900 font-bold text-sm mx-auto text-center block mb-6">
        Unggah Logo Toko
      </span>
      <ImageUploadHandler onResult={handleImageResult} />
      <span className="text-xs font-medium text-[#868686] block mt-2">
        Format file jpg/png maks. 10MB
      </span>
    </div>
  );
};

export const ImageUploadHandler = ({ onResult }) => {
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      return {
        result: null,
        error: "Format file harus jpg/png",
      };
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        result: null,
        error: "Ukuran file maksimal 10MB",
      };
    }

    return { result: true, error: "" };
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file);
    if (validation.error) {
      onResult(validation);
      fileRef.current.value = null;
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setIsOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedDataUrl) => {
    if (!croppedDataUrl) {
      onResult({ result: null, error: "Gagal memproses gambar" });
      return;
    }

    try {
      // Convert base64 to FormData
      const formData = new FormData();
      const base64Response = await fetch(croppedDataUrl);
      const blob = await base64Response.blob();

      // Buat file dari blob dengan ekstensi yang sesuai
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      onResult({
        result: file, // Kirim file object
        error: "",
      });

      // Reset states
      setImage(null);
      setImageFile(null);
      fileRef.current.value = null;
    } catch (error) {
      onResult({
        result: null,
        error: "Gagal memproses gambar",
      });
    }
  };

  const handleClose = () => {
    setImage(null);
    setImageFile(null);
    fileRef.current.value = null;
  };

  return (
    <>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileRef}
      />

      <div
        className="w-[416px] h-[128px] rounded-md border-dashed flex justify-center items-center border border-primary-700 cursor-pointer"
        onClick={() => fileRef.current.click()}
      >
        <span className="text-xs font-medium text-neutral-900">
          Browse File
        </span>
      </div>

      <CropperImage
        imageSource={image}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        result={handleCropComplete}
        onClose={handleClose}
        required={true}
      />
    </>
  );
};
