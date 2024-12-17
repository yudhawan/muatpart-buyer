import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ARROW_STYLES = {
  boxShadow: "0 4px 11px 0 #41414140",
  borderRadius: "50%",
  color: "#000",
  width: "44px",
  height: "44px",
  zIndex: 1,
  background: "white",
};

const CustomArrow = ({ direction, ...props }) => {
  const { className, style, onClick } = props;
  const Icon = direction === "next" ? ChevronRight : ChevronLeft;

  return (
    <div
      className={`custom-arrow ${className}`}
      style={{ ...ARROW_STYLES, ...style }}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
};

const CustomSlide = ({ index, items, size, className = "" }) => (
  <Image
    src={items}
    alt={`slide-${index}`}
    width={size}
    height={size}
    className={className}
  />
);

const CustomDots = ({ dots, goToSlide, currentSlide }) => (
  <div className="custom-dots">
    {dots.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/60"
        }`}
      />
    ))}
  </div>
);

const MultipleItems = ({
  settings,
  items,
  size,
  arrowPadding = "0px",
  className,
}) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const customSettings = {
    ...settings,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    appendDots: (dots) => (
      <CustomDots
        dots={dots}
        goToSlide={(index) => sliderRef.current.slickGoTo(index)}
        currentSlide={currentSlide}
      />
    ),
    beforeChange: (_, next) => setCurrentSlide(next),
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <>
      <style jsx global>{`
        .custom-arrow::before {
          content: none !important;
        }

        .custom-arrow {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .slider-container {
          position: relative;
        }

        .custom-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          gap: 8px;
        }
      `}</style>
      <div className="slider-container">
        <Slider
          {...customSettings}
          ref={sliderRef}
          style={{ padding: `0 ${arrowPadding}` }}
        >
          {items.map((item, index) => (
            <CustomSlide
              key={index}
              index={index}
              items={item}
              size={size}
              className={className}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default MultipleItems;
