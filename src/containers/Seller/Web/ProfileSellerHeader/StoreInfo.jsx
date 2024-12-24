import styles from "./StoreInfo.module.scss";
import IconComponent from "@/components/IconComponent/IconComponent";
import Button from "@/components/Button/Button";

// In StoreInfo.jsx
function transformLastOnline(lastOnline) {
  const now = new Date();
  const lastOnlineDate = new Date(lastOnline);
  const diffInMinutes = Math.floor((now - lastOnlineDate) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${Math.abs(diffInMinutes)} menit lalu`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${Math.abs(diffInHours)} jam lalu`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 7) {
    return `${Math.abs(diffInDays)} hari lalu`;
  }
  
  if (diffInDays <= 30) {
    return `${Math.abs(diffInDays)} hari lalu`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${Math.abs(diffInMonths)} bulan lalu`;
}

function StoreInfo({ isOnline, name, location, lastOnline }) {
  return (
    <div className="flex flex-col flex-1 shrink items-center justify-center self-stretch my-auto basis-0 min-w-[240px]">
      <div className="flex flex-col w-full">
        <span className="font-bold text-[20px] leading-[24px]">
          {name}
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
                <span className="font-bold text-[14px] leading-[16.8px]">{transformLastOnline(lastOnline)}</span>
              </div>
            </div>
          )}
          <div className="w-1 h-1 bg-neutral-700 rounded" />
          <div className="flex gap-1 items-center self-stretch my-auto text-black whitespace-nowrap">
            <IconComponent
              src="/icons/location.svg"
              width={14}
              height={14}
            />
            <span className="font-medium text-[14px] leading-[16.8px]">{location}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-start self-start mt-4 text-sm font-semibold text-primary-700">
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
      </div>
    </div>
  );
}

export default StoreInfo;