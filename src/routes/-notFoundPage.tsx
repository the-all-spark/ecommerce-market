import { Link } from '@tanstack/react-router';

const notFoundPage = () => {
  return (
    <div className="p-2">
      <h1 className="text-10xl pt-6 text-center font-heading">404 </h1>
      <p className="pb-6 text-center text-3xl">Page not found!</p>
      <p className="text-center">
        <Link to="/" className="underline">
          Go to main page
        </Link>
      </p>
    </div>
  );
};

export default notFoundPage;
