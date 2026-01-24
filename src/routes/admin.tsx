import { createFileRoute, redirect } from '@tanstack/react-router';

import { useAuthStore } from '../hooks/useAuthStore';
import { getAuthState } from '../utils/getAuthState';

function AdminAccount() {
  const { isAuthenticated } = useAuthStore();
  return <div>Hello "admin"! Status: {isAuthenticated ? 'true' : 'false'}</div>;
}

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = getAuthState(queryClient);

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AdminAccount,
});
