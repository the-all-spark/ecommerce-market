interface DimensionsType {
  width: number;
  height: number;
  depth: number;
}

export interface AllProducts {
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

export interface SingleProduct {
  id: number;
  title: string;
  description: string;
  dimensions: DimensionsType;
  weight: number;
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

export interface ProductsByCategory {
  id: number;
  title: string;
  brand: string;
}
