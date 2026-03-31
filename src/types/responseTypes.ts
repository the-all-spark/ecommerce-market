export interface GeneralResponse {
  limit: number;
  skip: number;
  total: number;
}

export interface GeneralProductsResponse extends GeneralResponse {
  products: AllProductsResponse[];
}

export interface GeneralUsersResponse extends GeneralResponse {
  users: AllUsersResponse[];
}

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

export interface SingleProductResponse extends AllProductsResponse {
  description: string;
  dimensions: DimensionsType;
  images: string[];
  shippingInformation: string;
  warrantyInformation: string;
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
