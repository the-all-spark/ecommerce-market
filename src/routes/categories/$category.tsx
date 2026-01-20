import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import CategoriesListLayout from './-CategoriesListLayout';
import ProductsByCategory from '../../components/ProductsByCategory';

function CategoryProductsPage() {
  const { category } = Route.useParams();
  // console.log(category); //!

  return (
    <CategoriesListLayout>
      <Suspense fallback={<div className="p-2 text-center">Loading...</div>}>
        <ProductsByCategory category={category} />
      </Suspense>
    </CategoriesListLayout>
  );
}

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsPage,
});
