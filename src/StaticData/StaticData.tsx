import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { Category } from "../data/category";
import { Product, ShoppingCartItem, ProductCategory, ProductImage } from "../data/product";
import { User } from "../data/user";

export type View = "FAV" | "CART" | undefined;

export interface StaticData {
  users: User[];
  categories: Category[];
  products: Product[];
  productCategories: ProductCategory[];
  currentUser: User | undefined;
  currentCategory: Category | undefined;
  favourites: number[];
  cartItems: ShoppingCartItem[];
  currentView: View;
  productImages: ProductImage[];
}

interface StaticDataMethod {
  updateUser: (user: User | undefined) => void;
  updateCategory: (category: Category | undefined) => void;
  updateProducts: (product: Product[]) => void;
  updateFavourites: (favs: number[]) => void;
  updateCartItems: (cartItems: ShoppingCartItem[]) => void;
  updateView: (view: View) => void;
}

export const StaticDataMethodContext = React.createContext<StaticDataMethod>({
  updateUser: () => {},
  updateCategory: () => {},
  updateProducts: () => {},
  updateFavourites: () => {},
  updateCartItems: () => {},
  updateView: () => {},
});

export const StaticDataContext = React.createContext<StaticData>({
  users: [],
  categories: [],
  products: [],
  currentUser: undefined,
  currentCategory: undefined,
  favourites: [],
  cartItems: [],
  currentView: undefined,
  productCategories: [],
  productImages: []
});

export const StaticDataProvider: React.FC = ({ children }) => {
  const { service } = useContext(AppContext);
  const [productCategories, setProductsCategries] = useState<ProductCategory[]>([])
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
    undefined
  );
  const [favourites, setFavourites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);
  const [currentView, setCurrentView] = useState<View>(undefined);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    if (service) {
      const { getUsers, getCategories, getProducts, getProductsCategories, getProductImages } = service;
      getProductImages().then(data => {
        setProductImages(data)
      })
      getUsers().then((users) => {
        setUsers(users);
      });

      getCategories().then((categories) => {
        setCategories(categories);
      });

      getProducts().then((products) => {
        setProducts(products);
      });

      getProductsCategories().then((productCategories: ProductCategory[]) => {
        setProductsCategries(productCategories)
      });
    }
    
  }, [service]);

  useEffect(() => {
    if (currentUser && service) {
      const { getFavorite } = service;
      setFavourites([])
      products.forEach(product => {
        getFavorite(product.Id, currentUser.Id).then((fav:Product | undefined) => {
          if(fav) {
            setFavourites((oldFav) => [...oldFav, fav.Id])
          }
          
        });
      })
      
    }
  }, [currentUser, service, products]);

  useEffect(() => {
    if (currentUser && service) {
      const { getCartItems } = service;
      products.forEach(product => {
        getCartItems(product.Id, currentUser.Id).then((cartItem:ShoppingCartItem | undefined) => {
          if(cartItem) {
            setCartItems((oldCartItems) => [...oldCartItems, {...cartItem}])
          }
          
        });
      })
      
    }
  }, [currentUser, service, products]);

  return (
    <StaticDataContext.Provider
      value={{
        users,
        categories,
        products,
        currentUser,
        currentCategory,
        favourites,
        cartItems,
        currentView,
        productCategories,
        productImages
      }}
    >
      <StaticDataMethodContext.Provider
        value={{
          updateUser: setCurrentUser,
          updateCategory: setCurrentCategory,
          updateProducts: setProducts,
          updateFavourites: setFavourites,
          updateCartItems: setCartItems,
          updateView: setCurrentView,
        }}
      >
        {children}
      </StaticDataMethodContext.Provider>
    </StaticDataContext.Provider>
  );
};

export const useGetCustomers = () => {
  const { users } = useContext(StaticDataContext);
  return users;
};

export const useSetUser = () => {
  const { updateUser } = useContext(StaticDataMethodContext);

  return updateUser;
};

type UserType = [User | undefined, (user: User | undefined) => void];
export const useCurrentUser = (): UserType => {
  const { currentUser } = useContext(StaticDataContext);
  const { updateUser } = useContext(StaticDataMethodContext);
  return [currentUser, updateUser];
};

export const useGetCategory = () => {
  const { categories } = useContext(StaticDataContext);
  return categories;
};

export const useGetProducts = () => {
  const { products } = useContext(StaticDataContext);
  return products;
};
