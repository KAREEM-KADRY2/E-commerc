import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck, MapPin } from 'lucide-react';
import { locationService } from '../services/locationService';
import { orderService } from '../services/orderService';
import { useToast } from '../context/ToastContext';

const GroupDealCheckout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    products = [],
    groupId
  } = location.state || {};
  
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

  const [countries, setCountries] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await locationService.getCountries();
      setCountries(Array.isArray(res) ? res : (res?.data || []));
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchGovs = async () => {
        const res = await locationService.getGovernorates(selectedCountry);
        setGovernorates(Array.isArray(res) ? res : (res?.data || []));
        setSelectedGovernorate('');
        setCities([]);
      };
      fetchGovs();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedGovernorate) {
      const fetchCities = async () => {
        const res = await locationService.getCities(selectedGovernorate);
        setCities(Array.isArray(res) ? res : (res?.data || []));
        setSelectedCity('');
      };
      fetchCities();
    }
  }, [selectedGovernorate]);

  const handleCheckout = async () => {
    if (!selectedCountry || !selectedGovernorate || !selectedCity || !addressDetail.trim()) {
      showToast(t("Please complete your shipping address"));
      return;
    }
    setLoading(true);
    try {
      const payload = {
        group_id: groupId,
        address: {
          country_id: selectedCountry,
          governorate_id: selectedGovernorate,
          city_id: selectedCity,
          details: addressDetail
        },
        payment_method: 'credit_card'
      };
      await orderService.checkout(payload);
      showToast(t("Payment Successful! Deal Locked."));
      navigate('/active-group-buys');
    } catch (e) {
      showToast(t("Checkout failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <ArrowLeft size={20} color="#4a5568" />
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#003b46', margin: 0 }}>{t("Group Deal Checkout")}</h1>
          <div style={{ width: '40px', height: '40px', background: '#fff8e6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={18} color="#d97706" />
          </div>
        </div>

        {/* Shipping Address Form */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <MapPin size={20} color="#008b8b" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{t("Shipping Address")}</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef' }} value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
              <option value="">{t("Select Country")}</option>
              {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            
            <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef' }} value={selectedGovernorate} onChange={e => setSelectedGovernorate(e.target.value)} disabled={!selectedCountry}>
              <option value="">{t("Select Governorate")}</option>
              {governorates.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          
          <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '16px' }} value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedGovernorate}>
            <option value="">{t("Select City")}</option>
            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          
          <input type="text" placeholder={t("Detailed Address")} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e9ecef' }} value={addressDetail} onChange={e => setAddressDetail(e.target.value)} />
        </div>

        {/* Products */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {products.map((product, index) => {
            return (
              <div key={index} style={{ background: 'white', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#f8f9fa', border: '1px solid #e9ecef', flexShrink: 0 }}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </div>
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#003b46', margin: 0 }}>{product.name}</h4>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#d97706', background: '#fff8e6', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Lock size={10} />{t("LOCKED")}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#868e96', marginBottom: '8px' }}>{t("Color: Black | Size: Standard")}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#008b8b' }}>{product.price} <span style={{ fontSize: '12px', fontWeight: '600', color: '#868e96' }}>{t("AED")}</span></div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6c757d', background: '#f8f9fa', padding: '4px 12px', borderRadius: '20px' }}>{t("Qty 1")}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Locked Deal Disclaimer */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff8e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="#d97706" />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#003b46', margin: 0 }}>{t("Locked Group Deal")}</h3>
          </div>
          <p style={{ fontSize: '14px', color: '#6c757d', lineHeight: '1.5', margin: '0 0 16px 0' }}>{t("Group deals cannot be modified. You will pay the original full price now. Once the group duration expires, your earned cashback discount will be credited to your Wallet.")}</p>
        </div>

        {/* Total Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#868e96', letterSpacing: '0.5px', marginBottom: '4px' }}>{t("TOTAL • FULL PRICE")}</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#1a1d20' }}>{totalPrice.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: '600', color: '#868e96' }}>{t("AED")}</span></div>
          </div>
        </div>

        {/* Action Button */}
        <button disabled={loading} onClick={handleCheckout} style={{ width: '100%', background: '#f59e0b', color: 'white', border: 'none', padding: '20px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)' }}>
          {loading ? t("Processing...") : t("Pay Full Price & Lock Deal")}
        </button>

      </div>
    </div>
  );
};

export default GroupDealCheckout;