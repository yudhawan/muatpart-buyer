import React from "react";
import { Search } from "lucide-react";
import Button from "../Button/Button";
import Image from "next/image";

const DataEmpty = ({
  title = "add your title",
  subtitle = "add your subtitle",
  buttonText = "add your button text",
  onButtonClick,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-xl p-6 shadow-muatmuat mb-4">
      <Image
        src="/img/daftarprodukicon.png"
        width={95}
        height={95}
        alt="Empty cart"
      />
      <div className="font-semibold text-neutral-600 my-3">{title}</div>
      <div className="text-xs font-medium text-neutral-600 mb-5 max-w-[250px] text-center">
        {subtitle}
      </div>
      <Button
        iconLeft={<Search size={16} />}
        Class="!font-semibold !gap-2 !items-center"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default DataEmpty;
