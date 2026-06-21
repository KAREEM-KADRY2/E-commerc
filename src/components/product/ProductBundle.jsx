import { useTranslation } from "react-i18next";
import React from 'react';
import { Plus } from 'lucide-react';
const ProductBundle = ({
  bundle
}) => {
  const {
    t
  } = useTranslation();
  if (!bundle || !bundle.items || bundle.items.length === 0) return null;
  return <div className="product-bundle-section">
      <h3 className="section-title">{t("Frequently Bought Together")}</h3>
      <div className="bundle-container">
        <div className="bundle-items">
          {bundle.items.map((item, index) => {
          const {
            t
          } = useTranslation();
          return <React.Fragment key={item.id}>
              <div className="bundle-item">
                <div className="bundle-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="bundle-item-info">
                  <span className="bundle-item-name">{item.name}</span>
                  <span className="bundle-item-price">${item.price.toLocaleString()}</span>
                </div>
              </div>
              {index < bundle.items.length - 1 && <div className="bundle-plus">
                  <Plus size={24} />
                </div>}
            </React.Fragment>;
        })}
        </div>
        
        <div className="bundle-summary">
          <div className="summary-row">
            <span>{t("Total Price:")}</span>
            <span className="summary-price old-price">${bundle.totalPrice.toLocaleString()}</span>
          </div>
          <div className="summary-row bundle-final-price">
            <span>{t("Bundle Price:")}</span>
            <span className="summary-price">${bundle.bundlePrice.toLocaleString()}</span>
          </div>
          <div className="summary-save">{t("You Save: $")}{bundle.youSave.toLocaleString()}
          </div>
          <button className="btn-add-bundle">{t("Add Bundle To Cart")}</button>
        </div>
      </div>
    </div>;
};
export default ProductBundle;