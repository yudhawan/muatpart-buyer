import NavigationTabs from "@/containers/Seller/Web/NavigationTabs";
import ProfileSellerHeader from "@/containers/Seller/Web/ProfileSellerHeader/ProfileSellerHeader";
import { useEffect, useState } from "react";
import mockAPI from '@/services/MockServer_ProfileSellerBuyer';
import BerandaContainer from "@/containers/Seller/Web/Beranda/BerandaContainer";
import EtalaseContainer from "@/containers/Seller/Web/Etalase/EtalaseContainer";
import ReviewsContainer from "@/containers/Seller/Web/Review/ReviewsContainer";

const SellerWeb = ({
    activeTab,
    setActiveTab,
    tabs,
}) => {
    const [sortOrder, setSortOrder] = useState("newest");
    const [favorites, setFavorites] = useState({});
    const [storeData, setStoreData] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch store data
    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const data = await mockAPI.getStoreInfo(1);
                setStoreData(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch store data');
                console.error('Error fetching store data:', err);
            }
        };
        fetchStoreData();
    }, []);

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const productsWithFavorites = (products) => {
        return products.map(product => ({
            ...product,
            isFavorited: favorites[product.id] || false,
            onFavoriteClick: () => toggleFavorite(product.id)
        }));
    };

    // Toggle favorite status
    const toggleFavorite = async (productId) => {
        try {
            const newFavoriteState = !favorites[productId];
            await mockAPI.toggleFavorite(productId, newFavoriteState);
            setFavorites(prev => ({
                ...prev,
                [productId]: newFavoriteState
            }));
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    const handleSearchChange = (query) => {
        // setSearchQuery(query);
    };

    const handleSortChange = () => {
        setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
    };

    // Tab content renderer
    const renderTabContent = () => {
        switch (activeTab) {
            case 0: // Beranda
                return (
                    <BerandaContainer
                        productsWithFavorites={productsWithFavorites}
                    />
                );
            case 1: // Etalase
                return (
                    <EtalaseContainer
                        productsWithFavorites={productsWithFavorites}
                    />
                );
            case 2: // Ulasan
                return (
                    <div className="flex flex-col items-center max-w-full w-[1200px] mt-[24px]">
                        <ReviewsContainer />
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading && !storeData) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
    }

    return (
        <>
            <main className="w-full flex justify-center py-[24px] px-[40px]">
                <div className='w-[1200px] flex flex-col'>
                    {storeData && <ProfileSellerHeader storeData={storeData} />}

                    <div className="flex flex-col mt-6">
                        <NavigationTabs
                            tabs={tabs} 
                            activeTab={activeTab} 
                            onTabChange={setActiveTab}
                        />
                    </div>
                    {renderTabContent()}
                </div>
            </main>
        </>
    );
}

export default SellerWeb