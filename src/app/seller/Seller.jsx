// Seller.jsx
"use client";

import { viewport } from "@/store/viewport";
import SellerWeb from "./SellerWeb";
import SellerResponsive from "./SellerResponsive";
import { useState, useEffect, useCallback } from "react";
import mockAPI from '@/services/MockServer_ProfileSellerBuyer';
import { useHeader } from "@/common/ResponsiveContext";

function Seller() {
  const [activeTab, setActiveTab] = useState(0);
  const { isMobile } = viewport();
  const { search } = useHeader();
  const tabs = ["Beranda", "Etalase", "Ulasan"];

  // Shared state
  const [isFirstProductFetch, setIsFirstProductFetch] = useState(true)
  const [storeData, setStoreData] = useState(null);
  const [products, setProducts] = useState({
    bestSeller: [],
    favorite: [],
    new: []
  });
  const [vouchers, setVouchers] = useState([]);
  const [etalaseData, setEtalaseData] = useState({
    categories: [],
    showcases: [],
    products: []
  });
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Filter
  // const []

  // Web-specific shared search state
  const [webSearch, setWebSearch] = useState("");
  const [webSearchQuery, setWebSearchQuery] = useState("");

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

  // Fetch products
  const fetchProducts = async (searchQuery = "") => {
    setLoading(true);
    try {
      const [bestSellerProducts, favoriteProducts, newProducts] = await Promise.all([
        mockAPI.getProducts(1, 'best-seller', "newest", searchQuery),
        mockAPI.getProducts(1, 'favorite', "newest", searchQuery),
        mockAPI.getProducts(1, 'new', "newest", searchQuery)
      ]);

      setProducts({
        bestSeller: isFirstProductFetch && bestSellerProducts.length < 3 ? [] : bestSellerProducts,
        favorite: isFirstProductFetch && favoriteProducts.length < 3 ? [] : favoriteProducts,
        new: isFirstProductFetch && newProducts.length < 3 ? [] : newProducts
      });
      setIsFirstProductFetch(false)
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch etalase data
  useEffect(() => {
    const fetchEtalaseData = async () => {
      try {
        const data = await mockAPI.getEtalaseData();
        setEtalaseData(data);
      } catch (err) {
        console.error('Error fetching etalase data:', err);
      }
    };
    fetchEtalaseData();
  }, []);

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

  // Handle web search
  useEffect(() => {
    if (!isMobile) {
      fetchProducts(webSearchQuery);
    } else {
      fetchProducts(search.value);
    }
  }, [webSearchQuery, isMobile, search.value]);

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

  const productsWithFavorites = (products) => {
    return products.map(product => ({
      ...product,
      isFavorited: favorites[product.id] || false,
      onFavoriteClick: () => toggleFavorite(product.id)
    }));
  };

  if (typeof isMobile !== "boolean") return null;

  const sharedProps = {
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
  };

  // Add web-specific search props
  const webProps = {
    search: webSearch,
    setSearch: setWebSearch,
    searchQuery: webSearchQuery,
    setSearchQuery: setWebSearchQuery,
  };

  return isMobile ? (
    <SellerResponsive {...sharedProps} />
  ) : (
    <SellerWeb {...sharedProps} {...webProps} />
  );
}

export default Seller;