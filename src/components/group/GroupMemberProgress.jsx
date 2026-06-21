import React from 'react';
import { useTranslation } from "react-i18next";
import { Trophy } from 'lucide-react';

const GroupMemberProgress = () => {
  const { t } = useTranslation();

  return (
    <div className="group-progress-card">
      <div className="group-progress-header">
        <div className="group-progress-members-section">
          <label className="group-label">{t("MEMBERS JOINED")}</label>
          <div className="group-avatars-row">
            <div className="group-avatar-you">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt={t("You")} 
              />
              <div className="group-avatar-badge">{t("YOU")}</div>
            </div>
            
            {[44, 22, 11].map((num, i) => (
              <div key={i} className="group-avatar-member">
                <img 
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${num}.jpg`} 
                  alt={t("Member")} 
                />
              </div>
            ))}
            <div className="group-avatar-more">
              +7
            </div>
          </div>
        </div>
        
        <div className="group-progress-divider"></div>

        <div className="group-progress-target-section">
          <div className="group-target-icon">
            <Trophy size={20} color="#d97706" />
          </div>
          <div>
            <label className="group-label">{t("TARGET")}</label>
            <div className="group-target-details">
              <span className="group-target-text">{t("10 Members")}</span>
              <span className="group-target-discount">{t("15% OFF")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="group-progress-bar-container">
        <div className="group-progress-bar-fill"></div>
      </div>
      
      <div className="group-progress-footer">
        <span>{t("Current:")} <strong className="group-current-text">{t("1 / 10 members")}</strong></span>
        <span>{t("9 more to go")}</span>
      </div>
    </div>
  );
};

export default GroupMemberProgress;
