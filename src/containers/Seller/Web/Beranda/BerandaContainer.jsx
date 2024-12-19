import { useEffect, useState } from "react";

import mockAPI from "@/services/MockServer_ProfileSellerBuyer";

import styles from "./BerandaContainer.module.scss"
import IconComponent from "@/components/IconComponent/IconComponent";
import Input from "@/components/Input/Input";
import VoucherList from "./Voucher/VoucherList";
import ProductSection from "./Product/ProductSection";
import VoucherModal from "./Voucher/VoucherModal";
import VoucherDetailModal from "./Voucher/VoucherDetailModal";

const BerandaContainer = ({
    productsWithFavorites
}) => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState({
        bestSeller: [],
        favorite: [],
        new: []
    });
    const [vouchers, setVouchers] = useState([]);

    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [isVoucherDetailModalOpen, setIsVoucherDetailModalOpen] = useState(false);

    // Fetch products
    const fetchProductsByCategory = async () => {
        setLoading(true);
        try {
            const [bestSellerProducts, favoriteProducts, newProducts] = await Promise.all([
                mockAPI.getProducts(1, 'best-seller', "newest", searchQuery),
                mockAPI.getProducts(1, 'favorite', "newest", searchQuery),
                mockAPI.getProducts(1, 'new', "newest", searchQuery)
            ]);

            setProducts({
                bestSeller: bestSellerProducts,
                favorite: favoriteProducts,
                new: newProducts
            });
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    
    // Fetch vouchers
    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const data = await mockAPI.getVouchers(1);
                setVouchers(data);
            } catch (err) {
                console.error('Error fetching vouchers:', err);
            }
        };
        fetchVouchers();
    }, []);

    
    // Fetch products when search or sort changes
    useEffect(() => {
        fetchProductsByCategory();
    }, [searchQuery]);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
          setSearchQuery(search)
        }
    };
    
    const handleClaimVoucher = async (voucherId) => {
        try {
            await mockAPI.claimVoucher(voucherId);
            // Refresh vouchers after claiming
            const updatedVouchers = await mockAPI.getVouchers(1);
            setVouchers(updatedVouchers);
        } catch (err) {
            console.error('Error claiming voucher:', err);
        }
    };

    const handleShowVoucherInfo = (id) => {
        setIsVoucherDetailModalOpen(true)
    }

    return (
        <>
            {vouchers.length > 0 ? (
                <>
                    <div className="flex gap-x-4 mt-4 items-center">
                        <span className="font-semibold text-[16px] leading-[19.2px]">
                            Voucher Penjual
                        </span>
                        <button className="font-bold text-[12px] leading-[14.4px] text-primary-700" onClick={() => setIsVoucherModalOpen(true)}>
                            Lihat Semua
                        </button>
                    </div>
                    <VoucherList
                        vouchers={vouchers} 
                        onClaimVoucher={handleClaimVoucher}
                        onShowVoucherInfo={handleShowVoucherInfo}
                    />
                </>
            ) : null}
            <div className="flex flex-col items-center mt-6 bg-white rounded-xl shadow-muat px-[60px] py-6">
                <div className='self-start'>
                    <Input
                        classname={`w-[262px] ${styles.input_search}`}
                        placeholder="Cari Nama Produk"
                        icon={{
                            left: (
                                <IconComponent src={"/icons/search.svg"} />
                            ),
                            right: search ? (
                                <IconComponent
                                    src={"/icons/silang.svg"}
                                    onclick={(e) => {
                                        setSearch("");
                                        setSearchQuery("")
                                    }}
                                />
                            ) : null,
                        }}
                        value={search}
                        changeEvent={(e) => setSearch(e.target.value)}
                        onKeyUp={handleSearch}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-y-6">
                    <ProductSection
                        title="Produk Terlaris"
                        products={productsWithFavorites(products.bestSeller)}
                        loading={loading}
                    />
                    <ProductSection
                        title="Produk Terfavorit"
                        products={productsWithFavorites(products.favorite)}
                        loading={loading}
                    />
                    <ProductSection
                        title="Produk Terbaru"
                        products={productsWithFavorites(products.new)}
                        loading={loading}
                    />
                </div>
            </div>
            <VoucherModal
                isOpen={isVoucherModalOpen}
                setIsOpen={setIsVoucherModalOpen}
                onShowVoucherInfo={handleShowVoucherInfo}
                vouchers={vouchers}
            />
            <VoucherDetailModal
                isOpen={isVoucherDetailModalOpen}
                setIsOpen={setIsVoucherDetailModalOpen}
            />
        </>
    )
}

export default BerandaContainer