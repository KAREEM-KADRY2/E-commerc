import { useTranslation } from "react-i18next";
import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';
const WishlistPage = () => {
  const {
    t
  } = useTranslation();
  const {
    wishlist,
    wishlistTotalItems
  } = useWishlistContext();
  return <div style={{
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '40px 24px'
  }}>
      <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
        <h1 style={{
        fontSize: '28px',
        fontWeight: '800',
        color: '#1a1d20',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
          <Heart size={28} fill="#ef4444" color="#ef4444" />{t("My Wishlist (")}{wishlistTotalItems})
        </h1>

        {!wishlist || wishlist.length === 0 ? <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
            <Heart size={54} color="#adb5bd" strokeWidth={1.5} style={{
          marginBottom: '16px'
        }} />
            <p style={{
          fontSize: '18px',
          color: '#6c757d',
          fontWeight: '500',
          margin: 0
        }}>{t("Your wishlist is empty.")}</p>
          </div> : <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '24px'
      }}>
            {wishlist.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
          </div>}
      </div>
    </div>;
};
export default WishlistPage;