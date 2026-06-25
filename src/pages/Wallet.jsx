import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { walletService } from '../services/walletService';
import { formatPrice } from '../utils/formatters';

const Wallet = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      try {
        const [walletRes, txRes] = await Promise.all([
          walletService.getWalletBalance(),
          walletService.getTransactions()
        ]);
        
        if (walletRes && walletRes.balance !== undefined) {
          setBalance(walletRes.balance);
        } else if (walletRes && walletRes.data?.balance !== undefined) {
          setBalance(walletRes.data.balance);
        }

        const txList = Array.isArray(txRes) ? txRes : (txRes?.data || []);
        setTransactions(txList);
      } catch (error) {
        console.error("Failed to load wallet data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>{t("Loading...")}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer', color: '#4a5568' }} onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        <span style={{ fontSize: '14px', marginLeft: '4px' }}>{t("Back")}</span>
      </div>

      <div style={{ background: '#008b8b', borderRadius: '16px', padding: '30px 24px', color: 'white', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>{t("Available Balance")}</div>
        <div style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '16px' }}>{formatPrice(balance)}</div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>{t("Earned through group purchases & cashback")}</div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1a202c' }}>{t("Transaction History")}</h3>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        {transactions.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#718096' }}>
            {t("No transactions yet")}
          </div>
        ) : (
          transactions.map((tx, index) => {
            const isPositive = tx.amount > 0 || tx.type === 'cashback' || tx.type === 'deposit' || tx.type === 'bonus';
            return (
              <div key={tx.id} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: index < transactions.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', background: isPositive ? '#e6f4ea' : '#f1f3f4', color: isPositive ? '#34a853' : '#5f6368' }}>
                  {isPositive ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#1a202c', marginBottom: '4px' }}>{tx.title || t(tx.type) || t("Transaction")}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{tx.date || new Date(tx.created_at).toLocaleDateString()}</div>
                </div>
                
                <div style={{ fontSize: '15px', fontWeight: '500', color: isPositive ? '#34a853' : '#4a5568' }}>
                  {isPositive ? '+' : ''}{formatPrice(Math.abs(tx.amount))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Wallet;
