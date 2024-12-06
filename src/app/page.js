"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/AI/Modal";
import { modal } from "@/store/AI/modal";
import Dropdown from "@/components/Dropdown/Dropdown";
import TextArea from "@/components/TextArea/TextArea";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
// import ImageUploader from "@/components/ImageUploader/ImageUploader";

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
  const { setModalOpen, setModalContent, setModalConfig } = modal();

  return (
    <div>
      {/* <Toast/> */}
      <Modal />
      <Button
        onClick={() => {
          setModalContent(<DemoModal />);
          setModalOpen(true);
          setModalConfig({
            width: 472,
            height: 512,
            withHeader: false,
            withClose: false,
          });
        }}
      >
        Laporkan produk
      </Button>
    </div>
  );
}

export const DemoModal = () => {
  const { setModalOpen } = modal();
  const [dataLaporkan, setDataLaporkan] = useState({
    OpsiPelanggaran: "",
    DetailPelanggaran: "",
    FotoPelanggaran: null,
    LinkPelanggaran: "",
    CheckboxPelanggaran: false,
  });

  const ValidateFormLaporkan = () => {
    if(!dataLaporkan.CheckboxPelanggaran) return
  }

  return (
    <div className="space-y-4 py-8 px-6 ">
      <span className="font-bold text-base text-neutral-900 flex justify-center">
        Laporkan Produk
      </span>
      <div className="space-y-4 h-[357px] overflow-auto">
        <label className="font-bold text-xs text-neutral-600 block">
          Pilih kategori pelanggaran yang terjadi pada produk ini
        </label>

        <DivParticleLaporkan title="Opsi Pelanggaran*" hr>
          <Dropdown
            classname="!w-full !min-w-full !max-w-full !border border-neutral-600"
            placeholder="Pilih Opsi Pelanggaran"
            options={OpsiList}
          />
        </DivParticleLaporkan>
        <DivParticleLaporkan title="Detail Pelanggaran*" hr>
          <TextArea
            classname="!w-full !min-w-full !max-w-full "
            placeholder="Jelaskan pelanggaran yang terjadi"
            supportiveText={{ title: "Min. 30 Karakter" }}
          ></TextArea>
        </DivParticleLaporkan>
        <DivParticleLaporkan title="Foto Bukti Laporan*" hr>
          {/* {Array(3).map((dm, ix) => {
          return <ImageUploader key={ix}/>
        })} */}
          <span className="font-medium text-xs">
            Min. 1 foto dengan format file jpg/png, besar file maks. 10MB
          </span>
        </DivParticleLaporkan>
        <DivParticleLaporkan title="Link Referensi" optional hr>
          <Input placeholder="Berikan referensi untuk memperkuat laporan" />
        </DivParticleLaporkan>
        <div className="flex items-baseline gap-1">
          <div className="translate-y-1">
            <Checkbox label="" />
          </div>
          <span className="text-neutral-900 text-xs font-medium">
            Saya dengan ini menyatakan bahwa segala informasi yang dilaporkan
            memang benar
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Button
          color="primary_secondary"
          Class="!max-w-[112px] !max-h-8 !font-semibold"
          onClick={() => setModalOpen(false)}
        >
          Batalkan
        </Button>
        <Button
          Class="!max-w-[112px] !max-h-8 !font-semibold"
          onClick={() => ValidateFormLaporkan()}
        >
          Laporkan
        </Button>
      </div>
    </div>
  );
};

const DivParticleLaporkan = ({ title, optional, hr, children }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="font-medium text-xs text-neutral-900">
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
