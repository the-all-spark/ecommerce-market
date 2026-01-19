import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { allProductsQueryOptions } from '../../api/customQueryOptions';
import type { AllProducts } from '../../types/responseTypes';

import ProductPreviewCard from '../../components/ProductPreviewCard';

// List of products' preview cards
// TODO: add pagination

const Products = () => {
  const { data, status } = useSuspenseQuery(allProductsQueryOptions);

  let content: React.ReactNode;

  if (status === 'success') {
    console.log(data); //!
    content = data.products.map((item: AllProducts) => <ProductPreviewCard key={item.id} item={item} />);
  }

  return <div className="m-auto flex w-9/10 flex-wrap items-stretch justify-start gap-6 p-2 pt-6 pb-6">{content}</div>;
};

export const Route = createFileRoute('/products/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allProductsQueryOptions),
  component: Products,
});
