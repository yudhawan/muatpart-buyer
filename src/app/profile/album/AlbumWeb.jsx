"use client";

import { useState, useEffect } from "react";
import DataEmpty from "@/components/DataEmpty/DataEmpty";
import style from "./Album.module.scss";
import ProductGrid from "@/components/ProductsSectionComponent/ProductGrid";
import Image from "next/image";
import { EllipsisVertical, Plus } from "lucide-react";
import Modal from "@/components/Modals/modal";
import { useRouter } from "next/navigation";

function NewAlbumCard({ setModalNewAlbum }) {
  return (
    <div className="flex flex-col flex-1 shrink self-stretch pb-12 text-sm font-semibold leading-tight text-center text-black basis-0">
      <button
        className="flex flex-col justify-center items-center bg-white rounded-xl border-primary-700 border-dashed border h-48 w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Create new album"
        onClick={() => setModalNewAlbum(true)}
      >
        <Plus size={24} className="text-primary-700" />
        <div className="mt-2.5">Album Baru</div>
      </button>
    </div>
  );
}

function ImageGrid({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl">
        <span className="text-neutral-700 font-semibold">No Image</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="w-full h-48 relative rounded-xl overflow-hidden border border-neutral-400">
        <Image
          src={images[0]}
          fill
          alt="album-cover-1"
          className="object-cover"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 h-48">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative rounded-xl overflow-hidden border border-neutral-400 ${
              index === 0 ? "rounded-r-none" : "rounded-l-none"
            }`}
          >
            <Image
              src={image}
              alt="album-cover-2"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 h-48">
        <div className="relative rounded-xl overflow-hidden rounded-r-none border border-neutral-400">
          <Image
            src={images[0]}
            alt="album-cover-3"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-1">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className={`relative rounded-xl rounded-l-none overflow-hidden border border-neutral-400 ${
                index === 0 ? "rounded-b-none" : "rounded-t-none"
              }`}
            >
              <Image
                src={image}
                alt="album-cover-3"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 4) {
    const getRoundStyle = (index) => {
      switch (index) {
        case 0:
          return "rounded-tl-xl";
        case 1:
          return "rounded-tr-xl";
        case 2:
          return "rounded-bl-xl";
        case 3:
          return "rounded-br-xl";
      }
    };

    return (
      <div className="grid grid-cols-2 gap-1 h-48">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden border border-neutral-400 ${getRoundStyle(
              index
            )}`}
          >
            <Image
              src={image}
              alt={`album-cover-4-${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function AlbumCard({ id, title, itemCount, images }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerClass = `menu-container-${title.replace(
    /\s+/g,
    "-"
  )}-${itemCount}`;

  const handleClickOutside = (event) => {
    if (menuOpen && !event.target.closest(`.${menuContainerClass}`)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex flex-col self-stretch my-auto">
      <div
        className="cursor-pointer"
        onClick={() => router.push("/profile/album/" + id)}
      >
        <ImageGrid images={images} />
      </div>
      <div className="flex flex-col mt-3 w-full leading-tight">
        <div className="flex justify-between text-base ">
          <div className="font-bold text-black">{title}</div>
          {title !== "Semua Album" && (
            <div className={`relative ${menuContainerClass}`}>
              <EllipsisVertical
                size={18}
                className="text-neutral-700 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute top-5 right-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-xs">
                  <button className="w-full text-left px-3 py-2 rounded-t-md text-neutral-900 hover:bg-gray-100">
                    Ubah nama Album
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-b-md text-error-400 hover:bg-error-50">
                    Hapus
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-2 text-xs font-medium text-neutral-600">
          {itemCount} Barang
        </div>
      </div>
    </div>
  );
}

function AlbumGrid({ albumItems, setModalNewAlbum }) {
  return (
    <div className="flex flex-col justify-center p-6 bg-white rounded-xl shadow-muatmuat">
      <div className="grid grid-cols-3 gap-6">
        {albumItems.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            itemCount={album.itemCount}
            images={album.images}
          />
        ))}
        <NewAlbumCard setModalNewAlbum={setModalNewAlbum} />
      </div>
    </div>
  );
}

function AlbumWeb({
  albumItems,
  lastVisited,
  modalNewAlbum,
  setModalNewAlbum,
}) {
  return (
    <>
      <div className="flex gap-[30px]">
        <div className="w-[900px] space-y-6">
          <div className="flex gap-3">
            <h1 className="text-xl font-bold">Album</h1>
          </div>
          {albumItems.length === 0 ? (
            <DataEmpty
              title="Albummu kamu kosong"
              subtitle="Isi Album-mu dengan klik ikon hati saat kamu ketemu barang yang kamu suka!"
              buttonText="Cari Barang yang Disukai"
              onButtonClick={() => setModalNewAlbum(true)}
            />
          ) : (
            <AlbumGrid
              albumItems={albumItems}
              setModalNewAlbum={setModalNewAlbum}
            />
          )}
          <div className="">
            <ProductGrid
              title="Terakhir Kamu Lihat"
              totalProducts={Array(5).fill(lastVisited).flat().slice(0, 5)}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalNewAlbum}
        setIsOpen={setModalNewAlbum}
        closeArea={false}
        closeBtn={true}
      >
        si kocak
      </Modal>
    </>
  );
}

export default AlbumWeb;
