import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import { addUserMutationOptions } from '../../api/customQueryOptions';
import type { UserAddRequest } from '../../types/responseTypes';
import { getAuthState } from '../../utils/getAuthState';

import UserCard from '../../components/UserCard';

function AddUserPage() {
  const [newUserData, setNewUserDataData] = useState<UserAddRequest>({
    username: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
  });
  const [isError, setIsError] = useState<boolean>(false);

  const addUserMutation = useMutation(addUserMutationOptions());

  const handleAddUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newUserData.username.length <= 5 ||
      !newUserData.email.includes('@') ||
      newUserData.firstName.length <= 1 ||
      newUserData.lastName.length <= 2 ||
      !newUserData.phone?.match(/^\+\d{3}\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/)
    ) {
      setIsError(true);
    } else {
      setIsError(false);

      addUserMutation.mutate(newUserData);

      setNewUserDataData({
        username: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        gender: '',
      });
    }
  };

  return (
    <div className="mr-auto ml-auto flex flex-col items-center justify-start gap-6 p-4 pt-0 pb-6 max-sm:w-9/10 sm:w-8/10 lg:w-7/10 xl:w-5/10 2xl:w-4/10">
      <h1 className="pt-6 text-center font-heading text-h1/8">Add New User</h1>

      <form onSubmit={handleAddUserSubmit} className="flex w-full flex-row gap-10 max-sm:flex-col" id="adduser">
        <div className="w-full">
          <p className="mb-3 w-full text-left text-normal/5 font-semibold">Main information</p>

          <label htmlFor="username">
            Username <span className="text-coral">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
            autoComplete="on"
            required
            aria-label="Username"
            value={newUserData.username}
            onChange={(e) => setNewUserDataData({ ...newUserData, username: e.target.value })}
          />
          <br />
          <p className="mb-3 text-small text-grey-dark">Should be more than 5 symbols</p>

          <label htmlFor="email">
            Email <span className="text-coral">*</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
            autoComplete="on"
            required
            aria-label="Email"
            value={newUserData.email}
            onChange={(e) => setNewUserDataData({ ...newUserData, email: e.target.value })}
          />
          <br />
          <p className="mb-3 text-small text-grey-dark">Format: example@gmail.com</p>

          <p>Gender</p>
          <div className="flex flex-row items-center justify-center gap-5">
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                className="mr-2"
                checked={newUserData.gender === 'male'}
                value="male"
                onChange={(e) => setNewUserDataData({ ...newUserData, gender: e.target.value })}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                className="mr-2"
                checked={newUserData.gender === 'female'}
                value="female"
                onChange={(e) => setNewUserDataData({ ...newUserData, gender: e.target.value })}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-3 text-left text-normal/5 font-semibold">Additional information</p>
          <label htmlFor="firstName">
            First name <span className="text-coral">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            className="w-full rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
            autoComplete="on"
            required
            aria-label="First name"
            value={newUserData.firstName}
            onChange={(e) => setNewUserDataData({ ...newUserData, firstName: e.target.value })}
          />
          <br />
          <p className="mb-3 text-small text-grey-dark">Should be more than 1 symbol</p>

          <label htmlFor="lastName">
            Last name <span className="text-coral">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            className="w-full rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
            autoComplete="on"
            required
            aria-label="Last name"
            value={newUserData.lastName}
            onChange={(e) => setNewUserDataData({ ...newUserData, lastName: e.target.value })}
          />
          <br />
          <p className="mb-3 text-small text-grey-dark">Should be more than 2 symbols</p>

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            className="w-full rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
            autoComplete="on"
            required
            aria-label="Phone"
            value={newUserData.phone}
            onChange={(e) => setNewUserDataData({ ...newUserData, phone: e.target.value })}
          />
          <br />
          <p className="mb-3 text-small text-grey-dark">Format: +xxx(xx) xxx-xx-xx</p>
        </div>
      </form>

      {isError && (
        <p className="text-normal leading-5 font-bold text-red">
          Please, check entering data. Use tips under inputs' fields.
        </p>
      )}

      <button
        form="adduser"
        type="submit"
        className="w-full rounded-md border-2 border-coral bg-coral p-2 pt-1 pb-1 text-white hover:cursor-pointer"
      >
        Add User
      </button>

      {addUserMutation.isSuccess && addUserMutation.data.id && (
        <>
          <p className="font-semibold text-green-dark">User is added successfully!</p>
          <UserCard user={addUserMutation.data} />
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute('/admin/$add')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = getAuthState(queryClient);
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AddUserPage,
});
