'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

Amplify.configure(outputs, { ssr: true });

const AmplifyContext = createContext<boolean>(true);

export function AmplifyProvider({ children }: { children: ReactNode }) {
  return <AmplifyContext.Provider value={true}>{children}</AmplifyContext.Provider>;
}

export function useAmplify() {
  return useContext(AmplifyContext);
}
