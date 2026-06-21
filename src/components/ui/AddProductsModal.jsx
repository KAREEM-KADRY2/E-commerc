import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { X, Search, ShoppingBag, Plus, ArrowRight } from 'lucide-react';
import './AddProductsModal.css';

const productsList = [{
  id: 1,
  name: 'PowerBank 20k mAh',
  price: 99,
  code: 'PB20K',
  image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=150&q=80'
}, {
  id: 2,
  name: 'Sony WH-1000XM5',
  price: 1299,
  code: 'SONYXM5',
  image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80'
}, {
  id: 3,
  name: 'Glow Serum Set',
  price: 189,
  code: 'GLOW01',
  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&q=80'
}, {
  id: 4,
  name: "Nike Air Max '24",
  price: 549,
  code: 'AIRMAX24',
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80'
}, {
  id: 5,
  name: 'Apple Watch Series 9',
  price: 1899,
  code: 'AW9-45',
  image: 'https://images.unsplash.com/photo-1434493789847-2902a52dda56?w=150&q=80'
}];

const AddProductsModal = ({ isOpen, onClose, onAddProducts }) => {
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const toggleProduct = id => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
  };

  const handleAddSelected = () => {
    const selectedProducts = productsList.filter(p => selectedIds.includes(p.id));
    onAddProducts(selectedProducts);
    setSelectedIds([]);
    onClose();
  };

  const filteredProducts = productsList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="add-products-overlay">
      <div className="add-products-modal">
        
        {/* Header */}
        <div className="add-products-header">
          <div className="add-products-header-info">
            <div className="add-products-icon">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="add-products-title">{t("Add Products to Your Pool")}</h2>
              <p className="add-products-subtitle">{t("Choose the products you want to buy together")}</p>
            </div>
          </div>
          <button onClick={onClose} className="add-products-close">
            <X size={18} />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="add-products-filters">
          <div className="add-products-search">
            <Search size={18} color="#adb5bd" />
            <input 
              type="text" 
              placeholder={t("Search by product name or code")} 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          
          <div className="add-products-chips">
            <span className="add-products-chip active">{t("All Products")}</span>
            <span className="add-products-chip">{t("Price: High to Low")}</span>
            <span className="add-products-chip">{t("Price: Low to High")}</span>
            <span className="add-products-chip">{t("Top Brands")}</span>
            <span className="add-products-chip">{t("New Arrivals")}</span>
          </div>
        </div>

        {/* Product List */}
        <div className="add-products-list">
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => toggleProduct(product.id)} className="add-products-item">
              <div className="add-products-checkbox" style={{
                border: selectedIds.includes(product.id) ? 'none' : '2px solid #dee2e6',
                background: selectedIds.includes(product.id) ? '#008b8b' : 'white',
              }}>
                {selectedIds.includes(product.id) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              
              <div className="add-products-image">
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="add-products-item-info">
                <h4 className="add-products-item-name">{t(product.name)}</h4>
                <div className="add-products-item-meta">
                  <span className="add-products-item-price">{product.price} {t("AED")}</span>
                  <span className="add-products-item-code">{product.code}</span>
                </div>
              </div>

              <button className="add-products-action-btn" style={{
                background: selectedIds.includes(product.id) ? '#e6f9f5' : '#008b8b',
                color: selectedIds.includes(product.id) ? '#008b8b' : 'white',
              }}>
                {selectedIds.includes(product.id) ? t('Selected') : <><Plus size={16} />{t("Add")}</>}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="add-products-footer">
          <div className="add-products-footer-info">
            <ShoppingBag size={20} color="#008b8b" />
            {selectedIds.length} {t("items selected")}
          </div>
          <button 
            disabled={selectedIds.length === 0} 
            onClick={handleAddSelected} 
            className="add-products-submit"
            style={{
              background: selectedIds.length > 0 ? '#008b8b' : '#e9ecef',
              color: selectedIds.length > 0 ? 'white' : '#adb5bd',
              cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            {t("Add Selected (")}{selectedIds.length}) <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
export default AddProductsModal;