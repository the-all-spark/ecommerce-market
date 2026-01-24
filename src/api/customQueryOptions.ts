import { queryOptions, mutationOptions } from '@tanstack/react-query';

import {
  getAllProducts,
  getSingleProduct,
  getAllCategories,
  getProductsByCategory,
  searchProducts,
  loginUser,
  getAllUsers,
} from './api';

import type { UserResponse } from '../types/responseTypes';
import type { QueryClient } from '@tanstack/react-query';

interface UserRequest {
  username: string;
  password: string;
}

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

export const searchProductsQueryOptions = (searchString: string, currentPage: number, itemsPerPage: number) =>
  queryOptions({
    queryKey: ['products', 'search', { searchString, currentPage, itemsPerPage }],
    queryFn: () => searchProducts(searchString, currentPage, itemsPerPage),
  });

export const loginUserMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: ['auth', 'login'],
    mutationFn: ({ username, password }: UserRequest) => loginUser(username, password),
    onSuccess: (data: UserResponse) => {
      if (data.accessToken) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('isAuthenticated', 'true');
        queryClient.setQueryData(['auth', 'isAuthenticated'], true);
      } else {
        console.error('Check your credentials!'); //!
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

export const allUsersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: () => getAllUsers(),
});
