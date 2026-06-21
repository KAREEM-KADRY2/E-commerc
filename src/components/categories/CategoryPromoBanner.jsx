import React from 'react';
import { useTranslation } from "react-i18next";
import { ChevronRight, Gift } from 'lucide-react';

const CategoryPromoBanner = ({ categoryName }) => {
  const { t } = useTranslation();

  return (
    <div className="category-promo-banner">
      <div className="category-promo-content">
        <div className="category-promo-header">
          <div className="category-promo-icon">
            <Gift size={20} color="#fff" />
          </div>
          <h1 className="category-promo-title">
            {t("Create a Group")} - {categoryName}
          </h1>
        </div>
        
        <p className="category-promo-text">
          {t("Invite friends to buy together and unlock massive cashback rewards. The more people join, the more everyone saves!")}
        </p>
        
        <button className="category-promo-btn">
          {t("Start a Group Now")} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CategoryPromoBanner;
