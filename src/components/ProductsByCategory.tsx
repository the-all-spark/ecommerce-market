import { useSuspenseQuery } from '@tanstack/react-query';

import { categoryQueryOptions } from '../api/customQueryOptions';
import AllPreviewCards from '../components/AllPreviewCards';

interface ProductsByCategoryProps {
  category: string;
}

// * List of products by particular category
const ProductsByCategory = ({ category }: ProductsByCategoryProps) => {
  const { data, status } = useSuspenseQuery(categoryQueryOptions(category));

  let categoryString = category[0].toUpperCase() + category.slice(1);

  return (
    <div className="p-2">
      <p className="pt-2 text-center">
        Selected category: <b>{categoryString}</b>
      </p>
      {status === 'success' && <AllPreviewCards products={data.products} />}
    </div>
  );
};

export default ProductsByCategory;
