'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AmplifyProvider } from '@/lib/AmplifyProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AmplifyProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AmplifyProvider>
  );
}
