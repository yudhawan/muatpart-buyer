import Button from "@/components/Button/Button";
import Image from "next/image";
import styles from "./StoreHeader.module.scss"
import IconComponent from "@/components/IconComponent/IconComponent";
import StoreStats from "./StoreStats";

export default function StoreHeader({ storeName, lastOnline, location }) {
    const isClosed = true
    return (
        <div className="flex flex-col px-4 pt-5 pb-4 w-full bg-white">
            <div className="flex flex-col gap-y-6 w-full">
                <div className="flex gap-3 items-center w-full text-sm font-medium leading-tight">
                    <div className="flex size-[73px] bg-[#C8C8C8] rounded-[50px] relative">
                            <Image
                                loading="lazy"
                                src="/img/FloatingMenu.png"
                                alt="Store logo"
                                className="object-contain shrink-0 self-stretch m-auto aspect-square"
                                width={51}
                                height={43}
                            />
                            {isClosed ? (
                                <div className="h-5 flex px-1 bg-error-400 top-[58px] left-[18px] absolute rounded">
                                    <div className='my-auto font-semibold text-[12px] leading-[14.4px] text-neutral-50'>Tutup</div>
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col gap-y-3 flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px]">
                            <div className="self-stretch font-bold text-[16px] leading-[17.6px]">
                                {storeName}
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="self-stretch my-auto text-neutral-700 font-medium text-[14px] leading-[16.8px]">Online </div>
                            <div className="self-stretch my-auto">
                                <span className="font-bold text-[14px] leading-[16.8px]">{`${lastOnline} Lalu`}</span>
                            </div>
                            </div>
                            <div className="flex gap-3 items-start text-black whitespace-nowrap">
                            <div className="flex gap-1 items-center">
                                <IconComponent
                                    src="/icons/location.svg"
                                    width={14}
                                    height={14}
                                />
                                <div className="self-stretch my-auto font-medium text-[14px] leading-[16.8px]">{location}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <StoreStats />
                <Button
                    Class="h-8 justify-center flex gap-x-1 max-w-full"
                    color="primary_secondary"
                    onClick={() => alert("chat penjual")}
                    >
                    <IconComponent
                        src="/icons/chat.svg"
                        classname={styles.icon_primary}
                    />
                    <span className="font-semibold text-[14px] leading-[16.8px] text-primary-700">Chat Penjual</span>
                </Button>
            </div>
        </div>
    );
}