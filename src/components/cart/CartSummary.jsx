import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const CartSummary = ({ cartSubtotal, cartTotalItems }) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponInput.trim().length > 0) {
      setAppliedDiscount(cartSubtotal * 0.1); // 10% discount
      showToast(t("Coupon applied successfully"));
    } else {
      setAppliedDiscount(0);
    }
  };

  return (
    <div className="cart-summary-section">
      <div className="cart-summary-card">
        <h3 className="cart-coupon-title">{t("Coupon Code")}</h3>
        <div className="cart-coupon-input-group">
          <input 
            type="text" 
            placeholder={t("Enter code")} 
            value={couponInput} 
            onChange={(e) => setCouponInput(e.target.value)} 
            className="cart-coupon-input"
          />
          <button onClick={handleApplyCoupon} className="cart-coupon-btn">
            {t("Apply")}
          </button>
        </div>
      </div>

      <div className="cart-summary-card">
        <h2 className="cart-summary-title">{t("Order Summary")}</h2>
        
        <div className="cart-summary-row">
          <span>{t("Subtotal (")}{cartTotalItems}{t("items)")}</span>
          <span className="cart-summary-value">{formatPrice(cartSubtotal)}</span>
        </div>
        
        <div className="cart-summary-row">
          <span>{t("Shipping")}</span>
          <span className="cart-summary-value highlight-green">{t("Free")}</span>
        </div>

        {appliedDiscount > 0 && (
          <div className="cart-summary-row highlight-red">
            <span>{t("Coupon Discount")}</span>
            <span className="cart-summary-value">- {formatPrice(appliedDiscount)}</span>
          </div>
        )}
      
        <div className="cart-summary-total">
          <span>{t("Total")}</span>
          <span>{formatPrice(cartSubtotal - appliedDiscount)}</span>
        </div>

        {appliedDiscount > 0 && (
          <div className="cart-discount-alert">
            <span className="cart-discount-icon">🎉</span>
            <div>
              <h4 className="cart-discount-title">{t("Discount Applied")}</h4>
              <p className="cart-discount-text">
                {t("You saved")} <strong>{formatPrice(appliedDiscount)}</strong> {t("on this order!")}
              </p>
            </div>
          </div>
        )}

        <button className="btn btn-primary w-full cart-checkout-btn">
          {t("Proceed to Checkout")}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
