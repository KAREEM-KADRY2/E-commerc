import { useTranslation } from "react-i18next";
import React from 'react';
import { X, Zap, CheckCircle2 } from 'lucide-react';
import { useGroup } from '../../hooks/useGroup';
const GroupModal = ({
  groupState
}) => {
  const {
    t
  } = useTranslation();
  const {
    isGroupModalOpen,
    setIsGroupModalOpen,
    groupCount,
    groupMembersList,
    simulateInvite,
    progressPercent,
    cashbackVal
  } = groupState;
  if (!isGroupModalOpen) return null;
  return <div className={`group-modal-overlay active`} onClick={() => setIsGroupModalOpen(false)}>
      <div className="group-modal" onClick={e => e.stopPropagation()}>
        <div className="group-modal-header">
          <h3>{t("Your Shopping Group")}</h3>
          <button className="icon-btn" onClick={() => setIsGroupModalOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="group-modal-content">
          <div className="group-tier">
            <div className="tier-info">
              <Zap size={20} className="text-accent" />
              <span className="font-semibold" id="groupCashbackText">{cashbackVal}{t("% Cashback")}</span>
            </div>
            <div className="tier-members font-medium">
              {groupCount}{t("/5 Members")}</div>
          </div>
          
          <div className="group-progress">
            <div className="group-progress-fill" style={{
            width: `${progressPercent}%`
          }}></div>
          </div>
          
          <div className="group-members-list">
            <div className="group-member">
              <div className="avatar" style={{
              backgroundColor: 'var(--text-main)'
            }}>{t("YO")}</div>
              <span>{t("You (Host)")}</span>
            </div>
            {groupMembersList.map((member, index) => {
            const {
              t
            } = useTranslation();
            return <div key={index} className="group-member slide-in">
                <div className={`avatar ${member.color}`}>{member.name.substring(0, 2).toUpperCase()}</div>
                <span>{member.name}{t("joined")}</span>
              </div>;
          })}
          </div>
          
          {groupCount > 4 ? <div className="group-success">
              <CheckCircle2 size={24} className="text-success" />
              <span>{t("Group complete! Max tier unlocked.")}</span>
            </div> : <button className="btn btn-primary w-full mt-4" onClick={simulateInvite}>{t("Simulate Invite Link")}</button>}
        </div>
      </div>
    </div>;
};
export default GroupModal;
