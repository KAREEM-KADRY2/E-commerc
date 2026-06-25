import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Check, Trash2, Package, Tag, Wallet } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { useAuth } from '../../context/AuthContext';
import './NotificationsDropdown.css';

const NotificationsDropdown = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    if (!isLoggedIn) return;
    try {
      const [notifsRes, countRes] = await Promise.all([
        notificationService.getNotifications(),
        notificationService.getUnreadCount()
      ]);
      setNotifications(Array.isArray(notifsRes) ? notifsRes : (notifsRes?.data || []));
      setUnreadCount(countRes?.count || countRes?.data?.count || 0);
    } catch (error) {
      console.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) fetchNotifications();
  };

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'order': return <Package size={16} color="#008b8b" />;
      case 'offer': return <Tag size={16} color="#f59e0b" />;
      case 'wallet': return <Wallet size={16} color="#34a853" />;
      default: return <Bell size={16} color="#6c757d" />;
    }
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="icon-btn" onClick={handleToggle}>
        <Bell size={20} />
        {unreadCount > 0 && <span className="badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notif-dropdown">
          <div className="notif-header">
            <h3>{t("Notifications")}</h3>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
                <Check size={14} /> {t("Mark all as read")}
              </button>
            )}
          </div>
          
          <div className="notif-body">
            {notifications.length === 0 ? (
              <div className="notif-empty">
                <Bell size={32} color="#dee2e6" />
                <p>{t("No notifications yet")}</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className={`notif-item ${notif.read ? 'read' : 'unread'}`}>
                  <div className="notif-icon-wrapper">
                    {getIcon(notif.type)}
                  </div>
                  <div className="notif-content">
                    <h4>{notif.title}</h4>
                    <p>{notif.message}</p>
                    <span className="notif-time">{new Date(notif.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  {!notif.read && (
                    <button className="mark-read-btn" onClick={(e) => handleMarkAsRead(notif.id, e)} title={t("Mark as read")}>
                      <div className="unread-dot"></div>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
