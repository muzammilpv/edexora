'use client';

import React from 'react';
import { AppProvider as StoreProvider } from '../../lib/store';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
