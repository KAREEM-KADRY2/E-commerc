import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const getCategories = async () => {
  try {
    const response = await api.get('/data.json');
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/data.json');
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};

export const getProductsByCategory = async (categoryName) => {
  try {
    const response = await api.get('/data.json');
    const products = response.data.products;
    if (!categoryName) return products;
    return products.filter(p => p.category === categoryName || p.category?.toLowerCase() === categoryName?.toLowerCase());
  } catch (error) {
    console.error("Error fetching products by category", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get('/data.json');
    const products = response.data.products;
    return products.find(p => p.id === parseInt(id)) || null;
  } catch (error) {
    console.error("Error fetching product by id", error);
    return null;
  }
};

export const getRelatedProducts = async (category, currentProductId) => {
  try {
    const response = await api.get('/data.json');
    const products = response.data.products;
    return products.filter(p => p.category === category && p.id !== parseInt(currentProductId)).slice(0, 5);
  } catch (error) {
    console.error("Error fetching related products", error);
    return [];
  }
};

export const getProductReviews = async (productId) => {
  try {
    const response = await api.get('/data.json');
    const reviews = response.data.reviews || {};
    
    if (reviews[productId]) {
      return reviews[productId];
    }

    // Generate realistic fake reviews based on productId
    const seed = Number(productId) || 1;
    const total = 128 + ((seed * 17) % 50); 
    const fiveStar = Math.floor(total * 0.75);
    const fourStar = Math.floor(total * 0.15);
    const threeStar = Math.floor(total * 0.05);
    const twoStar = Math.floor(total * 0.03);
    const oneStar = total - (fiveStar + fourStar + threeStar + twoStar);
    
    return {
      averageRating: 4.8,
      totalReviews: total,
      breakdown: { "5": fiveStar, "4": fourStar, "3": threeStar, "2": twoStar, "1": oneStar },
      items: [
        {
          id: 1,
          name: "Ahmed Hassan",
          avatar: `https://i.pravatar.cc/150?u=${seed}`,
          rating: 5,
          date: "2 days ago",
          text: "Excellent product! Highly recommended.",
          verified: true
        },
        {
          id: 2,
          name: "Sarah M.",
          avatar: `https://i.pravatar.cc/150?u=${seed + 1}`,
          rating: 4,
          date: "1 week ago",
          text: "Very good quality, but shipping took a bit long.",
          verified: true
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching product reviews", error);
    return null;
  }
};

export const getProductBundle = async (productId) => {
  try {
    const response = await api.get('/data.json');
    const bundles = response.data.bundles;
    return bundles[productId] || null;
  } catch (error) {
    console.error("Error fetching product bundle", error);
    return null;
  }
};

export default api;
