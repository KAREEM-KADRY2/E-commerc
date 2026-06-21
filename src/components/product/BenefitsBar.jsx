import React from 'react';
import { Truck, Gift, RefreshCcw, ShieldCheck } from 'lucide-react';

const BenefitsBar = () => {
  const benefits = [
    { id: 1, icon: <Truck size={24} />, title: "Free Shipping", subtitle: "On orders over $50" },
    { id: 2, icon: <Gift size={24} />, title: "Cashback Rewards", subtitle: "Earn on every purchase" },
    { id: 3, icon: <RefreshCcw size={24} />, title: "Easy Returns", subtitle: "30-day return policy" },
    { id: 4, icon: <ShieldCheck size={24} />, title: "Secure Payments", subtitle: "100% protected" }
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
