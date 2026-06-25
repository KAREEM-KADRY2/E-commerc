import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          productService.fetchProducts(),
          productService.fetchCategories()
        ]);
        
        // Handle paginated or unpaginated data arrays
        const productsArray = Array.isArray(productsRes) ? productsRes : (productsRes.data || []);
        const categoriesArray = Array.isArray(categoriesRes) ? categoriesRes : (categoriesRes.data || []);

        setProducts(productsArray);
        setCategories(categoriesArray);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, categories, loading, error };
};
