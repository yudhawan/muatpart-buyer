import React from "react";
import Image from "next/image";

const DataNotFound = ({
  title = "Data Tidak Ditemukan",
  children,
  classname,
  image,
  type='search',
  textClass
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-[10px] ${classname}`}
    >
      <Image
        src={image ? image : type==='search'?"/img/data-not-found.svg":type==='data'?'/img/daftarprodukicon.png':''}
        alt="Data Not Found"
        width={142}
        height={122}
      />
      <div>
        {children ? (
          children
        ) : (
          <p
            className={`${textClass} w-[257px] text-center text-[16px] text-neutral-600 font-[600]`}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default DataNotFound;
