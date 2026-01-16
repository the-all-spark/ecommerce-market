import { Link } from '@tanstack/react-router';

const notFoundPage = () => {
  return (
    <div className="p-2">
      <h1>404 Not Found</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
};

export default notFoundPage;
