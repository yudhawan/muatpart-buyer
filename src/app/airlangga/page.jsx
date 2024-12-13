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

const OpsiList = [
  { name: "Pelanggaran HAKI & Produk MLM", value: "" },
  { name: "Barang Hasil Kejahatan", value: "" },
  { name: "Barang Palsu, Ilegal dan Berbahaya", value: "" },
  { name: "Kondisi Produk Rusak/Tidak Sesuai", value: "" },
  { name: "Stok Produk Kosong", value: "" },
  { name: "Duplikasi Produk Tanpa Izin", value: "" },
  { name: "Harga Produk Tidak Wajar", value: "" },
  { name: "Produk Mengandung Spam", value: "" },
  { name: "Kategori Produk Tidak Sesuai", value: "" },
  { name: "Lainnya", value: "" },
];

export default function Laporkan() {
  const [isMobile, setIsMobile] = useState(false);
  const { setModalOpen, setModalContent, setModalConfig } = modal();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <>
      <Toast />
      <LaporkanMobile />
    </>
  ) : (
    <>
      <Toast />
      <Modal />
      <Button
        onClick={() => {
          setModalContent(<LaporkanWeb />);
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

export const LaporkanWeb = () => {
  const { setModalOpen } = modal();
  const { setShowToast, setDataToast } = toast();
  const { dataLaporkan, setDataLaporkan, validateForm, resetForm } =
    laporkanProduk();
  const [foto, setFoto] = useState();

  // const handleFinishCrop = async(value) => {
  //   const formData = new FormData()
  //   formData.append("file",value)
  //   await triggerUploadPhoto(formData)
  // };

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
              options={OpsiList}
              onSelected={(e) => setDataLaporkan("OpsiPelanggaran", e[0].name)}
            />
            {dataLaporkan.OpsiPelanggaran.validation !== "" && (
              <span className="text-error-400 font-medium text-xs -mt-[10px]">
                {dataLaporkan.OpsiPelanggaran.validation}
              </span>
            )}
          </DivParticleLaporkan>

          <DivParticleLaporkan title="Detail Pelanggaran*" hr>
            <TextArea
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
              placeholder="Jelaskan pelanggaran yang terjadi"
              changeEvent={(e) =>
                setDataLaporkan("DetailPelanggaran", e.target.value)
              }
            />
          </DivParticleLaporkan>

          <DivParticleLaporkan title="Foto Bukti Laporan*" hr>
            <div className="flex gap-4">
              {Array(3)
                .fill()
                .map((_, idx) => {
                  return (
                    <ImageUploader
                      className="!rounded-[4px] !size-[40px]"
                      getImage={(e) => setFoto(e)}
                      maxSize={10000}
                      // onFinishCrop={handleFinishCrop}
                      uploadText=""
                      isCircle={true}
                    />
                  );
                })}
            </div>

            <span className="font-medium text-xs">
              Min. 1 foto dengan format file jpg/png, besar file maks. 10MB
            </span>
          </DivParticleLaporkan>

          <DivParticleLaporkan title="Link Referensi" optional hr>
            <Input
              placeholder="Berikan referensi untuk memperkuat laporan"
              changeEvent={(e) =>
                setDataLaporkan("LinkPelanggaran", e.target.value)
              }
            />
          </DivParticleLaporkan>

          <div className="flex items-baseline gap-1">
            <div className="translate-y-1">
              <Checkbox
                label=""
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
          onClick={() => validateForm({ setShowToast, setDataToast }, true)}
        >
          Laporkan
        </Button>
      </div>
    </div>
  );
};

export const LaporkanMobile = () => {
  const {
    setShowToast,
    setDataToast,
    setShowBottomsheet,
    setTitleBottomsheet,
    setDataBottomsheet,
  } = toast();
  const { dataLaporkan, setDataLaporkan, validateForm, resetForm } =
    laporkanProduk();

  // State lokal untuk pilihan sementara
  const [tempOpsi, setTempOpsi] = useState("");

  // Handle pilihan radio
  const handleRadioSelect = (value) => {
    setTempOpsi(value);
    // Re-render bottomsheet content dengan nilai yang baru
    renderBottomsheetContent(value);
  };

  useEffect(() => {
    console.log(dataLaporkan);
  }, [dataLaporkan]);

  // Fungsi untuk render content bottomsheet
  const renderBottomsheetContent = (currentSelection) => {
    setDataBottomsheet(
      <>
        <div className="flex flex-col gap-4 max-h-[397px] overflow-auto">
          {OpsiList.map((key, idx) => (
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
              {idx !== OpsiList.length - 1 && (
                <hr className="border-neutral-400" />
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

  return (
    <>
      <Bottomsheet />
      <div className="space-y-6 py-5 px-4">
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
            placeholder="Jelaskan pelanggaran yang terjadi"
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
            changeEvent={(e) =>
              setDataLaporkan("LinkPelanggaran", e.target.value)
            }
          />
        </DivParticleLaporkan>
        <div className="flex items-baseline gap-1 sm:items-center">
          <div className="translate-y-1 sm:translate-y-0">
            <Checkbox
              label=""
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
            onClick={() => validateForm({ setShowToast, setDataToast }, false)}
          >
            Laporkan
          </Button>
        </div>
      </div>
    </>
  );
};

export const DivParticleLaporkan = ({ title, optional, hr, children, classname }) => {
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
