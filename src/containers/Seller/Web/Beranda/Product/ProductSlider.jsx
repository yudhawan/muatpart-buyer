import Image from 'next/image';
import { Fragment, useState } from 'react';
import styles from "./ProductSlider.module.scss"
import IconComponent from '@/components/IconComponent/IconComponent';
import { ThousandSeparator } from '@/libs/NumberFormat';

function formatNumber(num) {
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.', ',') + " rb";
  } else {
      return num.toString();
  }
}

export const ProductCard = ({
  imageSrc,
  title,
  bonus,
  originalPrice,
  discountedPrice,
  discount,
  quality,
  seller,
  location,
  rating,
  sales,
  isGrosir,
  stock,
  isFavorited = false,
  onFavoriteClick
}) => (
  <div className="flex flex-col items-start sm:w-[160px] w-[170px] rounded-md border border-neutral-400">
    <div className="relative sm:size-[160px] size-[170px]">
      <Image
        className='rounded-t-md sm:size-[160px]'
        src={imageSrc}
        alt={title}
        width={170}
        height={170}
      />
      {(isGrosir || stock) ? (
        <div className="absolute bottom-1 left-1 flex gap-x-1">
          {isGrosir ? (
            <div className="h-6 px-1 bg-primary-50 rounded-md flex">
              <div className="my-auto font-semibold text-[12px] leading-[14.4px] text-primary-700">
                Grosir
              </div>
            </div>
          ) : null}
          {stock ? (
            <div className="h-6 px-1 bg-error-50 rounded-md flex">
              <div className="my-auto font-semibold text-[12px] leading-[14.4px] text-error-400">
                {`Sisa ${stock} Pcs`}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <button 
        onClick={onFavoriteClick}
        className={`absolute top-2 right-2 flex justify-center items-center p-1.5 w-7 h-7 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors`}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <IconComponent
          classname={isFavorited ? styles.icon_favorite : ""}
          src="/icons/heart.svg"
        />
      </button>
    </div>

    <div className="flex flex-col w-full p-2 gap-y-2 relative bg-white rounded-b-[6px]">
      <div className="h-6 px-2 -ml-2 rounded-r-[20px] bg-[#FFF9C1] w-fit">
        <span className="font-semibold text-[12px] leading-[14.4px text-warning-900">
          Kualitas : {quality}
        </span>
      </div>

      <div className="font-medium text-[12px] leading-[14.4px] line-clamp-2">{title}</div>

      <div className="flex flex-col gap-y-1">
        <div className='flex gap-x-1 items-center'>
          <div className="font-medium text-[10px] leading-[13px] text-neutral-600">
            {`Rp ${ThousandSeparator(originalPrice)}`}
          </div>
          {discount ? (
            <div className="px-1 h-[14px] sm:bg-neutral-50 bg-error-400 rounded flex">
              <div className="font-semibold my-auto text-[8px] leading-[10.4px] sm:text-error-400 text-neutral-50">
                {`${discount}% OFF`}
              </div>
            </div>
          ) : null}
        </div>
        {discount ? (
          <div className="font-bold text-[14px] leading-[16.8px]">
            <span className="line-through">{`Rp ${ThousandSeparator(discountedPrice)}`}</span>
          </div>
        ) : null}
      </div>

      {bonus ? (
        <div className="flex items-center gap-1">
          <Image src="/img/temp-garansi.png" alt="" width={16} height={16} />
          <span className="font-medium text-[12px] leading-[14.4px] text-neutral-700">{bonus}</span>
        </div>
      ) : null}

      <div className="flex items-center gap-1">
        <Image src="/img/temp-nama-toko.png" alt="" width={16} height={16} />
        <span className="font-medium text-[12px] leading-[14.4px] text-neutral-700">{seller}</span>
      </div>
        
      <div className='flex sm:flex-col-reverse flex-col gap-y-2'>
        <div className="flex items-center gap-1">
          <Image src="/img/temp-location.png" alt="" width={16} height={16} />
          <span className="font-medium text-[12px] leading-[14.4px] text-neutral-700">{location}</span>
        </div>
          
        <div className="flex items-center gap-1">
          <Image src="/img/temp-rating.png" alt="" width={16} height={16} />
          <span className="font-medium text-[12px] leading-[14.4px] text-neutral-700">{Math.floor(rating * 10) / 10}</span>
          <div className="w-[2px] h-[2px] bg-neutral-700 rounded" />
          <span className="font-medium text-[12px] leading-[14.4px] text-neutral-700">Terjual {formatNumber(sales)}</span>
        </div>
      </div>
    </div>
  </div>
);

const ProductSlider = ({ products = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 170; // Width of each product card
  const itemGap = 12; // Gap between cards
  const itemsPerView = 6; // Number of items visible at once
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  // Calculate container width: 6 cards * (170px width) + 5 gaps * (12px)
  const containerWidth = (itemsPerView * itemWidth) + ((itemsPerView - 1) * itemGap);

  if (!products || products.length === 0) {
    return null;
  }

  const translateX = currentIndex * (itemWidth + itemGap);

  return (
    <div className="flex flex-col w-full gap-y-5">
      <span className="font-bold text-[18px] leading-[21.6px]">
        {title}
      </span>

      <div className="relative" style={{ width: `${containerWidth}px` }}>
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-3 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {products.map((product, key) => (
              <Fragment key={key}>
                <ProductCard {...product} />
              </Fragment>
            ))}
          </div>
        </div>

        {products.length > itemsPerView && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-muat hover:bg-gray-50 z-10 size-10 flex"
                aria-label="Previous products"
              >
                <IconComponent
                  classname={`m-auto ${styles.icon_arrow}`}
                  src="/icons/chevron-left.svg"
                />
              </button>
            )}
            {currentIndex < maxIndex && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-muat hover:bg-gray-50 z-10 size-10 flex"
                aria-label="Next products"
              >
                <IconComponent
                  classname={`m-auto ${styles.icon_arrow}`}
                  src="/icons/chevron-right.svg"
                />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;