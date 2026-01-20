/* General types */

export interface GeneralApiResponse {
  limit: number;
  skip: number;
  total: number;
  products: AllProductsResponse[];
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
