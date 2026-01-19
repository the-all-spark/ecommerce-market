import type { AllProducts, SingleProduct } from '../types/responseTypes';

interface ApiResponse {
  limit: number;
  skip: number;
  total: number;
  products: AllProducts[];
}

export const getAllProducts = async (): Promise<ApiResponse> => {
  // const res = await fetch(`https://dummyjson.com/products?limit=0`); //! limit=0 - to get all products
  const res = await fetch(`https://dummyjson.com/products?limit=30`);
  return await res.json();
};

export const getSingleProduct = async (productId: string): Promise<SingleProduct> => {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  return await res.json();
};

export const getProductsByCategory = async (category: string): Promise<ApiResponse> => {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  return await res.json();
};
