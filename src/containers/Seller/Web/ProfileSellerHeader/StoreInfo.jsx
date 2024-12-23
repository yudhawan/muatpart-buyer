import styles from "./StoreInfo.module.scss"
import Image from "next/image";
import IconComponent from "@/components/IconComponent/IconComponent";
import Button from "@/components/Button/Button";

function StoreInfo() {
  const isOnline = true

  return (
    <div className="flex flex-col flex-1 shrink items-center justify-center self-stretch my-auto basis-0 min-w-[240px]">
      <div className="flex flex-col w-full">
        <span className="font-bold text-[20px] leading-[24px]">
          Makmur Jaya
        </span>
        <div className="flex gap-2 items-center self-start mt-3 text-sm font-medium">
          {isOnline ? (
            <div className="flex gap-x-1 items-center">
              <div className="w-[7px] h-[7px] bg-success-400 rounded" />
              <span className="font-medium text-[14px] leading-[16.8px] text-neutral-700">Online</span>
            </div>
          ) : (
            <div className="flex gap-1 items-center self-stretch my-auto">
              <div className="self-stretch my-auto font-medium text-[14px] leading-[16.8px] text-neutral-700">Online </div>
              <div className="self-stretch my-auto text-black">
                <span className="font-bold text-[14px] leading-[16.8px]">2 Jam Lalu</span>
              </div>
            </div>
          )}
          <div className="w-1 h-1 bg-neutral-700 rounded" />
          <div className="flex gap-1 items-center self-stretch my-auto text-black whitespace-nowrap">
            {/* <Image
              loading="lazy"
              src={}
              alt="Location icon"
              className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
            /> */}
            <IconComponent
              src="/icons/location.svg"
              width={14}
              height={14}
            />
            <span className="font-medium text-[14px] leading-[16.8px]">Surabaya</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-start self-start mt-4 text-sm font-semibold text-blue-600">
        {/* <button 
          className="flex gap-1 justify-center items-center px-6 py-2 bg-white rounded-3xl border border-blue-600 border-solid min-w-[112px] max-md:px-5"
          tabIndex="0"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a3b71927d6f28a06bfaa853ea9f01f2442133d9713944745dd439ac7c04fcb2?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
            alt="Chat icon"
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          />
          <span className="self-stretch my-auto">Chat Penjual</span>
        </button> */}
        <Button
          Class="h-8 px-6 flex gap-x-1"
          color="primary_secondary"
          onClick={() => alert("chat penjual")}
        >
          <IconComponent
            src="/icons/chat.svg"
            classname={styles.icon_primary}
          />
          <span className="font-semibold text-[14px] leading-[16.8px] text-primary-700">Chat Penjual</span>
        </Button>
        <div
          className="p-2 border border-primary-700 rounded-[40px] cursor-pointer hover:bg-primary-50"
          onClick={(e) => {
            const text = "https://www.muatmuat.com";
            e.preventDefault();
            if (navigator.clipboard) {
              navigator.clipboard.writeText(text);
            } else {
              const input = document.createElement("textarea");
              input.value = text;
              document.body.appendChild(input);
              input.select();
              document.execCommand("copy");
              document.body.removeChild(input);
            }
            alert("berhasil bagikan")
          }}
        >
          <IconComponent
            src="/icons/share.svg"
            classname={styles.icon_primary}
          />
        </div>
        {/* <button
          className="p-2"
          tabIndex="0"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5714fd50181a55a8eb1ef9bc237b504a06c3bab6f178b73773ab5219a9cb0526?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
            alt="Share button"
            className="object-contain shrink-0 w-8 aspect-square stroke-[1px] stroke-blue-600"
          />
        </button> */}
      </div>
    </div>
  );
}

export default StoreInfo;