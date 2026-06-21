import React from 'react';
import CategoryCard from './CategoryCard';
import { LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CategoriesGrid = ({ categories, currentCategory, onSelectCategory }) => {
  const { t } = useTranslation();
  return (
    <div className="categories-grid" id="categoriesGrid">
      {categories.map(cat => (
        <CategoryCard 
          key={cat.id} 
          category={cat} 
          isActive={currentCategory === cat.id}
          onClick={onSelectCategory} 
        />
      ))}
      <div className="category-card category-card-more" onClick={() => onSelectCategory('all')}>
        <div className="more-content">
          <LayoutGrid size={32} />
          <span>{currentCategory === 'all' ? t('All Categories Selected') : t('More Categories / All')}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;
