import React from 'react';
import { useTranslation } from "react-i18next";
import { ShoppingCart } from 'lucide-react';
import { useCartContext } from '../context/CartContext';
import { useWishlistContext } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import './CartPage.css';

const CartPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotalItems
  } = useCartContext();
  const { addToWishlist } = useWishlistContext();

  const handleSaveForLater = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
    showToast(`${item.name} saved for later`);
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <h1 className="cart-page-title">
          {t("Shopping Cart (")}{cartTotalItems})
        </h1>

        {!cart || cart.length === 0 ? (
          <div className="cart-empty-state">
            <ShoppingCart size={54} color="#adb5bd" strokeWidth={1.5} style={{ marginBottom: '16px' }} />
            <p className="cart-empty-text">{t("Your cart is empty.")}</p>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-section">
              <div className="cart-items-wrapper">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    handleSaveForLater={handleSaveForLater}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            </div>

            <CartSummary 
              cartSubtotal={cartSubtotal} 
              cartTotalItems={cartTotalItems} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;