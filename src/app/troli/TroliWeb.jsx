"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./Troli.module.scss";
import Checkbox from "@/components/Checkbox/Checkbox";
import Button from "@/components/Button/Button";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { numberFormatMoney } from "@/libs/NumberFormat";
import IconComponent from "@/components/IconComponent/IconComponent";
import QuantityInput from "@/components/QuantityInput/QuantityInput";

function ProductList({ item, checked, onCheckChange }) {
  const [liked, setLiked] = useState(item.liked);
  const [quantity, setQuantity] = useState(
    item.quantity > item.stock ? item.stock : item.quantity
  );

  return (
    <div className="flex gap-5 items-start py-4">
      <Checkbox
        label=""
        checked={checked}
        onChange={(e) => onCheckChange(e.checked)}
        classname="!gap-0"
      />
      <div className="w-full">
        <div className="flex gap-5 w-full mb-5">
          <div className="relative w-[56px] h-[56px]">
            <Image
              src={item.image}
              fill
              style={{ objectFit: "cover" }}
              alt={item.name}
            />
          </div>
          <div className="flex w-full justify-between">
            <div className="w-[450px] space-y-3 text-xs">
              <div className="font-bold">{item.name}</div>
              <div className="flex gap-3 items-center">
                {item.stock < 10 && (
                  <>
                    <div className="text-error-400 font-bold">
                      Tersisa {item.stock} produk
                    </div>
                    <div className="w-px h-2 bg-black"></div>
                  </>
                )}
                <div className="font-medium text-neutral-600">
                  {item.variant}
                </div>
              </div>
            </div>
            <div className="text-xs space-y-2">
              {item.discount > 0 && (
                <div className="flex gap-2 items-center">
                  <strike className="text-neutral-600">
                    {numberFormatMoney(item.initialPrice)}
                  </strike>
                  <div className="bg-error-400 rounded p-1 font-semibold text-white leading-none">
                    {item.discount}% OFF
                  </div>
                </div>
              )}
              <div className="font-bold text-right">
                {numberFormatMoney(item.finalPrice)}
              </div>
            </div>
          </div>
        </div>

        {item.note && (
          <div className="text-xs text-neutral-600 w-[500px] -mb-1 line-clamp-1">
            Catatan : {item.note}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className={`${style.textButtonPrimary} ${style.active}`}>
            {item.note ? "Ubah Catatan" : "Tambah Catatan"}
          </div>

          <div className="flex gap-6 items-center">
            <IconComponent
              src="/icons/heart-outline.svg"
              classname={liked ? style.liked : ""}
              onclick={() => setLiked(!liked)}
            />
            <IconComponent
              src="/icons/trash-az.svg"
              onclick={() => console.log("delete item", item.id)}
            />
            <QuantityInput
              maxStock={item.stock}
              initialValue={quantity}
              onChange={(val) => setQuantity(val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerCard({
  seller,
  selectedProducts,
  onSellerCheckChange,
  onProductCheckChange,
}) {
  const allProductsSelected = seller.items.every(
    (item) => selectedProducts[item.id]
  );

  return (
    <div className="px-8 py-5 shadow-muatmuat rounded-xl space-y-3">
      <div className="flex justify-between">
        <Checkbox
          label={seller.storeName}
          checked={allProductsSelected}
          classname="font-semibold !text-primary-700"
          onChange={(e) => onSellerCheckChange(seller.storeName, e.checked)}
        />
        <div
          className={`${style.textButtonPrimary} ${
            seller.items.some((item) => selectedProducts[item.id])
              ? style.active
              : ""
          }`}
        >
          Gunakan Voucher Penjual
        </div>
      </div>
      <div className="flex items-center px-4 py-2 bg-neutral-200 gap-2 rounded-md ml-6">
        <MapPin size={16} className="text-neutral-700" />
        <div className="font-medium text-xs">
          Dikirim dari : {seller.sendFrom}
        </div>
      </div>
      <div className="flex items-center px-4 py-2 gap-2 rounded-md ml-6 border border-neutral-400">
        <MapPin size={16} className="text-neutral-700" />
        <div className="font-medium text-xs">
          Dikirim ke : <strong>{seller.sendTo}</strong>
        </div>
        <div
          className={`ml-auto ${style.textButtonPrimary} ${
            seller.items.some((item) => selectedProducts[item.id])
              ? style.active
              : ""
          }`}
        >
          Ubah Alamat Tujuan
        </div>
      </div>
      <div className="divide-y">
        {seller.items.map((item) => (
          <ProductList
            key={item.id}
            item={item}
            checked={selectedProducts[item.id] || false}
            onCheckChange={(checked) =>
              onProductCheckChange(seller.storeName, item.id, checked)
            }
          />
        ))}
      </div>
    </div>
  );
}

function TroliWeb({ sellerItems }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(() => {
    return sellerItems.reduce((acc, seller) => {
      seller.items.forEach((item) => {
        acc[item.id] = item.selected;
      });
      return acc;
    }, {});
  });

  const calculateTotalPrice = (selectedState) => {
    return sellerItems.reduce((total, seller) => {
      return (
        total +
        seller.items.reduce((storeTotal, item) => {
          return (
            storeTotal +
            (selectedState[item.id] ? item.finalPrice * item.quantity : 0)
          );
        }, 0)
      );
    }, 0);
  };

  const [totalPrice, setTotalPrice] = useState(() =>
    calculateTotalPrice(selectedProducts)
  );

  const [voucherUsed] = useState([
    {
      id: 1,
      name: "DISKONPENGGUNABARU",
      value: 100000,
      type: "muatparts",
    },
    {
      id: 2,
      name: "DISKONTOKOBANGUNANBURIK",
      value: 200000,
      type: "seller",
    },
  ]);

  const handleSelectAll = (checked) => {
    const newSelectedState = {};
    sellerItems.forEach((seller) => {
      seller.items.forEach((item) => {
        newSelectedState[item.id] = checked;
      });
    });
    setSelectedProducts(newSelectedState);
    setSelectAll(checked);
    setTotalPrice(calculateTotalPrice(newSelectedState));
  };

  const handleSellerCheckbox = (storeName, checked) => {
    const newSelectedState = { ...selectedProducts };
    const seller = sellerItems.find((s) => s.storeName === storeName);

    if (seller) {
      seller.items.forEach((item) => {
        newSelectedState[item.id] = checked;
      });
    }

    setSelectedProducts(newSelectedState);

    const allSelected = sellerItems.every((seller) =>
      seller.items.every((item) => newSelectedState[item.id])
    );
    setSelectAll(allSelected);
    setTotalPrice(calculateTotalPrice(newSelectedState));
  };

  const handleProductCheckbox = (storeName, productId, checked) => {
    const newSelectedState = {
      ...selectedProducts,
      [productId]: checked,
    };

    setSelectedProducts(newSelectedState);

    const allSelected = sellerItems.every((seller) =>
      seller.items.every((item) => newSelectedState[item.id])
    );
    setSelectAll(allSelected);
    setTotalPrice(calculateTotalPrice(newSelectedState));
  };

  const totalSelectedItems =
    Object.values(selectedProducts).filter(Boolean).length;

  return (
    <div className={style.main}>
      <div className="flex gap-3 mb-4">
        <Image
          src="/icons/arrowbackblue.svg"
          width={24}
          height={24}
          className="cursor-pointer"
          alt="Back"
        />
        <h1 className="text-xl font-bold">Troli</h1>
      </div>

      {sellerItems.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center rounded-xl p-6 shadow-muatmuat">
          <Image
            src="/img/daftarprodukicon.png"
            width={95}
            height={95}
            alt="Empty cart"
          />
          <div className="font-semibold text-neutral-600 my-3">
            Wah, troli belanjamu kosong
          </div>
          <div className="text-xs font-medium text-neutral-600 mb-5">
            Yuk, isi dengan barang-barang impianmu!
          </div>
          <Button
            iconLeft={<Search size={16} />}
            Class="!font-semibold !gap-2 !items-center"
          >
            Cari Produk
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="w-[846px] space-y-6">
            <div className="flex justify-between px-8 py-5 shadow-muatmuat rounded-xl">
              <Checkbox
                label="Pilih semua"
                classname="font-medium"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.checked)}
              />
              <div className="flex gap-6">
                <div
                  className={`${style.textButtonPrimary} ${
                    selectAll ? style.active : ""
                  }`}
                >
                  Ubah Alamat
                </div>
                <div
                  className={`${style.textButtonError} ${
                    selectAll ? style.active : ""
                  }`}
                >
                  Hapus
                </div>
              </div>
            </div>

            {sellerItems.map((seller) => (
              <SellerCard
                key={seller.storeName}
                seller={seller}
                selectedProducts={selectedProducts}
                onSellerCheckChange={handleSellerCheckbox}
                onProductCheckChange={handleProductCheckbox}
              />
            ))}
          </div>

          <div className="w-[338px]">
            <div className="rounded-xl shadow-muatmuat px-5 py-6 space-y-6">
              <div className="font-bold">Ringkasan Pesanan</div>
              <div className="flex justify-between items-center border border-primary-700 bg-primary-50 py-2 px-3 rounded-md cursor-pointer">
                {voucherUsed.find((item) => item.type === "muatparts") ? (
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/img/voucher-used.png"
                      width={24}
                      height={24}
                      alt="Voucher used"
                    />
                    <div className="text-xs font-medium text-primary-700">
                      {
                        voucherUsed.filter((item) => item.type === "muatparts")
                          .length
                      }{" "}
                      Voucher Terpakai
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/img/voucher-none.png"
                      width={24}
                      height={24}
                      alt="No voucher"
                    />
                    <div className="text-xs font-medium">
                      Makin hemat pakai voucher
                    </div>
                  </div>
                )}
                <ChevronRight
                  size={16}
                  className={voucherUsed.length > 0 ? "text-primary-700" : ""}
                />
              </div>
              <div className="flex justify-between text-xs font-medium">
                <div className="w-[148px] text-neutral-600">
                  Total harga ({totalSelectedItems} Produk)
                </div>
                <div className="text-right">
                  {numberFormatMoney(totalPrice)}
                </div>
              </div>
              {voucherUsed?.map((voucher) => (
                <div
                  key={voucher.id}
                  className="flex justify-between text-xs font-medium"
                >
                  <div className="w-[148px] text-neutral-600">
                    <span>Voucher : </span>
                    <span className="inline-block max-w-[80px] truncate align-bottom">
                      {voucher.name}
                    </span>
                  </div>
                  <div className="text-right text-error-400">
                    -{numberFormatMoney(voucher.value)}
                  </div>
                </div>
              ))}
              <div className="border-[0.5px] border-neutral-400"></div>
              <div className="flex justify-between font-bold">
                <div>Total</div>
                <div>
                  {numberFormatMoney(
                    Math.max(
                      0,
                      totalPrice -
                        voucherUsed.reduce((acc, v) => acc + v.value, 0)
                    )
                  )}
                </div>
              </div>
              <div className="border-[0.5px] border-neutral-400"></div>
              <Button
                Class="!max-w-full !w-full"
                onClick={() => console.log("beli")}
                disabled={totalSelectedItems === 0}
              >
                Beli ({totalSelectedItems})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TroliWeb;
