import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/layout/ScrollToTop';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ProfileDetails from '../pages/ProfileDetails';
import AccountPage from '../pages/AccountPage';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
import CartDrawer from '../components/cart/CartDrawer';
import GroupModal from '../components/group/GroupModal';
import Toast from '../components/ui/Toast';
import LanguageModal from '../components/ui/LanguageModal';
import { useGroup } from '../hooks/useGroup';
import ActiveGroupBuys from '../pages/ActiveGroupBuys';
import StartGroupBuy from '../pages/StartGroupBuy';
import GroupDetails from '../pages/GroupDetails';
import CategoryPage from '../pages/CategoryPage';
import GroupDealCheckout from '../pages/GroupDealCheckout';
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import AuthModal from '../components/auth/AuthModal';

const AppRoutes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const groupState = useGroup();

  return (
    <>
      <ScrollToTop />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              searchQuery={searchQuery} 
              onResetSearch={() => setSearchQuery('')}
              groupState={groupState}
            />
          } 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-details" element={<ProfileDetails />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/active-group-buys" element={<ActiveGroupBuys />} />
        <Route path="/start-group-buy" element={<StartGroupBuy />} />
        <Route path="/group-details" element={<GroupDetails />} />
        <Route path="/group-checkout" element={<GroupDealCheckout />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
      <CartDrawer />
      <GroupModal groupState={groupState} />
      <Toast />
      <LanguageModal />
      <AuthModal />
      <Footer />
    </>
  );
};

export default AppRoutes;

