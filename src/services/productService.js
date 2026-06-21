// Empty service layer for future API integration
// Replace the simulated delays with actual API calls (e.g., using axios)

export const productService = {
  fetchCategories: async () => {
    // Placeholder for actual API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "mens-clothing", name: "Men's Clothing", icon: '👕' },
          { id: "womens-clothing", name: "Women's Clothing", icon: '👗' },
          { id: "shoes", name: "Shoes", icon: '👟' },
          { id: "watches", name: "Watches", icon: '⌚' },
          { id: "electronics", name: "Electronics", icon: '📱' },
          { id: "audio", name: "Audio", icon: '🎧' },
          { id: "laptops", name: "Laptops", icon: '💻' }
        ]);
      }, 500);
    });
  },

  fetchBrands: async () => {
    // Placeholder for actual API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "apple", name: "Apple", logo: '🍎' },
          { id: "samsung", name: "Samsung", logo: '📱' },
          { id: "sony", name: "Sony", logo: '📷' },
          { id: "dell", name: "Dell", logo: '💻' },
          { id: "asus", name: "ASUS", logo: '🎮' },
          { id: "xiaomi", name: "Xiaomi", logo: '📱' }
        ]);
      }, 500);
    });
  },

  fetchPriceRanges: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'all', label: 'All Prices', min: 0, max: 999999 },
          { id: 'u500', label: 'Under 500 EGP', min: 0, max: 500 },
          { id: '500-2k', label: '500 - 2,000 EGP', min: 500, max: 2000 },
          { id: '2k-10k', label: '2,000 - 10,000 EGP', min: 2000, max: 10000 },
          { id: '10k-50k', label: '10,000 - 50,000 EGP', min: 10000, max: 50000 },
          { id: '50k+', label: '50,000+ EGP', min: 50000, max: 999999 }
        ]);
      }, 500);
    });
  },

  fetchSortOptions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'popular', label: 'Most Popular' },
          { id: 'rating', label: 'Highest Rated' },
          { id: 'newest', label: 'Newest First' },
          { id: 'price-asc', label: 'Price Low to High' },
          { id: 'price-desc', label: 'Price High to Low' },
          { id: 'cashback', label: 'Most Cashback' }
        ]);
      }, 500);
    });
  },

  fetchProducts: async (filters) => {
    // Placeholder for actual API endpoint that takes filter arguments
    console.log("Fetching products with filters:", filters);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]); // Empty for now, page uses dummy products
      }, 800);
    });
  }
};
