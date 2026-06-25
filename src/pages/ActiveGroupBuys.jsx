import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { Play, Users, Plus, Hash, ChevronRight, ChevronDown } from 'lucide-react';
import GroupBuyCard from '../components/group/GroupBuyCard';
import { groupBuyService } from '../services/groupBuyService';
import { useToast } from '../context/ToastContext';
import './ActiveGroupBuys.css';

const ActiveGroupBuys = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Groups');
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await groupBuyService.getMyGroupBuys();
        const data = Array.isArray(res) ? res : (res?.data || []);
        setGroups(data);
      } catch (error) {
        console.error("Failed to load group buys", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleJoin = async () => {
    if (!joinCode.trim()) return;
    try {
      await groupBuyService.joinGroupByInviteCode(joinCode.trim());
      showToast(t("Joined group successfully!"));
      // Refresh list
      const res = await groupBuyService.getMyGroupBuys();
      setGroups(Array.isArray(res) ? res : (res?.data || []));
      setJoinCode('');
    } catch (e) {
      showToast(t("Failed to join or invalid code"));
    }
  };

  const statuses = [...new Set(groups.map(g => g.status || 'Active'))];
  const activeTabCounts = groups.reduce((acc, g) => {
    const s = g.status || 'Active';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const dynamicTabs = ['All Groups', ...statuses.map(status => `${status} (${activeTabCounts[status]})`)];

  const filteredGroups = groups.filter(group => {
    if (activeTab === 'All Groups') return true;
    const s = group.status || 'Active';
    return activeTab.startsWith(s);
  });

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      <div className="agb-container">
        
        <div className="agb-breadcrumb">
          <span>{t("Home")}</span>
          <ChevronRight size={14} />
          <span>{t("Deals")}</span>
          <ChevronRight size={14} />
          <span className="agb-breadcrumb-active">{t("Active Group Buys")}</span>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h1 className="agb-page-title">{t("Active Group Buys")}</h1>
          <p className="agb-page-subtitle">{t("Track every group you've joined or started.")}</p>
        </div>

        <div className="agb-hero-banner">
          <Users size={120} className="agb-hero-bg-icon" />
          <div className="agb-hero-label">{t("My Deals Overview")}</div>
          <h2 className="agb-hero-title">{t("Your Group Buying Power")}</h2>
          <p className="agb-hero-subtitle">{t("The more you team up, the more you save.")}</p>
        </div>

        <div className="agb-actions-grid">
          <div onClick={() => navigate('/start-group-buy')} className="agb-action-card-create">
            <div className="agb-action-icon-wrapper">
              <Plus size={24} color="#008b8b" />
            </div>
            <div>
              <h3 className="agb-action-title">{t("Create New Group")}</h3>
              <p className="agb-action-desc">{t("Start a new group and unlock up to 15% off when you shop together.")}</p>
            </div>
            <ChevronRight size={20} color="#008b8b" className="agb-action-arrow" />
          </div>

          <div className="agb-action-card-join">
            <h3 className="agb-join-title">{t("Join Existing Group")}</h3>
            <p className="agb-join-desc">{t("Enter a group code from your friend to join their group.")}</p>
            
            <div className="agb-join-input-group">
              <div className="agb-input-wrapper">
                <Hash size={18} color="#adb5bd" className="agb-input-icon" />
                <input 
                  type="text" 
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value)}
                  placeholder={t("Enter Group Code (e.g., GB-X72A)")} 
                  className="agb-join-input"
                />
              </div>
              <button className="agb-join-btn" onClick={handleJoin}>
                {t("Join Now")} <Play size={12} fill="white" />
              </button>
            </div>
          </div>
        </div>

        <div className="agb-tabs-container">
          <div className="agb-tabs-list">
            {dynamicTabs.map(tab => {
              const isActive = activeTab === tab;
              return (
                <div 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`agb-tab ${isActive ? 'agb-tab-active' : 'agb-tab-inactive'}`}
                >
                  {tab === 'All Groups' && (
                    <div style={{
                      width: '16px', height: '16px', border: '1.5px solid currentColor', borderRadius: '4px',
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '2px'
                    }}>
                      <div style={{ background: 'currentColor' }}></div>
                      <div style={{ background: 'currentColor' }}></div>
                      <div style={{ background: 'currentColor' }}></div>
                      <div style={{ background: 'currentColor' }}></div>
                    </div>
                  )}
                  {tab !== 'All Groups' && (
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: tab.includes('Active') ? '#20c997' : tab.includes('Pending') ? '#fd7e14' : '#dc3545'
                    }}></div>
                  )}
                  {tab === 'All Groups' ? t('All Groups') : `${t(tab.split(' ')[0])} ${tab.split(' ').slice(1).join(' ')}`}
                  {isActive && <div className="agb-tab-indicator"></div>}
                </div>
              );
            })}
          </div>
          
          <div className="agb-sort-dropdown">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12m-9 6h6" /></svg>
            {t("Sort by: Recent")} <ChevronDown size={16} />
          </div>
        </div>

        <div className="agb-groups-list">
          {loading ? (
             <div style={{ padding: '40px', textAlign: 'center' }}>{t("Loading...")}</div>
          ) : filteredGroups.length === 0 ? (
            <div className="agb-empty-state">
              {t("No groups found in this category.")}
            </div>
          ) : (
            filteredGroups.map(group => (
              <GroupBuyCard key={group.id} group={group} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ActiveGroupBuys;
