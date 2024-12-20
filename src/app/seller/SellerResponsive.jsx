import { useHeader } from "@/common/ResponsiveContext";
import IconComponent from "@/components/IconComponent/IconComponent";
import { useEffect } from "react";
import styles from "./SellerResponsive.module.scss"
import StoreHeader from "@/containers/Seller/Responsive/StoreHeader";
import StoreTabs from "@/containers/Seller/Responsive/StoreTabs";

const SellerResponsive = ({
    activeTab,
    setActiveTab,
    tabs,
}) => {
    const { search, setAppBar } = useHeader();
console.log("search",search)
    useEffect(() => {
        setAppBar({
        //   title: "Data Kendaraan",
          appBarType: "compact",
          renderActionButton: (
            <div className="flex gap-x-4">
                <button className="flex flex-col gap-y-0.5 items-center">
                    <IconComponent classname={styles.icon_share} src="/icons/share.svg" size="medium"/>
                    <span className="font-semibold text-[10px] leading-[10px] text-neutral-50">Bagikan</span>
                </button>
                <button className="flex flex-col gap-y-0.5 items-center">
                    <IconComponent classname={styles.icon_trolley} src="/icons//cart.svg" size="medium"/>
                    <span className="font-semibold text-[10px] leading-[10px] text-neutral-50">Troli</span>
                </button>
            </div>
          )
        });
    }, []);

    // Tab content renderer
    const renderTabContent = () => {
        switch (activeTab) {
            case 0: // Beranda
                return (
                    <BerandaContainer
                        productsWithFavorites={productsWithFavorites}
                    />
                );
            // case 1: // Etalase
            //     return (
            //         <EtalaseContainer
            //             productsWithFavorites={productsWithFavorites}
            //         />
            //     );
            // case 2: // Ulasan
            //     return (
            //         <div className="flex flex-col items-center max-w-full w-[1200px] mt-[24px]">
            //             <ReviewsContainer />
            //         </div>
            //     );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-y-2 pb-20 bg-neutral-200">
            <StoreHeader
                storeName="Makmur Jaya panjang sekali pakek banget"
                lastOnline="2 Jam"
                location="Surabaya"
            />
            <div className="bg-white">
                voucher
            </div>
            <div className="bg-white">
                <StoreTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={tabs}
                />
                {renderTabContent()}
                {/* <div className="flex flex-col items-start mt-5 max-w-full w-[344px]">
                    <ProductGrid title="Produk Terlaris" products={bestSellingProducts} />
                    <ProductGrid title="Produk Terfavorit" products={favoriteProducts} />
                    <ProductGrid title="Produk Terbaru" products={newProducts} />
                </div> */}
            </div>
        </div>
    )
}

export default SellerResponsive