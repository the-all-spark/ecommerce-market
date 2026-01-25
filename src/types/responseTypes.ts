/* General types */

export interface GeneralApiResponse {
  limit: number;
  skip: number;
  total: number;
  products: AllProductsResponse[];
}

export interface GeneralUsersResponse {
  limit: number;
  skip: number;
  total: number;
  users: AllUsersResponse[];
}

/* Response types */

export interface AllCategoriesResponse {
  name: string;
  slug: string;
  url: string;
}

interface DimensionsType {
  width: number;
  height: number;
  depth: number;
}

export interface AllProductsResponse {
  id: number;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
  availabilityStatus: string;
  stock: number;
  category: string;
  tags: string[];
}

export interface SingleProductResponse {
  id: number;
  title: string;
  description: string;
  dimensions: DimensionsType;
  thumbnail: string;
  images: string[];
  price: number;
  brand: string;
  availabilityStatus: string;
  stock: number;
  shippingInformation: string;
  warrantyInformation: string;
  category: string;
  tags: string[];
}

export interface UserRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AllUsersResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}

export interface UserAddRequest {
  username: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  gender?: string;
}

export interface UserAddResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}
