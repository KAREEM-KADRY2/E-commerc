import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useFilters = (initialCategory = null) => {
  const [loadingOptions, setLoadingOptions] = useState(true);
  
  // Options loaded from API
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);

  // Active filter states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [customPriceRange, setCustomPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedSort, setSelectedSort] = useState('popular');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const loadFilterOptions = async () => {
      setLoadingOptions(true);
      try {
        const [cats, brnds, prices, sorts] = await Promise.all([
          productService.fetchCategories(),
          productService.fetchBrands(),
          productService.fetchPriceRanges(),
          productService.fetchSortOptions()
        ]);
        
        setCategories(cats);
        setBrands(brnds);
        setPriceRanges(prices);
        setSortOptions(sorts);
      } catch (error) {
        console.error("Failed to load filter options", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    loadFilterOptions();
  }, []);

  const toggleBrand = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId) 
        : [...prev, brandId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory(initialCategory);
    setSelectedBrands([]);
    setSelectedPriceRange('all');
    setCustomPriceRange({ min: 0, max: 100000 });
    setSelectedSort('popular');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory && selectedCategory !== initialCategory) count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (selectedPriceRange !== 'all') count++;
    return count;
  };

  const applyFilters = () => {
    const filters = {
      category: selectedCategory,
      brands: selectedBrands,
      priceRange: selectedPriceRange,
      customPrice: customPriceRange,
      sortBy: selectedSort
    };
    
    // In a real app, this would trigger a re-fetch of products
    console.log("Applying filters:", filters);
    productService.fetchProducts(filters);
  };

  return {
    loadingOptions,
    options: {
      categories,
      brands,
      priceRanges,
      sortOptions
    },
    state: {
      selectedCategory,
      selectedBrands,
      selectedPriceRange,
      customPriceRange,
      selectedSort,
      isSidebarCollapsed,
      activeCount: getActiveFiltersCount()
    },
    actions: {
      setSelectedCategory,
      toggleBrand,
      setSelectedPriceRange,
      setCustomPriceRange,
      setSelectedSort,
      setIsSidebarCollapsed,
      clearAllFilters,
      applyFilters
    }
  };
};
