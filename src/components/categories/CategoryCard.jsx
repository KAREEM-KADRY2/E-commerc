import { useTranslation } from "react-i18next";
import React from 'react';
import { Shirt, ShoppingBag, Footprints, Watch, Smartphone, Headphones, Laptop } from 'lucide-react';
const iconMap = {
  'shirt': Shirt,
  'shopping-bag': ShoppingBag,
  'footprints': Footprints,
  'watch': Watch,
  'smartphone': Smartphone,
  'headphones': Headphones,
  'laptop': Laptop
};
const CategoryCard = ({
  category,
  onClick,
  isActive
}) => {
  const {
    t
  } = useTranslation();
  const IconComponent = iconMap[category.icon] || ShoppingBag;
  return <div className={`category-card ${isActive ? 'active' : ''}`} onClick={() => onClick(category.id)} style={isActive ? {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'rgba(11, 76, 70, 0.02)'
  } : {}}>
      <div className="category-img-wrapper">
        <img src={category.image} alt={category.name} />
        <div className="category-icon">
          <IconComponent size={16} />
        </div>
      </div>
      <div className="category-info">
        <h3>{t(category.name)}</h3>
        <p className="category-count">{category.count} {t("Products")}</p>
      </div>
    </div>;
};
export default CategoryCard;