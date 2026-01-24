import { useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuthStore = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: isAuthenticated } = useQuery({
    queryKey: ['auth', 'isAuthenticated'],
    queryFn: () => Boolean(localStorage.getItem('isAuthenticated')),
    initialData: () => Boolean(localStorage.getItem('isAuthenticated')),
  });

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    queryClient.setQueryData(['auth', 'isAuthenticated'], false);
    navigate({ to: '/' });
  };

  return {
    isAuthenticated,
    logout,
  };
};
