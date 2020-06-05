
export interface Product {
  Id: number;
  BrandId: number;
  Product: string;
  Price: number;
  PercentOff: number;
  Description: string;
  IsFeatured: boolean;
  Stars: number;
  TaxId: number;
}

export interface ProductCategory {
  ProductId: number;
  CategoryId: number;
  Category: string;
  Icon: string;
}

export interface ProductImage {
  Id: number;
  ProductId: number;
  Url: string;
}

export type Favorite = number

export type Favorites = Favorite[] 
  

export interface ShoppingCartItem {
  ProductId: number;
  Count: number;
}

export type ShoppingCart = ShoppingCartItem[]





