import React, { useState } from "react";
import styles from "./ReviewCard.module.scss"
import Image from "next/image";
import IconComponent from "@/components/IconComponent/IconComponent";

function ReviewCard() {
  const [isResponseOpen, setIsResponseOpen] = useState(true);

  const rating = Math.floor(Math.random() * 5) + 1;
  const maxRating = 5
  const reviewImages = [
    "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/811f30aa05afa61012e480fb655b1cba1286afd0a5cf6f15c46f2e4000a8c3e6?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
    "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/ac14f83caea6d82a0f9b9465eadd1b06a07198fb09a14cfbe1497152d93563bc?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&",
    "https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/5df416154411f647f89ed64451decfdbafe31d6e00a1487c35a7924211904ade?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
  ];

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
          <span> 28 Aug 2021 </span>17.08 WIB
        </div>
      </div>
      
      <div className="flex gap-6 items-start mt-5 w-full max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-x-6 w-full basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col self-start w-[108px]">
            <Image
              src="/img/temp-review.png"
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
                      src="/img/temp-josh.png"
                      alt="User avatar"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="self-stretch my-auto font-semibold text-[14px] leading-[16.8px min-h-[20px]">
                    Josh Verrelld
                  </div>
                </div>
              </div>

              {/* <div className="text-sm font-bold leading-tight text-zinc-900 max-md:max-w-full mt-3">
                Mujianto
              </div> */}
              <div className="mt-3 font-medium text-[12px] leading-[14.4px] max-md:max-w-full">
                Barangnya ok, samsung terkenal dengan kualitasnya, tapi ini pengiriman lama, respon juga sangat lama, kalo memang gak siap jualan online ya jangan, besok2 mending beli dr.
              </div>
              <div className="flex gap-2 items-start self-start mt-3">
                {reviewImages.map((src, index) => (
                  <Image
                    src="/img/temp-review.png"
                    // className="object-contain aspect-square w-[60px]"
                    alt="Product thumbnail"
                    height={60}
                    width={60}
                  />
                ))}
              </div>
            </div>

            {/* {isResponseOpen && (
              <div className="flex flex-col mt-3 w-full font-medium leading-tight text-black max-md:max-w-full">
                <div className="flex gap-2 items-center p-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[114px] max-md:max-w-full">
                  <div className="flex flex-wrap gap-4 items-start self-stretch my-auto min-h-[90px] min-w-[240px] w-[659px]">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/9eb46e33d0101fb044d01d84b23fed11ac7f4a7756e45cecfc9f2f3c44259dcd?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
                      className="object-contain shrink-0 w-14 aspect-square"
                      alt="Seller avatar"
                    />
                    <div className="flex flex-col flex-1 shrink justify-center basis-0 min-h-[90px] min-w-[240px] max-md:max-w-full">
                      <div className="text-sm font-semibold max-md:max-w-full">
                        Briko Sparepart
                      </div>
                      <div className="mt-2.5 text-xs leading-4 max-md:max-w-full">
                        <br />
                        Terima kasih telah berbelanja di Briko Sparepart. Bagikan link toko kami https://muatparts.com/kojiesanofficial kepada teman-teman Anda dan favoritkan Toko kami untuk terus update mengenai{" "}
                      </div>
                      <div className="mt-2.5 text-xs">16 Oktober 2024, 10:46 WIB</div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;