export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  gender: 'male' | 'female' | 'unisex';
  sizes: number[];
  description: string;
  stock: number;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}

export interface ShippingDetails {
  address: string;
  fee: number;
  estimatedTime: string;
}