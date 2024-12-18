"use client";

import React, { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import IconComponent from "../IconComponent/IconComponent";
import toast from "@/store/toast";

const Bottomsheet = ({
  label = "List Data",
  children,
  withReset = false,
  onClickReset,
}) => {
  const {
    showBottomsheet,
    setShowBottomsheet,
    dataBottomsheet,
    titleBottomsheet
  } = toast();
  const bottomsheetRef = useRef(null);
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        bottomsheetRef.current &&
        !bottomsheetRef.current.contains(e.target)
      ) {
        setShowBottomsheet(false);
      }
    };

    if (showBottomsheet) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [showBottomsheet, setShowBottomsheet]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!startY) return;

    const currentTouch = e.touches[0].clientY;
    const diff = currentTouch - startY;

    // Only allow dragging down or up slightly
    if (diff < -50) return; // Limit upward movement

    setCurrentY(diff);
  };

  const handleTouchEnd = () => {
    if (!startY) return;

    if (currentY > 100) {
      // If dragged down far enough, close the bottomsheet
      setShowBottomsheet(false);
    }

    // Reset values
    setStartY(null);
    setCurrentY(0);
    setIsDragging(false);
  };

  return (
    <>
      {showBottomsheet && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setShowBottomsheet(false)}
          />

          {/* Bottomsheet */}
          <div
            ref={bottomsheetRef}
            style={{
              transform: `translateY(${currentY}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
            className={`
              z-[90] flex flex-col gap-[4px] w-full h-fit max-h-[75%]
              leading-[14.4px] font-semibold text-[12px] rounded-t-[16px]
              pt-1 pb-[15px] px-3 border text-neutral-900 bg-neutral-50
              fixed left-0 bottom-0 shadow-muat transform transition-all
            `}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag handle */}
            <div
              className="w-[38px] h-1 rounded-[4px] bg-[#dddddd] mx-auto mb-3 cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
            />
            {titleBottomsheet === ' -' && (
              <div
                className={`flex ${
                  withReset && "justify-between"
                } items-center mt-4`}
              >
                <IconComponent
                  classname="cursor-pointer"
                  color="primary"
                  src="../../icons/silang.svg"
                  width={20}
                  height={20}
                  onclick={() => setShowBottomsheet(false)}
                />
                <span
                  className={`font-bold text-sm text-neutral-900 w-64 text-center ${
                    !withReset && "mx-auto -translate-x-3"
                  }`}
                >
                  {titleBottomsheet || label}
                </span>
                {withReset && (
                  <span
                    className="font-semibold text-xs text-primary-700 -translate-x-2 cursor-pointer"
                    onClick={onClickReset}
                  >
                    Reset
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 overflow-auto pr-1">
              {dataBottomsheet || children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Bottomsheet.propTypes = {
  label: propTypes.string,
  withReset: propTypes.bool,
  onClickReset: propTypes.func,
};

export default Bottomsheet;
