import React from "react";
import style from "./ProductComponent.module.scss";
import Image from "next/image";
import IconComponent from "../IconComponent/IconComponent";
import { numberFormatMoney } from "@/libs/NumberFormat";

function ProductComponent({
  id,
  image,
  favorite,
  productName,
  storeName,
  price,
  stock,
  discount,
  star,
  quality,
  location,
  soldCount,
  warranty,
}) {
  return (
    <div className={style.main}>
      <div className={style.sectionTop}>
        <span className="absolute right-0 m-2 w-7 h-7 rounded-full bg-neutral-50 grid place-content-center">
          <IconComponent
            src={"/icons/heart-outline.svg"}
            classname={favorite ? style.favorite : ""}
          />
        </span>
        <Image
          src={image ? image : "/img/chopper.png"}
          width={168}
          height={168}
          alt={productName}
          className="rounded-t-md object-contain aspect-square"
        />
      </div>
      <div className={style.sectionBottom}>
        <span className="bg-warning-100 py-1 px-3 my-2 w-fit rounded-r-[20px] text-xs font-semibold text-warning-900">
          Kualitas : {quality}
        </span>

        <div className="px-2">
          <h1 className="text-xs font-medium text-neutral-900 w-full line-clamp-2 leading-tight mb-1">
            {productName}
          </h1>
          {discount ? (
            <>
              <div className="flex gap-1 items-center">
                <strike className="text-neutral-600 text-[10px] font-medium">
                  {price}
                </strike>

                <p className={style.discount}>{discount}% OFF</p>
              </div>
              <h1 className="text-neutral-900 text-sm font-bold">
                {numberFormatMoney(Math.ceil(price - (price * discount) / 100))}
              </h1>
            </>
          ) : (
            <h1 className="text-neutral-900 text-sm font-bold">
              {numberFormatMoney(price)}
            </h1>
          )}

          <div className="space-y-1 mt-1">
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/gift.svg"}
                width={16}
                height={16}
                alt="gift"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {warranty}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/product-house.svg"}
                width={16}
                height={16}
                alt="house"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {storeName}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/product-marker.svg"}
                width={16}
                height={16}
                alt="location"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {location}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/product-star.svg"}
                width={16}
                height={16}
                alt="star"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {star} &#183; Terjual {soldCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
