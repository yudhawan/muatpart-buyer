"use client";

import DataEmpty from "@/components/DataEmpty/DataEmpty";
import style from "./Album.module.scss";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import ProductGrid from "@/components/ProductsSectionComponent/ProductGrid";

function AlbumWeb({ albumItems, lastVisited }) {
  return (
    <div className={style.main}>
      <div className="flex gap-[30px]">
        <Sidebar />
        <div className="w-[900px] space-y-6">
          <div className="flex gap-3">
            <h1 className="text-xl font-bold">Album</h1>
          </div>

          {albumItems.length === 0 ? (
            <DataEmpty
              title="Albummu kamu kosong"
              subtitle="Isi Album-mu dengan klik ikon hati saat kamu ketemu barang yang kamu suka!"
              buttonText="Cari Barang yang Disukai"
            />
          ) : (
            <div className="">Hai</div>
          )}

          <div className="">
            <ProductGrid
              title="Terakhir Kamu Lihat"
              totalProducts={lastVisited}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumWeb;
