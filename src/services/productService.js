import api from './api';

export const productService = {
  fetchCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data; // Assuming it returns the array inside data
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  fetchBrands: async () => {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      return [];
    }
  },

  fetchFacets: async () => {
    try {
      const response = await api.get('/products/facets');
      return response.data; // Might contain price ranges, etc.
    } catch (error) {
      console.error("Error fetching facets:", error);
      return null;
    }
  },

  // Retaining these as fallbacks if facets API doesn't provide them yet, but we will rely on API if possible
  fetchPriceRanges: async () => {
    return [
      { id: 'all', label: 'All Prices', min: 0, max: 999999 },
      { id: 'u500', label: 'Under 500 AED', min: 0, max: 500 },
      { id: '500-2k', label: '500 - 2,000 AED', min: 500, max: 2000 },
      { id: '2k-10k', label: '2,000 - 10,000 AED', min: 2000, max: 10000 },
      { id: '10k-50k', label: '10,000 - 50,000 AED', min: 10000, max: 50000 },
      { id: '50k+', label: '50,000+ AED', min: 50000, max: 999999 }
    ];
  },

  fetchSortOptions: async () => {
    return [
      { id: 'popular', label: 'Most Popular' },
      { id: 'rating', label: 'Highest Rated' },
      { id: 'newest', label: 'Newest First' },
      { id: 'price-asc', label: 'Price Low to High' },
      { id: 'price-desc', label: 'Price High to Low' },
      { id: 'cashback', label: 'Most Cashback' }
    ];
  },

  fetchProducts: async (filters = {}) => {
    try {
      // Build query string from filters
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('min_price', filters.minPrice);
      if (filters.maxPrice) params.append('max_price', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.page) params.append('page', filters.page);

      const response = await api.get(`/products?${params.toString()}`);
      return response.data; // Ensure components use pagination info
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const response = await api.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }
  },

  getProductReviews: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      return [];
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      return null;
    }
  },

  getRelatedProducts: async (id) => {
    try {
      const response = await api.get(`/products/${id}/related`);
      return response.data;
    } catch (error) {
      console.error("Error fetching related products:", error);
      return [];
    }
  },

  getProductBundle: async (id) => {
    try {
      const response = await api.get(`/products/${id}/bundle`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product bundle:", error);
      return null;
    }
  }
};
