import { createFileRoute, redirect, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAuthState } from '../../utils/getAuthState';
import { allUsersQueryOptions } from '../../api/customQueryOptions';

import UserCard from '../../components/UserCard';

function AdminAccount() {
  const userData = JSON.parse(localStorage.getItem('user') as string);

  const { data: users, status } = useSuspenseQuery(allUsersQueryOptions);

  return (
    <div>
      <h1 className="pt-6 text-center font-heading text-h1/8">Admin panel</h1>
      <h2 className="pt-6 text-center font-heading text-h2/6">
        Hello,{' '}
        <span className="text-coral">
          <b>{userData.firstName}</b>
        </span>
        !
      </h2>

      <div className="m-auto flex w-8/10 flex-col items-center gap-3 pt-5 pb-5 lg:w-7/10">
        <p className="mb-2 w-full border-b-2 border-grey-middle pt-2 pb-2 text-center text-normal/5 font-semibold">
          Your personal data
        </p>
        <div className="flex flex-row gap-6 max-sm:flex-col max-sm:items-start lg:gap-9">
          <div className="text-center">
            <img src={userData.image} alt="User photo" />
            <i>ID</i>: {userData.id}
          </div>
          <div>
            <p>
              <i>Username</i>: <b>{userData.username}</b>
            </p>
            <p>
              <i>First name</i>: {userData.firstName}
            </p>
            <p>
              <i>Last name</i>: {userData.lastName}
            </p>
            <p>
              <i>Email</i>: {userData.email}
            </p>
            <p>
              <i>Gender</i>: {userData.gender}
            </p>
          </div>
        </div>

        <div className="mb-2 flex w-full flex-row items-center border-b-2 border-grey-middle pt-2 pb-2">
          <p className="text-center text-normal/5 font-semibold">Users data</p>
          <button className="ml-auto rounded-md border-2 border-coral p-1 pr-2 pl-2 text-coral hover:cursor-pointer">
            <Link to="/admin/$add" params={{ add: 'add' }}>
              Add new user
            </Link>
          </button>
        </div>

        {status === 'success' && (
          <div className="flex flex-row flex-wrap justify-start gap-3">
            {users.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/admin/')({
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
