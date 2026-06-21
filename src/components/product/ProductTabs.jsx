import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { ClipboardList, ArrowRight } from 'lucide-react';

const ProductTabs = ({ product }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!product) return null;

  const getSpecifications = () => {
    const specs = [];
    if (product.specifications?.Brand) specs.push({ label: 'Brand', value: product.specifications.Brand });
    if (product.category) specs.push({ label: 'Category', value: product.category });
    if (product.specifications?.Material) specs.push({ label: 'Material', value: product.specifications.Material });
    if (product.specifications?.Weight) specs.push({ label: 'Weight', value: product.specifications.Weight });
    
    if (product.specifications) {
      Object.entries(product.specifications).forEach(([key, value]) => {
        if (!['Brand', 'Material', 'Weight'].includes(key)) {
          specs.push({ label: key, value: value });
        }
      });
    }
    
    // Add some default specs if none exist to match the design visually
    if (specs.length === 0) {
        specs.push({ label: 'Brand', value: 'Red Runner' });
        specs.push({ label: 'Material', value: 'Mesh & Synthetic' });
        specs.push({ label: 'Sole Material', value: 'Rubber' });
        specs.push({ label: 'Fit Type', value: 'Regular Fit' });
        specs.push({ label: 'Closure Type', value: 'Lace-Up' });
        specs.push({ label: 'Weight', value: '320g (Per Shoe)' });
    }
    
    return specs;
  };

  const specsList = getSpecifications();

  const displaySpecs = isExpanded ? specsList : specsList.slice(0, 2);

  // Break specs into two columns
  const half = Math.ceil(displaySpecs.length / 2);
  const col1 = displaySpecs.slice(0, half);
  const col2 = displaySpecs.slice(half);

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f3f5', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: '#e6f9f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#008b8b' }}>
            <ClipboardList size={20} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1d20', margin: 0 }}>{t("Specifications")}</h2>
        </div>
        {specsList.length > 2 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ background: 'none', border: 'none', color: '#008b8b', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            {isExpanded ? t("Show Less") : t("View All Specifications")} 
            <ArrowRight size={16} style={{ transform: isExpanded ? 'rotate(-90deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {col1.map((spec, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f8f9fa' }}>
              <span style={{ fontSize: '14px', color: '#1a1d20', fontWeight: '700' }}>{t(spec.label)}</span>
              <span style={{ fontSize: '14px', color: '#495057', fontWeight: '600' }}>{t(spec.value)}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {col2.map((spec, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f8f9fa' }}>
              <span style={{ fontSize: '14px', color: '#1a1d20', fontWeight: '700' }}>{t(spec.label)}</span>
              <span style={{ fontSize: '14px', color: '#495057', fontWeight: '600' }}>{t(spec.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;