import React, { createContext, useContext, ReactNode } from 'react';
import { GitClient } from '@skelegit/core';

interface SkelegitContextValue {
  clients: Record<string, GitClient>;
  defaultClient?: string;
  getClient: (name?: string) => GitClient | undefined;
}

const SkelegitContext = createContext<SkelegitContextValue | undefined>(undefined);

export interface SkelegitProviderProps {
  children: ReactNode;
  clients: Record<string, GitClient>;
  defaultClient?: string;
}

export function SkelegitProvider({ 
  children, 
  clients, 
  defaultClient 
}: SkelegitProviderProps) {
  const getClient = (name?: string): GitClient | undefined => {
    if (name) {
      return clients[name];
    }
    if (defaultClient) {
      return clients[defaultClient];
    }
    const clientNames = Object.keys(clients);
    if (clientNames.length === 1) {
      return clients[clientNames[0]];
    }
    return undefined;
  };

  const value: SkelegitContextValue = {
    clients,
    defaultClient,
    getClient,
  };

  return (
    <SkelegitContext.Provider value={value}>
      {children}
    </SkelegitContext.Provider>
  );
}

export function useSkelegit(): SkelegitContextValue {
  const context = useContext(SkelegitContext);
  if (context === undefined) {
    throw new Error('useSkelegit must be used within a SkelegitProvider');
  }
  return context;
}
