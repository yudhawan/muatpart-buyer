import React, { useState } from "react";
import styles from "./ReviewCard.module.scss"
import Image from "next/image";
import IconComponent from "@/components/IconComponent/IconComponent";

function ReviewCard({
  date,
  time,
  images,
  productImage,
  userImage,
  userName,
  rating,
  reviewText,
}) {
  const [isResponseOpen, setIsResponseOpen] = useState(true);

  const maxRating = 5

  return (
    <div className="flex flex-col px-8 py-5 self-stretch bg-white rounded-[10px] border border-solid shadow-muat border-neutral-400 max-w-[898px]">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-1 items-center self-stretch my-auto">
          {[...Array(rating)].map((_, index) => (
            <IconComponent src="/icons/star.svg"/>
          ))}
          {[...Array(maxRating - rating)].map((_, index) => (
            <IconComponent classname={styles.icon_rating_gray} src="/icons/star.svg"/>
          ))}
        </div>
        <div className="gap-3 self-stretch my-auto font-medium text-[12px] leading-[14.4px] text-right">
          <span className="text-neutral-600">Ulasan :</span>
          {`${date} ${time} WIB`}
        </div>
      </div>
      
      <div className="flex gap-6 items-start mt-5 w-full max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-x-6 w-full basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col self-start w-[108px]">
            <Image
              src={productImage}
              // className="object-contain aspect-square w-[60px]"
              alt="Product thumbnail"
              height={60}
              width={60}
            />
            <div className="flex flex-col justify-center mt-2 w-full">
              <div className="flex h-4 rounded px-1 bg-[#FFF1A5] w-fit">
                <div className="my-auto font-semibold text-[11px] leading-[13.2px] text-[#FF7A00]">Kualitas : Genuine</div>
              </div>
              <div className="mt-1 font-semibold text-[12px] leading-[14.4px]">
                Komponen Mesin Truk Filter Udara Elemen Udara 21834205 C331460/1
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
              <div className="flex gap-4 items-center self-start">
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <div className="flex gap-2 justify-center items-center self-stretch my-auto min-h-[32px] w-[30px]">
                    <Image
                      src={userImage}
                      alt="User avatar"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="self-stretch my-auto font-semibold text-[14px] leading-[16.8px min-h-[20px]">
                    {userName}
                  </div>
                </div>
              </div>
              <div className="mt-3 font-medium text-[12px] leading-[14.4px] max-md:max-w-full">
                {reviewText}
              </div>
              <div className="flex gap-2 items-start self-start mt-3">
                {images.map((src, index) => (
                  <Image
                    src="/img/temp-review.png"
                    alt="Product thumbnail"
                    height={60}
                    width={60}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;