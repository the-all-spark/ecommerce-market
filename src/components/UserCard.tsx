import type { AllUsersResponse, UserAddResponse } from '../types/responseTypes';

interface UserCardProps {
  user: AllUsersResponse | UserAddResponse;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border border-grey-dark p-3">
      <p>
        <i>ID</i>: {user.id}
      </p>
      <p>
        <i>Username</i>: <b>{user.username}</b>
      </p>
      <p>
        <i>Email</i>: {user.email}
      </p>
      <p>
        <i>First name</i>: {user.firstName}
      </p>
      <p>
        <i>Last name</i>: {user.lastName}
      </p>

      {user.gender && (
        <p>
          <i>Gender</i>: {user.gender}
        </p>
      )}
      {user.phone && (
        <p>
          <i>Phone</i>: {user.phone}
        </p>
      )}
      {user.birthDate && (
        <p>
          <i>Birth date</i>: {user.birthDate}
        </p>
      )}
    </div>
  );
};

export default UserCard;
