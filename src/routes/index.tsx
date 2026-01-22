import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery, useQuery } from '@tanstack/react-query';

import { allProductsQueryOptions, singleProductQueryOptions } from '../api/customQueryOptions';
import ProductPreviewCard from '../components/ProductPreviewCard';

// Main page
const AboutUs = () => {
  const { data: allData, status } = useSuspenseQuery(allProductsQueryOptions(0, 0));

  const randomProductId = useMemo(() => {
    if (status === 'success' && allData?.total) {
      return Math.floor(Math.random() * allData.total) + 1;
    }
    return null;
  }, [status, allData?.total]);

  const { data: productOfDay, isSuccess } = useQuery({
    ...singleProductQueryOptions(String(randomProductId)),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <div className="flex min-h-[85vh] flex-col bg-grey-light">
      <h1 className="pt-6 text-center font-heading text-h1/8">Welcome to our All-Inclusive Market!</h1>
      <p className="m-auto w-8/10 pt-6 pb-6 text-center">
        Explore our <b>vast collection of products</b> and choose those that suit you needs. Our marketplace is
        dedicated to providing you with the best possible shopping experience.
      </p>

      <h2 className="text-center font-heading text-large">Observe random product - #{randomProductId}:</h2>

      {isSuccess && (
        <div className="m-auto flex w-9/10 items-center justify-center p-2 pt-6 pb-6">
          <ProductPreviewCard item={productOfDay} />
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: AboutUs,
});
