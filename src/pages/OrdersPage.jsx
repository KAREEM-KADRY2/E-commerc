import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight, ArrowLeft } from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils/formatters';

const OrdersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrders();
        setOrders(Array.isArray(res) ? res : (res?.data || []));
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return { bg: '#fff3cd', color: '#856404' };
      case 'processing': return { bg: '#cce5ff', color: '#004085' };
      case 'shipped': return { bg: '#d1ecf1', color: '#0c5460' };
      case 'delivered': return { bg: '#d4edda', color: '#155724' };
      case 'cancelled': return { bg: '#f8d7da', color: '#721c24' };
      default: return { bg: '#e2e3e5', color: '#383d41' };
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <button onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginRight: '16px' }}>
            <ArrowLeft size={20} color="#4a5568" />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1d20', margin: 0 }}>{t("My Orders")}</h1>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>{t("Loading orders...")}</div>
        ) : orders.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '16px', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <Package size={64} color="#e9ecef" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#343a40', margin: '0 0 8px 0' }}>{t("No orders yet")}</h3>
            <p style={{ color: '#6c757d', margin: '0 0 24px 0' }}>{t("When you place an order, it will appear here.")}</p>
            <button onClick={() => navigate('/')} style={{ background: '#008b8b', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              {t("Start Shopping")}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map(order => {
              const statusColors = getStatusColor(order.status);
              return (
                <div key={order.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#868e96', marginBottom: '4px' }}>{t("Order")} #{order.id}</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1d20' }}>{new Date(order.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{ background: statusColors.bg, color: statusColors.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'capitalize' }}>
                      {t(order.status || 'pending')}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#6c757d', marginBottom: '4px' }}>{t("Total Amount")}</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#008b8b' }}>{formatPrice(order.total_amount || order.total)}</div>
                    </div>
                    <button onClick={() => navigate(`/orders/${order.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#008b8b', fontWeight: '600', cursor: 'pointer' }}>
                      {t("View Details")} <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default OrdersPage;
