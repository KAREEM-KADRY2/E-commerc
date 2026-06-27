import React, { createContext, useState, useContext, useEffect } from 'react';
import { marketService } from '../services/marketService';
import { contentService } from '../services/contentService';

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapApp = async () => {
      try {
        const [marketRes, settingsRes] = await Promise.all([
          marketService.getCurrentMarket(),
          contentService.getSettings()
        ]);
        setMarketData(marketRes);
        setSettings(settingsRes);
      } catch (error) {
        console.error("App bootstrap failed", error);
      } finally {
        setLoading(false);
      }
    };
    
    bootstrapApp();
  }, []);

  return (
    <MarketContext.Provider value={{ marketData, settings, loading }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);
