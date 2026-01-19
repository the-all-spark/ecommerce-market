import { queryOptions } from '@tanstack/react-query';

import { getAllProducts, getSingleProduct, getProductsByCategory } from './api';

export const allProductsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: () => getAllProducts(),
});

export const singleProductQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['products', { productId }],
    queryFn: () => getSingleProduct(productId),
  });

export const categoryQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ['products', { category }],
    queryFn: () => getProductsByCategory(category),
  });
