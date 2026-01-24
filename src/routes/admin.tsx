import { createFileRoute } from '@tanstack/react-router';

function AdminAccount() {
  return <div>Hello "admin"!</div>;
}

export const Route = createFileRoute('/admin')({
  component: AdminAccount,
});
