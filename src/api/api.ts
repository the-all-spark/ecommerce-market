import type { GeneralApiResponse, AllCategoriesResponse, SingleProductResponse } from '../types/responseTypes';

export const getAllProducts = async (currentPage: number, itemsPerPage: number): Promise<GeneralApiResponse> => {
  let skip = currentPage * itemsPerPage;
  const res = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`);
  return await res.json();
};

export const getSingleProduct = async (productId: string): Promise<SingleProductResponse> => {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  return await res.json();
};

export const getAllCategories = async (): Promise<AllCategoriesResponse[]> => {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  return await res.json();
};

export const getProductsByCategory = async (category: string): Promise<GeneralApiResponse> => {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  return await res.json();
};

export const searchProducts = async (
  searchString: string,
  currentPage: number,
  itemsPerPage: number
): Promise<GeneralApiResponse> => {
  let skip = currentPage * itemsPerPage;
  const res = await fetch(`https://dummyjson.com/products/search?q=${searchString}&limit=${itemsPerPage}&skip=${skip}`);
  return await res.json();
};
