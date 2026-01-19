import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { singleProductQueryOptions } from '../../api/customQueryOptions';

import { getCircleColor } from '../../utils/getCircleColor';

function SingleProductCard() {
  const { productId } = Route.useParams();
  const { data: product, status } = useSuspenseQuery(singleProductQueryOptions(productId));

  let content: React.ReactNode;

  if (status === 'success') {
    let categoryString = product.category[0].toUpperCase() + product.category.slice(1);

    console.log(product); //!

    content = (
      <div className="m-auto flex w-9/10 flex-col justify-start gap-6 p-2 pt-6 pb-6">
        <p className="text-right text-small leading-4 text-grey-dark">{categoryString}</p>

        <h1 className="text-center font-heading text-h1/8">{product.title}</h1>

        <div className="flex flex-col justify-between gap-y-2">
          <div>
            <h2 className="mb-2 border-b-2 border-grey-middle pt-2 pb-2 text-normal/5 font-semibold">
              Main information
            </h2>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="w-7/10">
              <p className="mb-2">
                <i>Description</i>: {product.description}
              </p>
              <p>
                <i>Brand</i>: {product.brand ? product.brand : '-'}
              </p>
            </div>
            <div>
              <div className="text-small">
                <p>
                  <i>Dimensions</i>:
                </p>
                <p className="mb-2">
                  {product.dimensions.width} cm x {product.dimensions.height} cm x {product.dimensions.depth} cm
                </p>
                <div className="border-2 border-grey-dark p-2 text-center text-large">
                  Price: <b>{product.price} $</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 border-b-2 border-grey-middle pt-2 pb-2 text-normal/5 font-semibold">Availability</h2>

          <div className="flex flex-row items-center gap-3">
            <p>
              <i>Availability Status</i>:
            </p>
            <div className={`inline-block h-4 w-4 rounded-full ${getCircleColor(product.availabilityStatus)}`}></div>
            <p className="text-normal leading-4 text-grey-dark">{product.availabilityStatus}</p>
          </div>
          <p>
            <i>Available amount</i>: {product.stock}
          </p>
        </div>

        <div>
          <h2 className="mb-2 border-b-2 border-grey-middle pt-2 pb-2 text-normal/5 font-semibold">
            Additional information
          </h2>
          <p>
            <i>Shipping Information</i>: {product.shippingInformation}
          </p>
          <p>
            <i>Warranty Information</i>: {product.warrantyInformation}
          </p>
        </div>

        <div>
          <h2 className="mb-2 border-b-2 border-grey-middle pt-2 pb-2 text-normal/5 font-semibold">Gallery</h2>
          <div className="flex w-full flex-row items-center justify-between">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product image #${index + 1}`} className="w-1/4" />
            ))}
          </div>
        </div>

        <p className="border-t-2 border-grey-middle pt-2 text-right text-small leading-4 text-grey-dark">
          Tags: {product.tags.join(', ')}
        </p>
      </div>
    );
  }

  return <>{content}</>;
}

export const Route = createFileRoute('/products/$productId')({
  loader: ({ context: { queryClient }, params: { productId } }) => {
    return queryClient.ensureQueryData(singleProductQueryOptions(productId));
  },
  // TODO: errorComponent: PostErrorComponent,
  component: SingleProductCard,
});
