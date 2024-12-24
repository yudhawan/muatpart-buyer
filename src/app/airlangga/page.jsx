"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/AI/Modal";
import { modal } from "@/store/modal";
import Dropdown from "@/components/Dropdown/Dropdown";
import TextArea from "@/components/TextArea/TextArea";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import Toast from "@/components/Toast/Toast";
import Bottomsheet from "@/components/Bottomsheet/Bottomsheet";
import toast from "@/store/toast";
import { laporkanProduk } from "@/store/laporkanProduk";
import RadioButton from "@/components/Radio/RadioButton";
import IconComponent from "@/components/IconComponent/IconComponent";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import SWRHandler from "@/services/useSWRHook";
import NavSelectedMobile from "@/components/Bottomsheet/NavSelectedMobile";
import { X } from "lucide-react";

const api = process.env.NEXT_PUBLIC_GLOBAL_API;

export default function Laporkan({
  idProduct = "cade02cd-d60f-4696-ac7e-3943aa",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const { setModalOpen, setModalContent, setModalConfig } = modal();
  const { useSWRHook, useSWRMutateHook } = new SWRHandler();
  const { setShowToast, setDataToast } = toast();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get data opsi di parent saja
  const { data: reportOptions } = useSWRHook(
    `${api}v1/muatparts/report_option`
  );

  const { trigger: submitReport } = useSWRMutateHook(
    `${api}v1/muatparts/report_product`,
    "POST"
  );

  const [opsiList, setOpsiList] = useState([]);

  useEffect(() => {
    if (reportOptions?.Data) {
      const formattedOptions = reportOptions.Data.map((item) => ({
        name: item.value,
        value: item.id,
      }));
      setOpsiList(formattedOptions);
    }
  }, [reportOptions]);

  const handleSubmitReport = async (isDesktop) => {
    const { validateForm, dataLaporkan, setApiValidationErrors } =
      laporkanProduk.getState();
    const isValid = validateForm({ setShowToast, setDataToast }, isDesktop);

    if (isValid) {
      try {
        // Siapkan array foto yang tidak null
        const photos = dataLaporkan.FotoPelanggaran.value || [];

        // Buat object payload dasar
        const payload = {
          option: dataLaporkan.OpsiPelanggaran.value,
          details: dataLaporkan.DetailPelanggaran.value,
          link: dataLaporkan.LinkPelanggaran.value,
          productID: idProduct,
        };

        // Tambahkan foto ke payload dengan format photo[index]
        photos.forEach((photo, index) => {
          payload[`photo[${index}]`] = photo;
        });

        await submitReport(payload, `${api}v1/muatparts/report_product`);
        setModalOpen(false);
      } catch (error) {
        if (error?.response?.status === 400 && error?.response?.data?.Data) {
          setApiValidationErrors(error.response.data.Data);
        }
      }
    }
  };

  return isMobile ? (
    <>
      <Toast />
      <LaporkanMobile opsiList={opsiList} onSubmit={handleSubmitReport} />
    </>
  ) : (
    <>
      <Toast />
      <Modal />
      <Button
        onClick={() => {
          setModalContent(
            <LaporkanWeb opsiList={opsiList} onSubmit={handleSubmitReport} />
          );
          setModalOpen(true);
          setModalConfig({
            classname: "!w-[472px]",
            withHeader: false,
            withClose: false,
          });
        }}
      >
        Laporkan produk
      </Button>
    </>
  );
}

export const LaporkanWeb = ({ opsiList, onSubmit }) => {
  const { useSWRMutateHook } = new SWRHandler();
  const { setModalOpen } = modal();
  const { setShowToast, setDataToast } = toast();
  const { dataLaporkan, setDataLaporkan, validateForm, resetForm } =
    laporkanProduk();
  const [foto, setFoto] = useState(Array(3).fill(null));
  const [isUploading, setIsUploading] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0); // Key untuk force re-render

  const { trigger: uploadImage } = useSWRMutateHook(
    `${api}v1/muatparts/upload_report`,
    "POST"
  );

  const handleUploadImage = async (base64String, index) => {
    try {
      setIsUploading(true);

      // Convert base64 to binary
      const base64Response = await fetch(base64String);
      const blob = await base64Response.blob();

      const formData = new FormData();
      formData.append("file", blob);

      const response = await uploadImage(formData);

      if (response?.data?.Data?.url) {
        const newUrl = response.data.Data.url;

        // Get existing photos excluding nulls
        let existingPhotos = foto.filter((f) => f !== null);

        // Remove the same URL if exists to prevent duplicates
        existingPhotos = existingPhotos.filter((f) => f !== newUrl);

        // Insert the new URL to the first position
        existingPhotos.unshift(newUrl);

        // Keep only first 3 photos
        existingPhotos = existingPhotos.slice(0, 3);

        // Create final array with remaining slots as null
        const finalFotos = [...existingPhotos];
        while (finalFotos.length < 3) {
          finalFotos.push(null);
        }

        // Force complete re-render of all uploaders
        setUploaderKey((prev) => prev + 1);
        setFoto(finalFotos);
        setDataLaporkan("FotoPelanggaran", existingPhotos);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setShowToast(true);
      setDataToast({
        type: "error",
        message: "Gagal memproses foto",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (removeIndex) => {
    const newFotos = foto.filter((f, idx) => idx !== removeIndex && f !== null);
    const finalFotos = [...newFotos];
    while (finalFotos.length < 3) {
      finalFotos.push(null);
    }

    // Force complete re-render of all uploaders
    setUploaderKey((prev) => prev + 1);
    setFoto(finalFotos);
    setDataLaporkan("FotoPelanggaran", newFotos);
  };

  useEffect(() => {
    return () => resetForm();
  }, []);

  return (
    <div className="py-8 px-6">
      {/* Header tetap */}
      <span className="font-bold text-base text-neutral-900 flex justify-center mb-4">
        Laporkan Produk
      </span>

      {/* Area scroll dengan tinggi tetap */}
      <div className="h-[357px] overflow-y-auto pr-2 mb-4">
        <div className="space-y-4">
          <label className="font-bold text-xs text-neutral-600 block">
            Pilih kategori pelanggaran yang terjadi pada produk ini
          </label>

          <DivParticleLaporkan title="Opsi Pelanggaran*" hr>
            <Dropdown
              classname={`!w-full !min-w-full !max-w-full !border ${
                dataLaporkan.OpsiPelanggaran.validation !== ""
                  ? "!border-error-400"
                  : "!border-neutral-600"
              }`}
              placeholder="Pilih Opsi Pelanggaran"
              options={opsiList}
              displayKey="name" // tambah ini untuk menentukan key yang ditampilkan
              valueKey="value" // tambah ini untuk value yang akan dipilih
              onSelected={(e) => setDataLaporkan("OpsiPelanggaran", e[0].value)}
            />
            {dataLaporkan.OpsiPelanggaran.validation !== "" && (
              <span className="text-error-400 font-medium text-xs -mt-[10px]">
                {dataLaporkan.OpsiPelanggaran.validation}
              </span>
            )}
          </DivParticleLaporkan>

          <DivParticleLaporkan title="Detail Pelanggaran*" hr>
            <TextArea
              maxLength={1000}
              hasCharCount={false}
              status={`${
                dataLaporkan.DetailPelanggaran.validation !== "" && "error"
              }`}
              supportiveText={{
                title: `${
                  dataLaporkan.DetailPelanggaran.validation !== ""
                    ? dataLaporkan.DetailPelanggaran.validation
                    : "Min. 30 Karakter"
                }`,
              }}
              classname="!w-full !min-w-full !max-w-full"
              resize="none"
              placeholder="Jelaskan pelanggaran yang terjadi"
              value={dataLaporkan.DetailPelanggaran.value}
              changeEvent={(e) =>
                setDataLaporkan("DetailPelanggaran", e.target.value)
              }
            />
          </DivParticleLaporkan>

          <DivParticleLaporkan title="Foto Bukti Laporan*" hr>
            <div className="flex gap-4">
              {foto.map((url, idx) => (
                <div
                  key={`container-${uploaderKey}-${idx}`}
                  className="relative"
                >
                  <div className={`${url ? "hidden" : "block"}`}>
                    <ImageUploader
                      key={`uploader-${uploaderKey}-${idx}`}
                      className="!rounded-[4px] !size-[40px]"
                      getImage={(e) => handleUploadImage(e, idx)}
                      maxSize={10000}
                      uploadText=""
                      isCircle={true}
                      onUpload={() => {}}
                      onError={() => {}}
                      error={false}
                    />
                  </div>
                  {url && (
                    <div className="relative border border-[#868686] border-dashed rounded-[4px]">
                      <img
                        src={url}
                        className="!rounded-[4px] !size-[40px] object-cover"
                        alt={`Foto ${idx + 1}`}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        className="absolute top-[1px] right-[3px] rounded-full size-4 flex items-center justify-center z-10 bg-white"
                      >
                        <X color="black" size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {dataLaporkan.FotoPelanggaran.validation ? (
              <span className="font-medium text-error-400 text-xs">
                {dataLaporkan.FotoPelanggaran.validation}
              </span>
            ) : (
              <span className="font-medium text-xs">
                Min. 1 foto dengan format file jpg/png, besar file maks. 10MB
              </span>
            )}
          </DivParticleLaporkan>

          <DivParticleLaporkan title="Link Referensi" optional hr>
            <Input
              placeholder="Berikan referensi untuk memperkuat laporan"
              value={dataLaporkan.LinkPelanggaran.value}
              // Tambahkan kondisi error
              status={dataLaporkan.LinkPelanggaran.validation ? "error" : ""}
              // Tambahkan supportive text untuk menampilkan pesan error
              supportiveText={{
                title: dataLaporkan.LinkPelanggaran.validation || "",
                desc: "",
              }}
              changeEvent={(e) =>
                setDataLaporkan("LinkPelanggaran", e.target.value)
              }
            />
          </DivParticleLaporkan>

          <div className="flex items-baseline gap-1">
            <div className="translate-y-1">
              <Checkbox
                label=""
                checked={dataLaporkan.CheckboxPelanggaran.value}
                value={dataLaporkan.CheckboxPelanggaran.value}
                onChange={(e) =>
                  setDataLaporkan("CheckboxPelanggaran", e.checked)
                }
              />
            </div>
            <span className="text-neutral-900 text-xs font-medium">
              Saya dengan ini menyatakan bahwa segala informasi yang dilaporkan
              memang benar
            </span>
          </div>
        </div>
      </div>

      {/* Footer tetap */}
      <div className="flex justify-center gap-2">
        <Button
          color="primary_secondary"
          Class="!max-w-[112px] !max-h-8 !font-semibold"
          onClick={() => {
            resetForm();
            setModalOpen(false);
          }}
        >
          Batalkan
        </Button>
        <Button
          Class="!max-w-[112px] !max-h-8 !font-semibold"
          onClick={() =>
            validateForm({ setShowToast, setDataToast }, true) && onSubmit(true)
          }
        >
          Laporkan
        </Button>
      </div>
    </div>
  );
};

export const LaporkanMobile = ({ opsiList, onSubmit }) => {
  const {
    setShowToast,
    setDataToast,
    setShowBottomsheet,
    setTitleBottomsheet,
    setDataBottomsheet,
  } = toast();
  const { dataLaporkan, setDataLaporkan, validateForm, resetForm } =
    laporkanProduk();
  const [tempOpsi, setTempOpsi] = useState("");

  // Handle pilihan radio
  const handleRadioSelect = (value) => {
    setTempOpsi(value);
    // Re-render bottomsheet content dengan nilai yang baru
    renderBottomsheetContent(value);
  };

  // Fungsi untuk render content bottomsheet
  const renderBottomsheetContent = (currentSelection) => {
    setDataBottomsheet(
      <>
        <div className="flex flex-col gap-4 max-h-[397px] overflow-auto">
          {opsiList.map((key, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-sm text-neutral-900">
                  {key.name}
                </span>
                <RadioButton
                  name="radioOpsiPelanggaran"
                  isChecked={currentSelection === key.name}
                  value={key.name}
                  onClick={() => handleRadioSelect(key.name)}
                />
              </div>
              {idx !== opsiList.length - 1 && (
                <hr className="border-neutral-400 mt-3" />
              )}
            </div>
          ))}
        </div>
        <Button
          Class="!w-full !max-w-full mt-4"
          onClick={() => {
            setDataLaporkan("OpsiPelanggaran", currentSelection);
            setShowBottomsheet(false);
          }}
        >
          Terapkan
        </Button>
      </>
    );
  };

  // Handle buka bottomsheet
  const handleOpenBottomsheet = () => {
    const initialValue = dataLaporkan.OpsiPelanggaran.value;
    setTempOpsi(initialValue);
    setShowBottomsheet(true);
    setTitleBottomsheet("Opsi Pelanggaran");
    renderBottomsheetContent(initialValue);
  };

  const handleSubmit = async () => {
    const isValid = validateForm({ setShowToast, setDataToast }, false);
    if (isValid) {
      await onSubmit(dataLaporkan);
    }
  };

  return (
    <>
      <Bottomsheet />
      <div className="space-y-6 py-5 px-4">
        <span className="font-bold text-sm text-neutral-900">
          Pilih kategori pelanggaran yang terjadi pada produk ini
        </span>
        <DivParticleLaporkan title="Opsi Pelanggaran*">
          <div
            className={`!w-full !h-8 !border font-semibold text-sm rounded-md px-3 items-center flex justify-between ${
              dataLaporkan.OpsiPelanggaran.value
                ? "!text-neutral-900"
                : "!text-neutral-600"
            } ${
              dataLaporkan.OpsiPelanggaran.validation !== ""
                ? "!border-error-400"
                : "!border-neutral-600"
            }`}
            onClick={handleOpenBottomsheet}
          >
            {dataLaporkan.OpsiPelanggaran.value || "Pilih Opsi Pelanggaran"}
            <IconComponent src="/icons/chevron-down.svg" />
          </div>
          {dataLaporkan.OpsiPelanggaran.validation !== "" && (
            <span className="text-error-400 font-medium text-xs -mt-[10px]">
              {dataLaporkan.OpsiPelanggaran.validation}
            </span>
          )}
        </DivParticleLaporkan>
        <DivParticleLaporkan title="Detail Pelanggaran*">
          <TextArea
            hasCharCount={false}
            status={`${
              dataLaporkan.DetailPelanggaran.validation !== "" && "error"
            }`}
            supportiveText={{
              title: `${
                dataLaporkan.DetailPelanggaran.validation !== ""
                  ? dataLaporkan.DetailPelanggaran.validation
                  : "Min. 30 Karakter"
              }`,
            }}
            classname="!w-full !min-w-full !max-w-full"
            resize="none"
            placeholder="Jelaskan pelanggaran yang terjadi"
            value={dataLaporkan.DetailPelanggaran.value}
            changeEvent={(e) =>
              setDataLaporkan("DetailPelanggaran", e.target.value)
            }
          />
        </DivParticleLaporkan>
        <DivParticleLaporkan title="Foto Bukti Laporan*">
          {/* {Array(3).map((dm, ix) => {
          return <ImageUploader key={ix}/>
        })} */}
          <span className="font-medium text-xs text-neutral-600">
            Min. 1 foto dengan format file jpg/png, besar file maks. 10MB
          </span>
        </DivParticleLaporkan>
        <DivParticleLaporkan title="Link Referensi" optional>
          <Input
            placeholder="Berikan referensi untuk memperkuat laporan"
            value={dataLaporkan.LinkPelanggaran.value}
            // Tambahkan kondisi error
            status={dataLaporkan.LinkPelanggaran.validation ? "error" : ""}
            // Tambahkan supportive text untuk menampilkan pesan error
            supportiveText={{
              title: dataLaporkan.LinkPelanggaran.validation || "",
              desc: "",
            }}
            changeEvent={(e) =>
              setDataLaporkan("LinkPelanggaran", e.target.value)
            }
          />
        </DivParticleLaporkan>
        <div className="flex items-baseline gap-1 sm:items-center">
          <div className="translate-y-1 sm:translate-y-0">
            <Checkbox
              label=""
              checked={dataLaporkan.CheckboxPelanggaran.value}
              value={dataLaporkan.CheckboxPelanggaran.value}
              onChange={(e) =>
                setDataLaporkan("CheckboxPelanggaran", e.checked)
              }
            />
          </div>
          <span className="text-neutral-900 text-xs font-medium sm:text-sm sm:font-bold">
            Saya dengan ini menyatakan bahwa segala informasi yang dilaporkan
            memang benar
          </span>
        </div>
        <NavSelectedMobile classname="!left-0">
          <div className="flex justify-center gap-2">
            <Button
              color="primary_secondary"
              Class="!max-w-full !w-full !max-h-10 !font-semibold"
              onClick={() => {
                resetForm();
                setModalOpen(false);
              }}
            >
              Batalkan
            </Button>
            <Button
              Class="!max-w-full !w-full !max-h-10 !font-semibold"
              onClick={() =>
                validateForm({ setShowToast, setDataToast }, false) &&
                onSubmit(false)
              }
            >
              Laporkan
            </Button>
          </div>
        </NavSelectedMobile>
      </div>
    </>
  );
};

export const DivParticleLaporkan = ({
  title,
  optional,
  hr,
  children,
  classname,
}) => {
  return (
    <>
      <div className={`flex flex-col gap-4 ${classname}`}>
        <span className="font-medium text-xs text-neutral-900 sm:font-semibold sm:text-sm">
          {title}{" "}
          {optional && (
            <span className="italic text-neutral-600">(Opsional)</span>
          )}
        </span>
        {children}
      </div>
      {hr && <hr className="border-neutral-400" />}
    </>
  );
};
