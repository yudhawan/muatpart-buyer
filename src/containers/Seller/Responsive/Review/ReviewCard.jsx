import IconComponent from "@/components/IconComponent/IconComponent";
import Image from "next/image";
import { Fragment } from "react";
import styles from "./ReviewCard.module.scss"

function ReviewCard({
  username,
//   rating,
  images,
  review,
  productName,
  quality,
  date,
  time,
  avatar,
  productImage
}) {
    const rating = Math.floor(Math.random() * 5) + 1;
    const maxRating = 5
  
    return (
        <div className="flex flex-col w-full bg-white py-3 px-4 gap-y-3">
            <div className="flex flex-col">
                <div className="flex gap-x-2">
                    <Image
                        className="h-full"
                        src="/img/temp-josh.png"
                        alt="profile"
                        width={30}
                        height={30}
                    />
                    <div className="flex flex-col gap-y-1">
                        <span className="font-semibold text-[14px] leading-[16.8px]">{username}</span>
                        <div className="flex gap-1 items-center self-stretch my-auto">
                            {[...Array(rating)].map((_, index) => (
                                <IconComponent src="/icons/star.svg"/>
                            ))}
                            {[...Array(maxRating - rating)].map((_, index) => (
                                <IconComponent classname={styles.icon_rating_gray} src="/icons/star.svg"/>
                            ))}
                            </div>
                    </div>
                </div>
                <div className="flex gap-3 items-center w-full mt-4">
                    {images.map((image, index) => (
                        <Fragment key={index}>
                            <Image
                                className="h-full"
                                src="/img/temp-review.png"
                                alt={`Review image ${index + 1}`}
                                width={39}
                                height={39}
                            />
                        </Fragment>
                    ))}
                </div>
                <span className="mt-3 text-[12px] leading-[14.4px]">{review}</span>
            </div>

            <div className="p-1 bg-neutral-200 flex gap-x-3 items-center rounded-md">
                <Image
                    src="/img/temp-review.png"
                    alt={`review`}
                    width={49}
                    height={49}
                />
                <div className="flex flex-col gap-y-2">
                    <div className="font-bold text-[12px] leading-[13.2px] text-ellipsis">
                        {productName}
                    </div>
                    <div className="font-medium text-[12px] leading-[13.2px]">
                        Kualitas : {quality}
                    </div>
                </div>
            </div>

            <div className="font-medium text-[12px] leading-[14.4px]">
                <span className="text-black">{date} </span>
                {time}
            </div>
        </div>
    );
}

export default ReviewCard;