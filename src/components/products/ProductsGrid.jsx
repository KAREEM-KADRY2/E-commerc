import { useTranslation } from "react-i18next";
import React from 'react';
import ProductCard from './ProductCard';
import { SearchX } from 'lucide-react';
const ProductsGrid = ({
  products,
  onResetFilters
}) => {
  const {
    t
  } = useTranslation();
  if (products.length === 0) {
    return <div className="products-grid">
        <div style={{
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '40px',
        color: '#64748b'
      }}>
          <SearchX size={48} style={{
          marginBottom: '16px'
        }} />
          <h3>{t("No products found")}</h3>
          <p>{t("Try adjusting your search or category filter")}</p>
          <button className="btn btn-outline" style={{
          color: 'var(--primary-color)',
          borderColor: 'var(--primary-color)',
          marginTop: '16px'
        }} onClick={onResetFilters}>{t("Reset Filters")}</button>
        </div>
      </div>;
  }
  return (
    <div className="products-grid" id="productsGrid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductsGrid;