import { Link } from '@tanstack/react-router';
import type { AllProductsResponse } from '../types/responseTypes';

import { getCircleColor } from '../utils/getCircleColor';

interface ProductPreviewCardProps {
  item: AllProductsResponse;
}

const ProductPreviewCard = ({ item }: ProductPreviewCardProps) => {
  let categoryString = item.category[0].toUpperCase() + item.category.slice(1);

  return (
    <div className="h-auto w-[47%] items-center rounded-md bg-white p-5 shadow-md">
      <Link to={`/products/${item.id}`}>
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="flex flex-row items-center gap-3">
            <div className={`inline-block h-4 w-4 rounded-full ${getCircleColor(item.availabilityStatus)}`}></div>
            <p className="text-small leading-4 text-grey-dark">{item.availabilityStatus}</p>
          </div>
          <p className="text-right text-small leading-4 text-grey-dark">{categoryString}</p>
        </div>

        <img src={item.thumbnail} alt="Product preview image" className="mt-3 mb-3" />
        <h2 className="text-center font-heading text-h2/6">{item.title}</h2>
        <p>Brand: {item.brand ? item.brand : '-'}</p>

        <div className="mt-3 flex flex-row items-center justify-between gap-3">
          <p className={item.price.toString().length >= 8 ? 'text-normal' : 'text-large'}>{item.price} $</p>
          <p className={item.stock === 0 ? 'text-red' : 'text-black'}>
            Available: {item.stock === 0 ? '-' : item.stock}
          </p>
        </div>

        <p className="mt-3 text-right text-small leading-4 text-grey-dark">Tags: {item.tags.join(', ')}</p>
      </Link>
    </div>
  );
};

export default ProductPreviewCard;
