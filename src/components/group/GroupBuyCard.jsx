import React from 'react';
import { useTranslation } from "react-i18next";
import { Users, Tag, ChevronRight, Clock, Flame, User } from 'lucide-react';

const GroupBuyCard = ({ group }) => {
  const { t } = useTranslation();

  return (
    <div className="agb-group-card">
      <div className="agb-group-icon">
        <Tag size={28} color="#d97706" style={{ transform: 'rotate(-45deg)' }} />
      </div>

      <div className="agb-group-info">
        <div className="agb-group-header">
          <h3 className="agb-group-name">{group.name}</h3>
          <span className="agb-group-code">{group.code}</span>
        </div>
        <div className="agb-group-members-summary">
          <div className="agb-avatars">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="agb-avatar-circle" style={{ zIndex: 3 - i }}>
                <User size={16} color="#868e96" />
              </div>
            ))}
            <div className="agb-avatar-more">+2</div>
          </div>
          <span className="agb-members-text">{group.members} {t("Members")}</span>
        </div>
      </div>

      <div className="agb-group-card-divider"></div>

      <div className="agb-stat-block">
        <div className="agb-stat-value text-teal">
          <Users size={16} /> {group.members}/{group.maxMembers}
        </div>
        <div className="agb-stat-label">{t("Members")}</div>
        <div className="agb-progress-bar">
          <div 
            className="agb-progress-fill bg-teal" 
            style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="agb-group-card-divider"></div>

      <div className="agb-stat-block">
        <div className="agb-stat-value text-orange">
          <Flame size={16} /> {group.discount}%
        </div>
        <div className="agb-stat-label">{t("Discount Unlocked")}</div>
        <div className="agb-progress-bar">
          <div 
            className="agb-progress-fill bg-orange" 
            style={{ width: `${(group.discount / 15) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="agb-group-card-divider"></div>

      <div className="agb-stat-block time-block">
        <div className={`agb-stat-value ${group.status === 'Active' ? 'text-dark-teal' : 'text-danger'}`}>
          <Clock size={16} /> {t(group.timeRemaining)}
        </div>
        <div className="agb-stat-label">
          {group.status === 'Expired' ? t('Ended on') : t('Ends on')} {group.endDate}
        </div>
        
        <div className={`agb-status-indicator ${group.status === 'Active' ? 'text-success' : 'text-danger'}`}>
          <div className="agb-status-dot"></div> {t(group.status)}
        </div>
      </div>

      <button className="agb-card-arrow">
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default GroupBuyCard;
