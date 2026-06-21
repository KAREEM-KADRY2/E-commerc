import { useTranslation } from "react-i18next";
import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
const CartDrawer = () => {
  const {
    t
  } = useTranslation();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCashback,
    cartTotalItems
  } = useCartContext();
  return <>
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>{t("Your Cart (")}{cartTotalItems})</h3>
          <button className="icon-btn" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="cart-items-container">
          {cart.length === 0 ? <div className="empty-cart">
              <ShoppingBag size={48} style={{
            color: '#cbd5e1',
            marginBottom: '16px'
          }} />
              <h3>{t("Your cart is empty")}</h3>
              <p>{t("Looks like you haven't added anything yet.")}</p>
              <button className="btn btn-primary mt-4" onClick={() => setIsCartOpen(false)}>{t("Start Shopping")}</button>
            </div> : <div className="cart-items">
              {cart.map(item => {
            const {
              t
            } = useTranslation();
            return <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>{t("Remove")}</button>
                    </div>
                  </div>
                </div>;
          })}
            </div>}
        </div>
        
        {cart.length > 0 && <div className="cart-footer">
            <div className="cart-summary-row">
              <span>{t("Subtotal")}</span>
              <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="cart-summary-row text-success">
              <span>{t("Estimated Cashback")}</span>
              <span className="font-semibold">+{formatPrice(cartCashback)}</span>
            </div>
            <button className="btn btn-primary w-full mt-3">{t("Proceed to Checkout")}</button>
          </div>}
      </div>
    </>;
};
export default CartDrawer;