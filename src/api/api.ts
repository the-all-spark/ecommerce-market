import type {
  GeneralProductsResponse,
  SingleProductResponse,
  AllCategoriesResponse,
  UserResponse,
  GeneralUsersResponse,
  UserAddResponse,
  UserAddRequest,
} from '../types/responseTypes';

export const getAllProducts = async (currentPage: number, itemsPerPage: number): Promise<GeneralProductsResponse> => {
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

export const getProductsByCategory = async (category: string): Promise<GeneralProductsResponse> => {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  return await res.json();
};

export const searchProducts = async (
  searchString: string,
  currentPage: number,
  itemsPerPage: number
): Promise<GeneralProductsResponse> => {
  let skip = currentPage * itemsPerPage;
  const res = await fetch(`https://dummyjson.com/products/search?q=${searchString}&limit=${itemsPerPage}&skip=${skip}`);
  return await res.json();
};

export const loginUser = async (username: string, password: string): Promise<UserResponse> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  return await res.json();
};

export const getAllUsers = async (): Promise<GeneralUsersResponse> => {
  const res = await fetch('https://dummyjson.com/users?limit=5&skip=1');
  return await res.json();
};

export const addUser = async (newUserData: UserAddRequest): Promise<UserAddResponse> => {
  const res = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: `${newUserData.username}`,
      email: `${newUserData.email}`,
      phone: `${newUserData.phone}`,
      firstName: `${newUserData.firstName}`,
      lastName: `${newUserData.lastName}`,
      gender: `${newUserData.gender}`,
    }),
  });
  return await res.json();
};
