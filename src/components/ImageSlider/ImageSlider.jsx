import { useEffect, useState, useRef } from "react";

const ImageSlider = ({ baseImages }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real slide
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  // Add the first image to the end and last image to the beginning for seamless loop
  const images = [
    baseImages[baseImages.length - 1],
    ...baseImages,
    baseImages[0],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        handleNext();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isDragging]);

  const handleDragStart = (e) => {
    if (isTransitioning) return; // Prevent dragging during transition
    setIsDragging(true);
    setIsTransitioning(false);
    setStartX(e.type.includes("mouse") ? e.pageX : e.touches[0].pageX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    // Limit drag to one slide width
    const boundedDiff = Math.max(
      Math.min(diff, containerWidth),
      -containerWidth
    );

    setDragOffset(boundedDiff);
  };

  const resetToRealSlide = (index) => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(index);
    }, 500);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setIsTransitioning(true);

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const moveRatio = dragOffset / containerWidth;

    if (moveRatio < -0.2) {
      if (currentIndex >= images.length - 2) {
        setCurrentIndex(images.length - 1);
        resetToRealSlide(1);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (moveRatio > 0.2) {
      if (currentIndex <= 1) {
        setCurrentIndex(0);
        resetToRealSlide(images.length - 2);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }

    setDragOffset(0);
  };

  const handleNext = () => {
    setDirection("next");
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev >= images.length - 2) {
        resetToRealSlide(1);
        return images.length - 1;
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setDirection("prev");
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev <= 1) {
        resetToRealSlide(images.length - 2);
        return 0;
      }
      return prev - 1;
    });
  };

  const handleDotClick = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(index + 1 > currentIndex ? "next" : "prev");
    setCurrentIndex(index + 1);
  };

  const getTransform = () => {
    const baseTransform = -currentIndex * 100;
    const dragPercent =
      (dragOffset / (containerRef.current?.offsetWidth || 1)) * 100;
    return `translateX(${baseTransform + dragPercent}%)`;
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 rounded-xl">
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative h-full touch-pan-y"
        style={{
          transform: getTransform(),
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          display: "flex",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {images.map((image, idx) => (
          <div key={idx} className="min-w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover select-none"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
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
