import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMarket } from '../../context/MarketContext';
import { Truck, Gift, RefreshCcw, ShieldCheck } from 'lucide-react';

const BenefitsBar = () => {
  const { t } = useTranslation();
  const { marketData } = useMarket();
  
  const benefits = [
    { id: 1, icon: <Truck size={24} />, title: t("Free Shipping"), subtitle: `${t("On orders over")} ${marketData?.min_order || 50} ${marketData?.currency_symbol || '$'}` },
    { id: 2, icon: <Gift size={24} />, title: t("Cashback Rewards"), subtitle: t("Earn on every purchase") },
    { id: 3, icon: <RefreshCcw size={24} />, title: t("Easy Returns"), subtitle: t("30-day return policy") },
    { id: 4, icon: <ShieldCheck size={24} />, title: t("Secure Payments"), subtitle: t("100% protected") }
  ];

  return (
    <div className="benefits-bar">
      {benefits.map(benefit => (
        <div key={benefit.id} className="benefit-card">
          <div className="benefit-icon">
            {benefit.icon}
          </div>
          <div className="benefit-info">
            <h4>{benefit.title}</h4>
            <p>{benefit.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitsBar;
