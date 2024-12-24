// src/services/MockServer_ProfileSellerBuyer.js


// Helper function to generate random decimal with specific precision
const randomDecimal = (min, max, precision = 2) => {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(precision));
};

// Helper function to generate random integer
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate product data
const generateProduct = (id) => {
  const originalPrice = randomInteger(1000000, 15000000);
  const hasDiscount = Math.random() > 0.2; // 80% chance of having a discount
  const discount = hasDiscount ? randomInteger(5, 30) : 0;
  const discountedPrice = hasDiscount ? Math.floor(originalPrice * (1 - discount/100)) : 0;
  
  return {
    id,
    imageSrc: "/img/temp-product-terlaris.png",
    title: [
      "Piston Set Standar RX-King",
      "Kampas Rem Depan GL Pro",
      "Filter Oli Mesin CB150R",
      "Bearing Roda Depan Vario",
      "Shock Absorber Belakang Supra",
    ][id % 5],
    originalPrice,
    discountedPrice,
    discount,
    quality: ["Genuine", "OEM", "Aftermarket"][Math.floor(Math.random() * 3)],
    seller: "Makmur Jaya",
    location: "Surabaya",
    rating: randomDecimal(4.0, 5.0, 3), // Generates ratings like 4.875
    sales: randomInteger(100, 50000),
    isGrosir: Math.random() > 0.7,
    stock: randomInteger(1, 100),
    bonus: [
      "Garansi 3 Bulan",
      "Garansi 6 Bulan",
      "Gratis Pemasangan",
      "Free Ongkir",
      null // Some products won't have bonus
    ][Math.floor(Math.random() * 5)]
  };
};

// Mock Data
export const profileSellerBuyerData = {
  storeInfo: {
    id: 1,
    name: "Makmur Jaya",
    isOnline: false,
    location: "Surabaya",
    lastOnline: "2024-12-23 14:30:00", // SQL DateTime format
    logo: "/img/FloatingMenu.png",
    metrics: [
      {
        value: "4.9",
        subValue: "/5",
        label: "Rating & Ulasan",
        width: "60px",
        showBorder: true
      },
      {
        value: "3.000",
        label: "Produk",
        width: "100px",
        showBorder: true
      },
      {
        value: "08:00 - 21:00",
        label: "Jam Operasional",
        width: "131px",
        showBorder: false
      }
    ]
  },

  etalase: {
    categories: [
      "Semua Produk",
      "Spare Part Mesin",
      "Spare Part Chassis",
      "Spare Part Elektrik",
      "Spare Part Body", 
      "Oli & Pelumas",
      "Aksesoris"
    ],
    showcases: [
      "Semua Produk",
      "Produk Baru", 
      "Produk Diskon",
      "Grosir"
    ],
    products: Array(50).fill().map((_, index) => generateProduct(100 + index))
  },

  products: {
    bestSeller: Array(10).fill().map((_, index) => generateProduct(200 + index)),
    favorite: Array(10).fill().map((_, index) => generateProduct(300 + index)),
    new: Array(10).fill().map((_, index) => generateProduct(400 + index))
  },

  vouchers: Array(10).fill().map((_, index) => ({
    id: index + 1,
    cashbackAmount: Math.floor(Math.random() * 20) + 5,
    maxDiscount: `${(Math.random() * 1000000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    minTransaction: `${(Math.random() * 5000000 + 1000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    validUntil: `${Math.floor(Math.random() * 28) + 1} Desember 2024`,
    iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/voucher-icon",
    claimable: true
  })),

  reviews: Array(10).fill().map((_, index) => ({
    id: index + 1,
    rating: Math.floor(Math.random() * 5) + 1, // 1 s/d 5 bintang
    date: `${Math.floor(Math.random() * 28) + 1} Nov 2024`,
    time: `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    productImage: "/img/temp-review.png",
    productName: [
      "Piston Set Standar RX-King",
      "Kampas Rem Depan GL Pro",
      "Filter Oli Mesin CB150R",
      "Bearing Roda Depan Vario",
      "Shock Absorber Belakang Supra",
      "Radiator Coolant Ninja 250",
      "Timing Belt Set Jazz RS",
      "Pompa Air Radiator Avanza",
      "Disc Brake Rotor Xenia",
      "Master Rem Atas Vixion"
    ][index],
    quality: ["Genuine", "OEM", "Aftermarket"][Math.floor(Math.random() * 3)],
    userImage: "/img/temp-josh.png",
    userName: [
      "John Doe",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Wilson",
      "David Brown",
      "Emma Davis",
      "James Miller",
      "Lisa Anderson",
      "Robert Taylor",
      "Mary Martin"
    ][index],
    reviewTitle: [
      "Bagus sekali",
      "Recommended seller",
      "Sesuai deskripsi",
      "Pengiriman cepat",
      "Barang original",
      "Harga terjangkau",
      "Kualitas terjamin",
      "Puas dengan produk",
      "Seller responsive",
      "Barang berkualitas"
    ][index],
    reviewText: "Barang sesuai dengan deskripsi, pengiriman cepat, packing rapi dan aman. Seller sangat responsive. Sangat puas dengan pelayanannya. Recommended seller!",
    images: Array(3).fill().map(() => 
      "/img/temp-review.png"
    )
  })),
  reviewSummary: {
    storeRating: 4.9,
    totalRatings: 342,
    totalReviews: 287,
    ratingDistribution: [
      { star: 5, count: 95 },
      { star: 4, count: 162 },
      { star: 3, count: 45 },
      { star: 2, count: 28 },
      { star: 1, count: 12 }
    ]
  }
};

// Mock API functions
const mockAPI = {
  getStoreInfo: (storeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profileSellerBuyerData.storeInfo);
      }, 500);
    });
  },

  getProducts: (storeId, category = 'all', sort = "newset", search = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [];
        
        if (category === 'best-seller') {
          filteredProducts = profileSellerBuyerData.products.bestSeller;
        } else if (category === 'favorite') {
          filteredProducts = profileSellerBuyerData.products.favorite;
        } else if (category === 'new') {
          filteredProducts = profileSellerBuyerData.products.new;
        } else if (category === 'etalase') {
          filteredProducts = profileSellerBuyerData.etalase.products;
        } else {
          filteredProducts = [
            ...profileSellerBuyerData.products.bestSeller,
            ...profileSellerBuyerData.products.favorite,
            ...profileSellerBuyerData.products.new,
            ...profileSellerBuyerData.etalase.products
          ];
        }

        if (search) {
          filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (sort === 'newest') {
          filteredProducts.sort((a, b) => b.id - a.id);
        } else if (sort === 'oldest') {
          filteredProducts.sort((a, b) => a.id - b.id);
        }

        resolve(filteredProducts.slice(0, 10));
      }, 500);
    });
  },

  // getEtalaseData: () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         categories: profileSellerBuyerData.etalase.categories,
  //         showcases: profileSellerBuyerData.etalase.showcases,
  //         products: profileSellerBuyerData.etalase.products
  //       });
  //     }, 500);
  //   });
  // },
  getEtalaseShowcases: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profileSellerBuyerData.etalase.showcases);
      }, 500);
    });
  },

  getEtalaseProducts: (search = '', sort = 'newest', page = 1, isMobile = false) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...profileSellerBuyerData.etalase.products];

        // Apply search filter if provided
        if (search) {
          filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.quality.toLowerCase().includes(search.toLowerCase()) ||
            product.seller.toLowerCase().includes(search.toLowerCase()) ||
            product.location.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Apply sorting
        switch (sort) {
          case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
          case 'oldest':
            filteredProducts.sort((a, b) => a.id - b.id);
            break;
          case 'price_high':
            filteredProducts.sort((a, b) => {
              const priceA = parseInt(a.originalPrice.replace(/[^0-9]/g, ''));
              const priceB = parseInt(b.originalPrice.replace(/[^0-9]/g, ''));
              return priceB - priceA;
            });
            break;
          case 'price_low':
            filteredProducts.sort((a, b) => {
              const priceA = parseInt(a.originalPrice.replace(/[^0-9]/g, ''));
              const priceB = parseInt(b.originalPrice.replace(/[^0-9]/g, ''));
              return priceA - priceB;
            });
            break;
          case 'rating':
            filteredProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
            break;
          case 'sales':
            filteredProducts.sort((a, b) => {
              const salesA = parseInt(a.sales.replace(/[^0-9]/g, ''));
              const salesB = parseInt(b.sales.replace(/[^0-9]/g, ''));
              return salesB - salesA;
            });
            break;
          default:
            // Keep original order
            break;
        }

        // Implement pagination
        const itemsPerPage = isMobile ? 10 : 20;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        // Return paginated results with metadata
        resolve(paginatedProducts)
        // resolve({
        //   products: paginatedProducts,
        //   pagination: {
        //     currentPage: page,
        //     totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
        //     totalItems: filteredProducts.length,
        //     itemsPerPage
        //   }
        // });
      }, 500);
    });
  },

  getVouchers: (storeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profileSellerBuyerData.vouchers);
      }, 500);
    });
  },

  claimVoucher: (voucherId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const voucher = profileSellerBuyerData.vouchers.find(v => v.id === voucherId);
        if (!voucher) {
          reject(new Error('Voucher tidak ditemukan'));
          return;
        }
        if (!voucher.claimable) {
          reject(new Error('Voucher tidak dapat diklaim'));
          return;
        }
        resolve({ 
          message: 'Voucher berhasil diklaim',
          voucherId
        });
      }, 500);
    });
  },

  toggleFavorite: (productId, isFavorite) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          productId,
          isFavorite
        });
      }, 500);
    });
  },

  getReviews: (storeId, filter = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredReviews = [...profileSellerBuyerData.reviews];
        
        // Filter berdasarkan rating jika ada
        if (filter.rating) {
          filteredReviews = filteredReviews.filter(review => 
            review.rating === filter.rating
          );
        }
        
        // Filter berdasarkan keberadaan media jika diminta
        if (filter.withMedia) {
          filteredReviews = filteredReviews.filter(review => 
            review.images && review.images.length > 0
          );
        }

        // Filter berdasarkan pencarian jika ada
        if (filter.search) {
          filteredReviews = filteredReviews.filter(review => 
            review.productName.toLowerCase().includes(filter.search.toLowerCase()) ||
            review.reviewText.toLowerCase().includes(filter.search.toLowerCase()) ||
            review.userName.toLowerCase().includes(filter.search.toLowerCase())
          );
        }

        // Sort berdasarkan tanggal jika diminta
        if (filter.sort === 'newest') {
          filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (filter.sort === 'oldest') {
          filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        resolve(filteredReviews);
      }, 500);
    });
  },

  getStoreReviewSummary: (storeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get the review summary data
        const summary = profileSellerBuyerData.reviewSummary;

        // Format it according to requirements
        const response = {
          storeRating: summary.storeRating,
          totalRatings: summary.totalRatings,
          totalReviews: summary.totalReviews,
          ratingCounts: summary.ratingDistribution
        };

        resolve(response);
      }, 500);
    });
  }
};

export default mockAPI;