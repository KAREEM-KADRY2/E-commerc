import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Copy, CheckCircle2, Info, ShieldCheck, Gift, UserPlus } from 'lucide-react';
import GroupMemberProgress from '../components/group/GroupMemberProgress';
import GroupProductItem from '../components/group/GroupProductItem';
import './GroupDetails.css';

const GroupDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    groupName = 'My Group Buy',
    products = [],
    inviteCode: stateInviteCode,
    groupId
  } = location.state || {};
  
  const [copied, setCopied] = useState(false);
  const inviteCode = stateInviteCode || 'GB-W5H3';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayProducts = products.map(p => ({
    ...p,
    addedCount: p.addedCount || 1
  }));

  return (
    <div className="group-details-wrapper">
      <div className="group-details-container">
        
        <div className="group-header">
          <button onClick={() => navigate('/active-group-buys')} className="group-back-btn">
            <ArrowLeft size={20} color="#4a5568" />
          </button>
          
          <div className="group-title-section">
            <div className="group-title-row">
              <div className="group-icon-wrapper">
                <Users size={16} color="#008b8b" />
              </div>
              <h1 className="group-name">{groupName}</h1>
            </div>
            <p className="group-subtitle">
              {t("Invite friends & unlock up to")}
              <span className="group-discount-highlight"> {t("15% OFF")}</span>
            </p>
          </div>
        </div>

        <div className="group-invite-banner">
          <div className="group-invite-text-section">
            <div className="group-gift-icon">
              <Gift size={20} color="#008b8b" />
            </div>
            <p className="group-invite-text">
              {t("Invite more friends, unlock higher discounts, and save more together!")}
            </p>
          </div>
          <button className="group-btn-primary">
            <UserPlus size={16} />{t("Invite Friends")}
          </button>
        </div>

        <div className="group-invite-code-box">
          <div className="group-code-row">
            <div>
              <label className="group-label">{t("INVITE CODE")}</label>
              <div className="group-code-value">{inviteCode}</div>
            </div>
            <button onClick={handleCopy} className="group-code-btn">
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="group-code-hint">
            <ShieldCheck size={16} color="#008b8b" />
            {t("Share this code with friends to invite them to your group")}
          </div>
        </div>

        <GroupMemberProgress />

        <label className="group-label" style={{ marginBottom: '16px' }}>
          {t("PRODUCTS IN GROUP")}
        </label>
        
        <div className="group-products-list">
          {displayProducts.map((product, index) => (
            <GroupProductItem key={index} product={product} />
          ))}
        </div>

      </div>

      <div className="group-checkout-footer">
        <div className="group-checkout-container">
          <button 
            onClick={() => navigate('/group-checkout', { state: { products: displayProducts } })} 
            className="group-checkout-btn"
          >
            {t("Join & Pay Full Price")}
          </button>
          
          <div className="group-checkout-alert">
            <div className="group-alert-text">
              <ShieldCheck size={16} color="#008b8b" />
              {t("Any unlocked discount will be automatically refunded to your wallet")}
            </div>
            <Info size={16} color="#adb5bd" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default GroupDetails;
