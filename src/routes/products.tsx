import { createFileRoute } from '@tanstack/react-router';

// List of products
const Products = () => {
  return (
    <div className="p-2">
      <h1>Products page</h1>
    </div>
  );
};

export const Route = createFileRoute('/products')({
  component: Products,
});
