import { useHeader } from "@/common/ResponsiveContext";
import IconComponent from "@/components/IconComponent/IconComponent";
import { useEffect, useState } from "react";
import styles from "./SellerResponsive.module.scss"
import StoreHeader from "@/containers/Seller/Responsive/StoreHeader";
import StoreTabs from "@/containers/Seller/Responsive/StoreTabs";
import BerandaContainer from "@/containers/Seller/Responsive/Beranda/BerandaContainer";
import EtalaseContainer from "@/containers/Seller/Responsive/Etalase/EtalaseContainer";
import ReviewContainer from "@/containers/Seller/Responsive/Review/ReviewContainer";
import Filter from "@/containers/Seller/Responsive/Review/Filter";
import ProductEtalase from "@/containers/Seller/Responsive/Etalase/ProductEtalase";

export default function SellerResponsive({
  activeTab,
  setActiveTab,
  tabs,
  storeData,
  products,
  vouchers,
  etalaseData,
  loading,
  error,
  productsWithFavorites,
  fetchProducts
}) {
  const { search, setAppBar, screen } = useHeader();
  const [isEtalasePage, setIsEtalasePage] = useState(false)
  
  useEffect(() => {
    setAppBar({
      appBarType: "compact",
      onBack: isEtalasePage ? () => {
        setIsEtalasePage(false)
      } : null,
      renderActionButton: (
        <div className="flex gap-x-4">
          <button className="flex flex-col gap-y-0.5 items-center z-10">
            <IconComponent
              onclick={(e) => {
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
              classname={styles.icon_share}
              src="/icons/share.svg"
              size="medium"
          />
            <span className="font-semibold text-[10px] leading-[10px] text-neutral-50">Bagikan</span>
          </button>
          <button className="flex flex-col gap-y-0.5 items-center z-10">
            <IconComponent classname={styles.icon_trolley} src="/icons/cart.svg" size="medium"/>
            <span className="font-semibold text-[10px] leading-[10px] text-neutral-50">Troli</span>
          </button>
        </div>
      )
    });
  }, [isEtalasePage]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if(screen==='filter') return <Filter />

  if (isEtalasePage) {
    return (
      <ProductEtalase 
        etalaseData={etalaseData}
        productsWithFavorites={productsWithFavorites}
      />
    )
  }

  return (
    <div className="flex flex-col gap-y-2 pb-20 bg-neutral-200">
      {storeData && (
        <StoreHeader
          storeName={storeData.name}
          lastOnline={storeData.lastOnline}
          location={storeData.location}
        />
      )}
      <div className="bg-white">
        voucher
      </div>
      <div className="bg-white">
        <StoreTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
        {activeTab === 0 && (
          <BerandaContainer
            search={search}
            products={products}
            productsWithFavorites={productsWithFavorites}
          />
        )}
        {activeTab === 1 && (
          <EtalaseContainer
            etalaseData={etalaseData}
            productsWithFavorites={productsWithFavorites}
            setIsEtalasePage={setIsEtalasePage}
          />
        )}
        {activeTab === 2 && (
          <ReviewContainer />
        )}
      </div>
    </div>
  );
}