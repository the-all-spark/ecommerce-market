import { useEffect } from 'react';
import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { loginUserMutationOptions } from '../api/customQueryOptions';
import { getAuthState } from '../utils/getAuthState';

// * Login page
function LoginPage() {
  const queryClient = useQueryClient();
  const loginMutation = useMutation(loginUserMutationOptions(queryClient));
  const navigate = useNavigate();

  const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    let username = formData.get('username') as string;
    let password = formData.get('password') as string;

    loginMutation.mutate({ username, password });
  };

  useEffect(() => {
    if (loginMutation.isSuccess && localStorage.getItem('user')) {
      navigate({ to: '/admin' });
    }
  }, [loginMutation.isSuccess]);

  return (
    <div className="mr-auto ml-auto flex w-5/10 flex-col gap-6 xl:w-3/10">
      <div className="text-center">
        <h1 className="pt-6 pr-3 pl-3 font-heading text-h1/8">Login to admin panel</h1>
        <p className="font-bold text-coral">(Only for admins!)</p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleLoginFormSubmit}>
        <input
          autoComplete="on"
          name="username"
          type="text"
          placeholder="Username"
          className="rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
        />
        <button className="rounded-md border-2 border-coral bg-coral p-2 pt-1 pb-1 text-white hover:cursor-pointer">
          Login
        </button>

        {loginMutation.isSuccess && !loginMutation.data.accessToken && (
          <div>
            <p className="text-center font-bold text-red">Please, check your credentials!</p>
          </div>
        )}
      </form>

      <div className="border-2 border-grey-dark p-4">
        <h2 className="p-2 text-center font-heading text-h2/8">Use demo account:</h2>
        <p className="text-center">
          <b>Username:</b> emilys <br />
          <b>Password:</b> emilyspass
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = getAuthState(queryClient);
    if (isAuthenticated) {
      throw redirect({
        to: '/admin',
      });
    }
  },
  component: LoginPage,
});
