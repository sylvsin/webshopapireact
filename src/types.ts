export interface Product {
  id: number;
  added: string;
  description: string;
  price: number;
  year: number;
  imageUrl: string;
  isAddedToCart?: boolean;
}
