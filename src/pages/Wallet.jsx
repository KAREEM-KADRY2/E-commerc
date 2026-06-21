import { useTranslation } from "react-i18next";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
const Wallet = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const transactions = [{
    id: 1,
    type: 'cashback',
    title: 'Cashback - Group #4821',
    date: 'Jun 5, 2026',
    amount: '+$18.50',
    isPositive: true
  }, {
    id: 2,
    type: 'order',
    title: 'Order #98231',
    date: 'Jun 2, 2026',
    amount: '$89.00',
    isPositive: false
  }, {
    id: 3,
    type: 'cashback',
    title: 'Cashback - Group #4720',
    date: 'May 28, 2026',
    amount: '+$12.30',
    isPositive: true
  }, {
    id: 4,
    type: 'order',
    title: 'Order #97120',
    date: 'May 21, 2026',
    amount: '$45.50',
    isPositive: false
  }, {
    id: 5,
    type: 'bonus',
    title: 'Welcome Bonus',
    date: 'May 14, 2026',
    amount: '+$25.00',
    isPositive: true
  }];
  return <div style={{
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif',
    background: '#f8f9fa',
    minHeight: '100vh'
  }}>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      cursor: 'pointer',
      color: '#4a5568'
    }} onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        <span style={{
        fontSize: '14px',
        marginLeft: '4px'
      }}>{t("Back")}</span>
      </div>

      <div style={{
      background: '#008080',
      borderRadius: '16px',
      padding: '30px 24px',
      color: 'white',
      marginBottom: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
        <div style={{
        fontSize: '14px',
        opacity: 0.9,
        marginBottom: '8px'
      }}>{t("Available Balance")}</div>
        <div style={{
        fontSize: '42px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>$248.30</div>
        <div style={{
        fontSize: '12px',
        opacity: 0.8
      }}>{t("Earned through group purchases & cashback")}</div>
      </div>

      <h3 style={{
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#1a202c'
    }}>{t("Transaction History")}</h3>

      <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
        {transactions.map((tx, index) => {
        const {
          t
        } = useTranslation();
        return <div key={tx.id} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: index < transactions.length - 1 ? '1px solid #f0f0f0' : 'none'
        }}>
            <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px',
            background: tx.isPositive ? '#e6f4ea' : '#f1f3f4',
            color: tx.isPositive ? '#34a853' : '#5f6368'
          }}>
              {tx.isPositive ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
            
            <div style={{
            flex: 1
          }}>
              <div style={{
              fontSize: '14px',
              color: '#1a202c',
              marginBottom: '4px'
            }}>{tx.title}</div>
              <div style={{
              fontSize: '12px',
              color: '#718096'
            }}>{tx.date}</div>
            </div>
            
            <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: tx.isPositive ? '#34a853' : '#4a5568'
          }}>
              {tx.amount}
            </div>
          </div>;
      })}
      </div>
    </div>;
};
export default Wallet;
