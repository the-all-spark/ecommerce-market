import { queryOptions } from '@tanstack/react-query';

import { getAllProducts, getProductsByCategory } from './api';

export const allProductsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: () => getAllProducts(),
});

export const categoryQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ['products', { category }],
    queryFn: () => getProductsByCategory(category),
  });
