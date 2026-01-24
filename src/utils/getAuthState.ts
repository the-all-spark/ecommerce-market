import type { QueryClient } from '@tanstack/react-query';

export const getAuthState = (queryClient: QueryClient) => {
  const cachedIsAuthenticated = queryClient.getQueryData(['auth', 'isAuthenticated']);
  if (cachedIsAuthenticated !== undefined) return cachedIsAuthenticated;
};
