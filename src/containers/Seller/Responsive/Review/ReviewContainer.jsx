import ReviewFilter from "./ReviewFilter";
import ReviewCard from "./ReviewCard";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    username: "Josh Verrelld",
    rating: 5,
    images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/028756ae966e26cb51c44ec59ec1faddd70d38d23dc0b775c16a518ce0ddbee6?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a", "https://cdn.builder.io/api/v1/image/assets/TEMP/028756ae966e26cb51c44ec59ec1faddd70d38d23dc0b775c16a518ce0ddbee6?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a", "https://cdn.builder.io/api/v1/image/assets/TEMP/028756ae966e26cb51c44ec59ec1faddd70d38d23dc0b775c16a518ce0ddbee6?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"],
    review: "Barangnya ok, samsung terkenal dengan kualitasnya, tapi ini pengiriman lama, respon juga sangat lama, kalo memang gak siap jualan online ya jangan, besok2 mending beli dr.",
    productName: "Komponen Mesin Truk Filter Udara Elemen Udara 21834205 C331460/1",
    quality: "Genuine",
    date: "28 Aug 2021",
    time: "17.08 WIB",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/f480d563e953a173a3994f5afe5314585dc80c0f2c584aa938e17b348c62c5ac?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a",
    productImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/d67d0c6d08bdab66426bf5516f473dc4ba051003813684235437f7f12f39c7bd?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
  },
  {
    id: 2,
    username: "Josh Verrelld",
    rating: 5,
    images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/028756ae966e26cb51c44ec59ec1faddd70d38d23dc0b775c16a518ce0ddbee6?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a", "https://cdn.builder.io/api/v1/image/assets/TEMP/028756ae966e26cb51c44ec59ec1faddd70d38d23dc0b775c16a518ce0ddbee6?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a", "https://cdn.builder.io/api/v1/image/assets/TEMP/028756ae966e26cb51c44ec59ec1faddd70d38d23dc0b775c16a518ce0ddbee6?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"],
    review: "Barangnya ok, samsung terkenal dengan kualitasnya, tapi ini pengiriman lama, respon juga sangat lama, kalo memang gak siap jualan online ya jangan, besok2 mending beli dr.",
    productName: "Komponen Mesin Truk Filter Udara Elemen Udara 21834205 C331460/1",
    quality: "Genuine", 
    date: "28 Aug 2021",
    time: "17.08 WIB",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/f480d563e953a173a3994f5afe5314585dc80c0f2c584aa938e17b348c62c5ac?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a",
    productImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/d67d0c6d08bdab66426bf5516f473dc4ba051003813684235437f7f12f39c7bd?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
  }
];

function ReviewContainer() {
    return (
        <div className="flex overflow-hidden flex-col justify-end w-full max-w-[480px]">
            <div className="flex flex-col w-full" />
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                {/* <ReviewHeader /> */}
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full">
                    <ReviewFilter />
                    <div className="flex flex-col gap-y-2 bg-neutral-200">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} {...review} />
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex gap-2.5 justify-center items-center self-end py-1 bg-blue-600 rounded-[900px]" />
        </div>
    );
}

export default ReviewContainer;