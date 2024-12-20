// src/services/MockServer_ProfileSellerBuyer.js

// Mock Data
export const profileSellerBuyerData = {
  storeInfo: {
    id: 1,
    name: "Makmur Jaya",
    location: "Surabaya",
    lastOnline: "2 jam yang lalu",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/0c40e02d0abb5a235e621cb4a53ddc6e7315ce6db93eb1c7b40780d49f7a1d44",
    metrics: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2fb9663f1d7d5b3c970c14998d5a8c28b0bb57f77a17f2527e50b3d0ea227709",
        value: "4.9",
        subValue: "/5",
        label: "Rating & Ulasan",
        width: "60px",
        showBorder: true
      },
      {
        // icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2fb9663f1d7d5b3c970c14998d5a8c28b0bb57f77a17f2527e50b3d0ea227709",
        value: "3.000",
        label: "Produk",
        width: "100px",
        showBorder: true
      },
      {
        // icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ba30e658d99205d5b08c9cf16fd24168677d59b344724ba30df7f08f2b2c1abe",
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
    products: Array(50).fill().map((_, index) => ({
      id: 100 + index,
      image: `https://cdn.builder.io/api/v1/image/assets/TEMP/d68020e8c29dbb29257991ed5100439e368a3dd3c2cfb4530b7acf36880e0e25`,
      title: [
        "Piston Set Standar RX-King",
        "Kampas Rem Depan GL Pro",
        "Filter Oli Mesin CB150R",
        "Bearing Roda Depan Vario",
        "Shock Absorber Belakang Supra",
        "Radiator Coolant Ninja 250",
        "Timing Belt Set Jazz RS",
        "Pompa Air Radiator Avanza",
        "Disc Brake Rotor Xenia",
        "Master Rem Atas Vixion",
        "Rantai Drive Chain CB150",
        "Velg Racing R17 Vario",
        "Ban Tubeless 150/70 R17",
        "Karburator PE28 KLX",
        "CDI Racing Unlimited Supra",
        "Knalpot Racing R9 Misano",
        "Cylinder Head Mio Soul",
        "Piston Kit OS 50 Satria",
        "Noken As Racing Jupiter",
        "Kabel Gas Throttle Blade",
        "Gear Set Racing SSS",
        "Kopling Manual Revo",
        "Seal Shock Depan Beat",
        "V-Belt Kevlar Vario",
        "Roller Racing Kawahara",
        "Spion Carbon Nmax",
        "Lampu LED Projector",
        "ECU BRT Juken Beat",
        "Cover Body R15 V3",
        "Filter Udara Racing HKS",
        "Aki GS Astra MF",
        "Busi Iridium NGK",
        "Stang Fatbar Proteaper",
        "Rem Cakram Brembo",
        "Swingarm Racing RCB",
        "Suspensi YSS G-Sport",
        "Velg OZ Racing",
        "Ban Battlax S22",
        "Rantai DID Gold",
        "Sprocket Sunshine Steel",
        "Gasket Complete Set",
        "Boring Kit Kawahara",
        "Camshaft Racing WebCam",
        "Karbu PWK 28",
        "Koil Racing KTC",
        "Piston Forged Wiseco",
        "Conrod Racing BRT",
        "Head Porting Stage 1",
        "ECU Unlimited Racing",
        "Big Bore Kit 65mm"
      ][index % 50],
      originalPrice: `Rp${(Math.random() * 10000000 + 1000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discountedPrice: `Rp${(Math.random() * 8000000 + 800000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discount: Math.floor(Math.random() * 30) + 10,
      quality: ["Genuine", "OEM", "Aftermarket"][Math.floor(Math.random() * 3)],
      seller: "Makmur Jaya",
      location: "Surabaya", 
      rating: (Math.random() + 4).toFixed(1),
      sales: `${Math.floor(Math.random() * 50) + 10} rb`,
      isGrosir: Math.random() > 0.5,
      stock: Math.floor(Math.random() * 100) + 1
    }))
  },

  products: {
    bestSeller: Array(10).fill().map((_, index) => ({
      id: 200 + index,
      image: `https://cdn.builder.io/api/v1/image/assets/TEMP/d68020e8c29dbb29257991ed5100439e368a3dd3c2cfb4530b7acf36880e0e25`,
      title: [
        "Piston Nissan Diesel Premium",
        "Kampas Kopling Heavy Duty",
        "Filter Udara Racing",
        "Oil Seal Crankshaft",
        "Gasket Head Cylinder",
        "Connecting Rod Bearing", 
        "Fuel Injection Pump",
        "Turbocharger Assembly",
        "Engine Mounting Kit",
        "Cylinder Head Complete"
      ][index],
      originalPrice: `Rp${(Math.random() * 15000000 + 2000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discountedPrice: `Rp${(Math.random() * 12000000 + 1500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discount: Math.floor(Math.random() * 25) + 5,
      quality: ["Genuine", "OEM", "Aftermarket"][Math.floor(Math.random() * 3)],
      seller: "Makmur Jaya",
      location: "Surabaya",
      rating: (Math.random() + 4).toFixed(1),
      sales: `${Math.floor(Math.random() * 100) + 20} rb`,
      isGrosir: Math.random() > 0.7,
      stock: Math.floor(Math.random() * 50) + 1
    })),
    favorite: Array(10).fill().map((_, index) => ({
      id: 300 + index,
      image: `https://cdn.builder.io/api/v1/image/assets/TEMP/d68020e8c29dbb29257991ed5100439e368a3dd3c2cfb4530b7acf36880e0e25`,
      title: [
        "Kampas Rem Racing Brembo",
        "Oil Filter K&N Premium",
        "Rantai SSS Gold Series",
        "Velg Racing BBS",
        "Shock Absorber Ohlins",
        "Piston Forged Mahle",
        "ECU HKS Racing",
        "Turbo Kit Garrett",
        "Big Bore Kit Wiseco",
        "Carbon Fiber Body Kit"
      ][index],
      originalPrice: `Rp${(Math.random() * 15000000 + 2000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discountedPrice: `Rp${(Math.random() * 12000000 + 1500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discount: Math.floor(Math.random() * 25) + 5,
      quality: ["Genuine", "OEM", "Aftermarket"][Math.floor(Math.random() * 3)],
      seller: "Makmur Jaya",
      location: "Surabaya",
      rating: (Math.random() + 4).toFixed(1),
      sales: `${Math.floor(Math.random() * 100) + 20} rb`,
      isGrosir: Math.random() > 0.7,
      stock: Math.floor(Math.random() * 50) + 1
    })),
    new: Array(10).fill().map((_, index) => ({
      id: 400 + index,
      image: `https://cdn.builder.io/api/v1/image/assets/TEMP/d68020e8c29dbb29257991ed5100439e368a3dd3c2cfb4530b7acf36880e0e25`,
      title: [
        "LED Headlight Kit",
        "Carbon Brake Pads",
        "High Flow Air Filter",
        "Racing Camshaft Set",
        "Lightweight Flywheel",
        "Stainless Headers",
        "Racing Clutch Kit",
        "Adjustable Coilovers",
        "Big Brake Kit",
        "Short Shifter Kit"
      ][index],
      originalPrice: `Rp${(Math.random() * 15000000 + 2000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discountedPrice: `Rp${(Math.random() * 12000000 + 1500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      discount: Math.floor(Math.random() * 25) + 5,
      quality: ["Genuine", "OEM", "Aftermarket"][Math.floor(Math.random() * 3)],
      seller: "Makmur Jaya",
      location: "Surabaya",
      rating: (Math.random() + 4).toFixed(1),
      sales: `${Math.floor(Math.random() * 100) + 20} rb`,
      isGrosir: Math.random() > 0.7,
      stock: Math.floor(Math.random() * 50) + 1
    }))
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
    rating: Math.floor(Math.random() * 2) + 4, // 4 atau 5 bintang
    date: `${Math.floor(Math.random() * 28) + 1} Nov 2024`,
    time: `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    productImage: `https://cdn.builder.io/api/v1/image/assets/TEMP/d68020e8c29dbb29257991ed5100439e368a3dd3c2cfb4530b7acf36880e0e25`,
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
    userImage: `https://cdn.builder.io/api/v1/image/assets/TEMP/avatar${index + 1}`,
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
      `https://cdn.builder.io/api/v1/image/assets/TEMP/review-image-${Math.floor(Math.random() * 5) + 1}`
    )
  }))
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

  getProducts: (storeId, category = 'all', sort = 'newest', search = '') => {
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

        resolve(filteredProducts);
      }, 500);
    });
  },

  getEtalaseData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          categories: profileSellerBuyerData.etalase.categories,
          showcases: profileSellerBuyerData.etalase.showcases,
          products: profileSellerBuyerData.etalase.products
        });
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

  getReviews: (storeId, filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredReviews = [...profileSellerBuyerData.reviews];
        
        // Filter berdasarkan rating jika ada
        if (filters.rating) {
          filteredReviews = filteredReviews.filter(review => 
            review.rating === filters.rating
          );
        }
        
        // Filter berdasarkan keberadaan media jika diminta
        if (filters.withMedia) {
          filteredReviews = filteredReviews.filter(review => 
            review.images && review.images.length > 0
          );
        }

        // Filter berdasarkan pencarian jika ada
        if (filters.search) {
          filteredReviews = filteredReviews.filter(review => 
            review.productName.toLowerCase().includes(filters.search.toLowerCase()) ||
            review.reviewText.toLowerCase().includes(filters.search.toLowerCase()) ||
            review.userName.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        // Sort berdasarkan tanggal jika diminta
        if (filters.sort === 'newest') {
          filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (filters.sort === 'oldest') {
          filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        resolve(filteredReviews);
      }, 500);
    });
  }
};

export default mockAPI;