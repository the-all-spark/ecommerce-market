import { useSuspenseQuery } from '@tanstack/react-query';

import { categoryQueryOptions } from '../api/customQueryOptions';
import type { AllProductsResponse } from '../types/responseTypes';

import ProductPreviewCard from '../components/ProductPreviewCard';

// List of products by particular category
const ProductsByCategory = ({ category }: { category: string }) => {
  const { data, status } = useSuspenseQuery(categoryQueryOptions(category));

  let categoryString = category[0].toUpperCase() + category.slice(1);
  let content;

  if (status === 'success') {
    console.log(data); //!
    content = data.products.map((item: AllProductsResponse) => <ProductPreviewCard key={item.id} item={item} />);
  }

  return (
    <div className="p-2">
      <p className="text-center">
        Selected category: <b>{categoryString}</b>
      </p>
      <div className="m-auto flex w-9/10 flex-wrap items-stretch justify-start gap-6 p-2 pt-6 pb-6">{content}</div>
    </div>
  );
};

export default ProductsByCategory;
