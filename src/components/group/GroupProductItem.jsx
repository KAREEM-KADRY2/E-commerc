import React from 'react';
import { useTranslation } from "react-i18next";
import { Users } from 'lucide-react';

const GroupProductItem = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className="group-product-card">
      <div className="group-product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="group-product-info">
        <h4 className="group-product-name">{product.name}</h4>
        <div className="group-product-subtitle">{t("Full Price")}</div>
      </div>

      <div className="group-product-price-section">
        <div className="group-product-price">
          {product.price} <span className="group-product-currency">{t("AED")}</span>
        </div>
        <div className="group-product-savings">
          {t("You save 15%")}
        </div>
      </div>

      <div className="group-product-stats">
        <div className="group-product-added">
          <Users size={14} /> {product.addedCount}
        </div>
        <div className="group-product-added-text">{t("added this")}</div>
      </div>
    </div>
  );
};

export default GroupProductItem;
