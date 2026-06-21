import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts, getProductReviews, getProductBundle } from '../services/api';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfoRight from '../components/product/ProductInfoRight';
import ProductTabs from '../components/product/ProductTabs';
import ProductReviewsSection from '../components/product/ProductReviewsSection';
import './ProductDetails.css';
const ProductDetails = () => {
  const {
    t
  } = useTranslation();
  const {
    productId
  } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [reviews, setReviews] = useState(null);
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const prodData = await getProductById(productId);
        if (prodData) {
          setProduct(prodData);
          const relatedData = await getRelatedProducts(prodData.category, prodData.id);
          setRelatedProducts(relatedData);
          const reviewsData = await getProductReviews(prodData.id);
          setReviews(reviewsData);
          const bundleData = await getProductBundle(prodData.id);
          setBundle(bundleData);
          const savedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const filteredRecentlyViewed = savedRecentlyViewed.filter(p => p.id !== prodData.id);
          const newRecentlyViewed = [prodData, ...filteredRecentlyViewed].slice(0, 8);
          localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
          setRecentlyViewed(filteredRecentlyViewed.slice(0, 8));
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Failed to fetch product details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);
  if (loading) {
    return <div className="product-details-page loading-state">
        <div className="spinner"></div>
      </div>;
  }
  if (!product) {
    return <div className="product-details-page not-found-state">
        <h2>{t("Product not found")}</h2>
        <Link to="/" className="btn-return-home">{t("Return to Home")}</Link>
      </div>;
  }
  return <div className="product-details-page">
      <div className="container">
        <div className="pd-breadcrumb">
          <Link to="/">{t("Home")}</Link>
          <span className="separator">/</span>
          <Link to={`/category/${product.category}`}>{t(product.category)}</Link>
          <span className="separator">/</span>
          <span className="current">{t(product.name)}</span>
        </div>

        <div className="pd-main-grid">
          <ProductGallery product={product} />
          <ProductInfoRight product={product} />
        </div>



        <ProductTabs product={product} />

        <ProductReviewsSection reviews={reviews} />


      </div>
    </div>;
};
export default ProductDetails;