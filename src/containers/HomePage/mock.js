export const mockProductsData = {
    products: [
      {
        id: "P001",
        image: "",
        favorite: true,
        productName: "MacBook Pro 16-inch",
        storeName: "Apple Store",
        price: 2499.99,
        stock: 15,
        discount: 10,
        star: 4.8,
        quality: "New",
        location: "New York",
        soldCount: 1250,
        warranty: "1 year"
      },
      {
        id: "P002",
        image: "",
        favorite: false,
        productName: "Sony WH-1000XM4",
        storeName: "Best Electronics",
        price: 349.99,
        stock: 45,
        discount: 15,
        star: 4.9,
        quality: "New",
        location: "Los Angeles",
        soldCount: 3420,
        warranty: "2 years"
      },
      {
        id: "P003",
        image: "",
        favorite: true,
        productName: "iPhone 15 Pro",
        storeName: "Mobile World",
        price: 999.99,
        stock: 8,
        discount: 0,
        star: 4.7,
        quality: "New",
        location: "Chicago",
        soldCount: 2150,
        warranty: "1 year"
      },
      {
        id: "P004",
        image: "",
        favorite: false,
        productName: "Samsung Galaxy Watch 5",
        storeName: "Samsung Store",
        price: 299.99,
        stock: 25,
        discount: 20,
        star: 4.5,
        quality: "Refurbished",
        location: "Miami",
        soldCount: 890,
        warranty: "6 months"
      },
      {
        id: "P005",
        image: "",
        favorite: true,
        productName: "iPad Air",
        storeName: "Tech Hub",
        price: 599.99,
        stock: 30,
        discount: 5,
        star: 4.6,
        quality: "New",
        location: "Seattle",
        soldCount: 1780,
        warranty: "1 year"
      },
      {
        id: "P006",
        image: "",
        favorite: false,
        productName: "Dell XPS 13",
        storeName: "Dell Store",
        price: 1199.99,
        stock: 10,
        discount: 10,
        star: 4.7,
        quality: "New",
        location: "New York",
        soldCount: 1020,
        warranty: "2 years"
      },
      {
        id: "P007",
        image: "",
        favorite: false,
        productName: "GoPro Hero 9",
        storeName: "Camera Shop",
        price: 399.99,
        stock: 20,
        discount: 10,
        star: 4.8,
        quality: "New",
        location: "Los Angeles",
        soldCount: 670,
        warranty: "1 year"
      },
      {
        id: "P008",
        image: "",
        favorite: false,
        productName: "Canon EOS R5",
        storeName: "Camera Shop",
        price: 3899.99,
        stock: 5,
        discount: 0,
        star: 4.9,
        quality: "New",
        location: "Chicago",
        soldCount: 210,
        warranty: "1 year"
      },
      {
        id: "P009",
        image: "",
        favorite: false,
        productName: "Google Pixel 6 Pro",
        storeName: "Mobile World",
        price: 899.99,
        stock: 15,
        discount: 10,
        star: 4.7,
        quality: "New",
        location: "Miami",
        soldCount: 890,
        warranty: "1 year"
      },
      {
        id: "P010",
        image: "",
        favorite: false,
        productName: "Microsoft Surface Laptop 4",
        storeName: "Microsoft Store",
        price: 1299.99,
        stock: 12,
        discount: 5,
        star: 4.6,
        quality: "New",
        location: "Seattle",
        soldCount: 450,
        warranty: "1 year"
      }
    ],
    
    // API endpoints
    endpoints: {
      getAllProducts: "/api/products",
      getProductById: "/api/products/:id",
      getFavoriteProducts: "/api/products/favorites",
      searchProducts: "/api/products/search?query=:query",
      filterProducts: "/api/products/filter"
    },
    
    // Pagination info
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 5,
      totalItems: 5
    },
    
    // Filter options
    filters: {
      price: {
        min: 0,
        max: 2500
      },
      quality: ["New", "Refurbished", "Used"],
      warranty: ["6 months", "1 year", "2 years"],
      locations: ["New York", "Los Angeles", "Chicago", "Miami", "Seattle"]
    }
  };
  
  // Example API response functions
  export const getProducts = () => {
    return {
      status: 200,
      data: mockProductsData.products,
      pagination: mockProductsData.pagination
    };
  };
  
  const getProductById = (id) => {
    const product = mockProductsData.products.find(p => p.id === id);
    if (product) {
      return {
        status: 200,
        data: product
      };
    }
    return {
      status: 404,
      error: "Product not found"
    };
  };
  
  const getFavoriteProducts = () => {
    const favorites = mockProductsData.products.filter(p => p.favorite);
    return {
      status: 200,
      data: favorites,
      pagination: {
        ...mockProductsData.pagination,
        totalItems: favorites.length
      }
    };
  };
  
  // Example usage:
  // const allProducts = getProducts();
  // const singleProduct = getProductById("P001");
  // const favorites = getFavoriteProducts();