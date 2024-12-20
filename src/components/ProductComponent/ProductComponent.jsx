import React from "react";
import style from "./ProductComponent.module.scss";
import Image from "next/image";
import IconComponent from "../IconComponent/IconComponent";
import { numberFormatMoney } from "@/libs/NumberFormat";

function ProductComponent({
  ID,
  Photo,
  Favorite,
  Name,
  Store,
  PriceBeforeDiscount,
  PriceAfterDiscount,
  Discount,
  Rating,
  ReviewCount,
  SalesType,
  Views,
  Quality,
  City,
  SoldCount,
  Bonus,
  CreatedAt,
}) {
  return (
    <div className={style.main}>
      <div className={style.sectionTop}>
        <span className="absolute right-0 m-2 w-7 h-7 rounded-full bg-neutral-50 grid place-content-center">
          <IconComponent
            src={"/icons/heart-outline.svg"}
            classname={Favorite ? style.Favorite : ""}
          />
        </span>
        <Image
          src={!Photo ? Photo : "/img/chopper.png"}
          width={168}
          height={168}
          alt={Name}
          className="rounded-t-md object-contain aspect-square"
        />
      </div>
      <div className={style.sectionBottom}>
        <span className="bg-warning-100 py-1 px-3 my-2 w-fit rounded-r-[20px] text-xs font-semibold text-warning-900">
          Kualitas : {Quality}
        </span>

        <div className="px-2">
          <h1 className="text-xs font-medium text-neutral-900 w-full line-clamp-2 leading-tight mb-1">
            {Name}
          </h1>
          {Discount ? (
            <>
              <div className="flex gap-1 items-center">
                <strike className="text-neutral-600 text-[10px] font-medium">
                  {PriceBeforeDiscount}
                </strike>

                <p className={style.discount}>{Discount}</p>
              </div>
              <h1 className="text-neutral-900 text-sm font-bold">
                {PriceAfterDiscount}
              </h1>
            </>
          ) : (
            <h1 className="text-neutral-900 text-sm font-bold">
              {PriceBeforeDiscount}
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
              {Bonus && (
                <span className="text-neutral-700 font-medium text-[12px]">
                  {typeof Bonus === "string"
                    ? Bonus
                    : Bonus?.[0]?.["description"]}
                </span>
              )}
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/product-house.svg"}
                width={16}
                height={16}
                alt="house"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {Store}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/product-marker.svg"}
                width={16}
                height={16}
                alt="City"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {City}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src={"/icons/product-star.svg"}
                width={16}
                height={16}
                alt="Rating"
              />
              <span className="text-neutral-700 font-medium text-[12px]">
                {Rating} &#183; Terjual {SoldCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
