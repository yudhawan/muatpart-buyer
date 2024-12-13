import { useEffect, useState } from "react";

const ImageSlider = ({ baseImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Add the first image to the end and last image to the beginning for seamless loop
  const images = [
    baseImages[baseImages.length - 1],
    ...baseImages,
    baseImages[0],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection("next");
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev >= images.length - 2) {
        // Schedule reset to first real slide
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(1);
        }, 500);
        return images.length - 1;
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setDirection("prev");
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        // Schedule reset to last real slide
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(images.length - 2);
        }, 500);
        return 0;
      }
      return prev - 1;
    });
  };

  const handleDotClick = (index) => {
    setIsTransitioning(true);
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index + 1); // +1 because of the extra first slide
  };

  const getSlideStyle = () => {
    const baseStyle =
      "absolute top-0 left-0 w-full h-full transition-all duration-500";
    return `${baseStyle} ${
      direction === "next" ? "animate-slideNext" : "animate-slidePrev"
    }`;
  };

  return (
    <div className="relative w-full max-w-lg aspect-video overflow-hidden bg-gray-100 rounded-xl">
      {/* Slider Container */}
      <div
        className="relative h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          display: "flex",
        }}
      >
        {images.map((image, idx) => (
          <div key={idx} className="min-w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Next slide"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {baseImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === (currentIndex - 1 + images.length) % baseImages.length
                ? "w-8 bg-white"
                : "w-2 bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
