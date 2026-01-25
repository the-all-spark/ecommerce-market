import type { AllProductsResponse } from '../types/responseTypes';
import ProductPreviewCard from './ProductPreviewCard';

interface AllPreviewCardsProps {
  products: AllProductsResponse[];
}

const AllPreviewCards = ({ products }: AllPreviewCardsProps) => {
  return (
    <div className="m-auto flex w-9/10 flex-wrap items-stretch justify-start gap-6 p-2 pt-6 pb-6 max-sm:justify-center sm:gap-8 lg:gap-4">
      {products.map((item: AllProductsResponse) => (
        <ProductPreviewCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllPreviewCards;
