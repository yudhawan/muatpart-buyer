"use client";

import { useState, useEffect, useRef } from "react";
import { modal } from "@/store/modal";
import Button from "../Button/Button";
import CropperImage from "../Cropper/Cropper";
import { useSWRConfig } from "swr";
import SWRHandler from "@/services/useSWRHook";
import toast from "@/store/toast";

const api = process.env.NEXT_PUBLIC_API_HASYIM_DEVLINUX;

// value berupa return an value img dari komponen ini
// defaultValue yakni default value yang akan terpasang pada komponen ini (terpasang pada img bulat sebelah tombol ubah)

const ImageUploaderRegister = ({ value, defaultValue }) => {
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
    setModalContent(<UnggahFoto resultCrop={setResultCrops} />);
    setModalConfig({
      classname: "!w-[550px]",
      withHeader: true,
      withClose: true,
    });
    setModalOpen(true);
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
    <div className="flex items-center gap-4">
      {resultCrops ? (
        <div className="relative group">
          <img
            src={`${
              resultCrops
                ? resultCrops
                : "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1733985462989.webp"
            }`}
            loading="lazy"
            className="size-[72px] rounded-full"
          />
          <div className="absolute inset-0 rounded-full bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <button
              onClick={handleDelete}
              className="text-white p-2 rounded-full flex items-center justify-center flex-col gap-1"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4H14M5.33333 4V2.66667C5.33333 1.74619 6.07952 1 7 1H9C9.92048 1 10.6667 1.74619 10.6667 2.66667V4M6.33333 6.33333V11.6667M9.66667 6.33333V11.6667M3 4V13.3333C3 14.2538 3.74619 15 4.66667 15H11.3333C12.2538 15 13 14.2538 13 13.3333V4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-semibold">Hapus</span>
            </button>
          </div>
        </div>
      ) : (
        <img
          src={
            "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1733985462989.webp"
          }
          loading="lazy"
          className="size-[72px] rounded-full"
        />
      )}

      <Button onClick={handleUbah}>Ubah</Button>
      <span className="w-[107px] font-medium text-xs text-neutral-600 leading-[14.4px]">
        Format file jpg/png maks. 10MB
      </span>
    </div>
  );
};

export default ImageUploaderRegister;

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
