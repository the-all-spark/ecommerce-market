import { queryOptions } from '@tanstack/react-query';

import { getAllProducts, getSingleProduct, getAllCategories, getProductsByCategory } from './api';

export const allProductsQueryOptions = (currentPage: number, itemsPerPage: number) =>
  queryOptions({
    queryKey: ['products', { currentPage, itemsPerPage }],
    queryFn: () => getAllProducts(currentPage, itemsPerPage),
  });

export const singleProductQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['products', { productId }],
    queryFn: () => getSingleProduct(productId),
  });

export const allCategoriesQueryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: () => getAllCategories(),
});

export const categoryQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ['products', { category }],
    queryFn: () => getProductsByCategory(category),
  });
