import Image from "next/image"
import StoreInfo from "./StoreInfo"
import StoreMetrics from "./StoreMetrics"

const ProfileSellerHeader = ({
    storeData
}) => {
    return (
        <div className="p-6 flex flex-row gap-3 items-center w-full border-b border-b-neutral-400">
            <div className="flex size-[89px] bg-[#C8C8C8] rounded-[50px] relative">
                <Image
                    loading="lazy"
                    src="/img/FloatingMenu.png"
                    alt="Store logo"
                    className="object-contain shrink-0 self-stretch m-auto aspect-square"
                    width={73}
                    height={62}
                />
                {true ? (
                    <div className="h-5 flex px-1 bg-error-400 top-[71px] left-[24px] absolute rounded">
                        <div className='my-auto font-semibold text-[12px] leading-[14.4px] text-neutral-50'>Tutup</div>
                    </div>
                ) : null}
            </div>
            <StoreInfo
                name={storeData.name}
                location={storeData.location}
                lastOnline={storeData.lastOnline}
            />
            <StoreMetrics metrics={storeData.metrics} />
        </div>
    )
}

export default ProfileSellerHeader