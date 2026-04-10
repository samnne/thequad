'use client'
import { useCallback, useContext, useEffect, useState, createContext } from "react"


interface NetworkContextType {
  isOnline: boolean;
}


const NetworkContext = createContext<NetworkContextType | null>(null);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setOnline] = useState<boolean>(() => {
   
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const setOnlineToTrue = useCallback(() => setOnline(true), []);
  const setOnlineToFalse = useCallback(() => setOnline(false), []);

  useEffect(() => {
    window.addEventListener('online', setOnlineToTrue);
    window.addEventListener('offline', setOnlineToFalse);
    return () => {
      window.removeEventListener('online', setOnlineToTrue);
      window.removeEventListener('offline', setOnlineToFalse);
    };
  }, [setOnlineToTrue, setOnlineToFalse]);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkCheck = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetworkCheck must be used within a NetworkProvider");
  }
  return context;
};