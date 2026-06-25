import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { couponService } from '../../services/couponService';
import { useShareContext } from '../../context/ShareContext';
import { orderService } from '../../services/orderService';

const CartSummary = ({ cartSubtotal, cartTotalItems }) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const shareContext = useShareContext();
  const shareCode = shareContext?.shareCode || null;
  
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleCheckout = async () => {
    try {
      const payload = {
        total_items: cartTotalItems, // Note: Postman checkout has different fields, simulating with required
        subtotal: cartSubtotal,
        discount: appliedDiscount,
        payment_method: 'card', 
        coupon_code: couponInput.trim() || "",
        group_buy_code: ""
      };
      
      const response = await orderService.checkout(payload);
      showToast(t("Checkout simulated successfully!"));
    } catch (e) {
      showToast(t("Checkout failed to simulate."));
    }
  };

  const handleApplyCoupon = async () => {
    if (couponInput.trim().length > 0) {
      try {
        const result = await couponService.validateCoupon(couponInput.trim());
        if (result && result.discount_amount) {
          setAppliedDiscount(result.discount_amount);
          showToast(t("Coupon applied successfully"));
        } else {
          // Fallback if API doesn't specify amount but succeeds
          setAppliedDiscount(cartSubtotal * 0.1); 
          showToast(t("Coupon applied successfully"));
        }
      } catch (e) {
        showToast(t("Invalid or expired coupon"));
        setAppliedDiscount(0);
      }
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

        {appliedDiscount > 0 && shareCode && (
          <div className="cart-discount-alert" style={{ background: '#fff3cd', color: '#856404', borderColor: '#ffeeba' }}>
            <span className="cart-discount-icon">⚠️</span>
            <div>
              <p className="cart-discount-text" style={{ margin: 0, fontSize: '13px' }}>
                {t("Product Share discount is disabled because a coupon is applied.")}
              </p>
            </div>
          </div>
        )}

        <button className="btn btn-primary w-full cart-checkout-btn" onClick={handleCheckout}>
          {t("Proceed to Checkout")}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
