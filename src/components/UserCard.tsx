import type { AllUsersResponse } from '../types/responseTypes';

interface ProductPreviewCardProps {
  user: AllUsersResponse;
}

const UserCard = ({ user }: ProductPreviewCardProps) => {
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
      <p>
        <i>Gender</i>: {user.gender}
      </p>
      <p>
        <i>Birth date</i>: {user.birthDate}
      </p>
    </div>
  );
};

export default UserCard;
