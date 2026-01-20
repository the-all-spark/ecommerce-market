import type { GeneralApiResponse, AllCategoriesResponse, SingleProductResponse } from '../types/responseTypes';

export const getAllProducts = async (): Promise<GeneralApiResponse> => {
  // const res = await fetch(`https://dummyjson.com/products?limit=0`); //! limit=0 - to get all products
  const res = await fetch(`https://dummyjson.com/products?limit=30`);
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
