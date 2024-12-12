"use client";

import { useEffect } from "react";
import IconComponent from "@/components/IconComponent/IconComponent";
import PropTypes from "prop-types";
import toast from "@/store/toast";

const Toast = ({
  classname,
  type = "success",
  children = "Toast",
  onclick,
  iconSrc,
}) => {
  const { showToast, setShowToast, dataToast } = toast();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast, onclick]);

  return (
    <>
      <div
        className={`
          fixed z-[9999999999] sm:z-10 transition-all duration-500 ease-in-out right-[25px] bottom-[75px] p-3 ${
            showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } sm:right-0 sm:left-0 sm:mx-4 sm:bottom-20
          ${
            showToast ? "sm:translate-y-0" : "sm:translate-y-full"
          } flex items-center justify-between py-3 px-4 rounded-lg border text-sm font-semibold text-neutral-900 ${
          dataToast.type === "success"
            ? "bg-success-50 border-success-400"
            : "bg-error-50 border-error-400"
        } ${classname}
        `}
      >
        {/* Content Container */}
        <div className="flex items-center gap-3 w-[380px] pr-2 sm:w-full">
          {/* Icon */}
          <div className="flex-shrink-0">
            <IconComponent
              src={
                iconSrc ||
                (dataToast.type === "success"
                  ? "/icons/success-toast.svg"
                  : "/icons/error-toast.svg")
              }
              height={20}
              width={20}
            />
          </div>

          {/* Message */}
          <span className="flex-1 text-xs font-semibold">
            {dataToast.message || children}
          </span>
        </div>

        {/* Close Button */}
        <IconComponent
          src="/icons/silang.svg"
          height={20}
          width={20}
          classname="flex-shrink-0 cursor-pointer"
          onclick={() => (onclick ? onclick() : setShowToast(false))}
        />
      </div>
    </>
  );
};

Toast.propTypes = {
  classname: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.string,
  onclick: PropTypes.func,
  iconSrc: PropTypes.string,
};

export default Toast;
