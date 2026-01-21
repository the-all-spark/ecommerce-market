import type { AllProductsResponse } from '../types/responseTypes';
import ProductPreviewCard from './ProductPreviewCard';

const AllPreviewCards = ({ products }: { products: AllProductsResponse[] }) => {
  return (
    <div className="m-auto flex w-9/10 flex-wrap items-stretch justify-start gap-6 p-2 pt-6 pb-6">
      {products.map((item: AllProductsResponse) => (
        <ProductPreviewCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllPreviewCards;
