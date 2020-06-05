import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useService } from "../AppContext";
import { Product } from "../data/product";
import {
  StaticDataContext,
  StaticDataMethodContext,
} from "../StaticData/StaticData";

export interface ShoppingItem extends Product {
  Count: number;
  categoryLabel: string;
}

export const useGetCartItems = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, productCategories } = useContext(StaticDataContext);
  const { service } = useService();

  useEffect(() => {
    if (service) {
      const { getProducts } = service;
      getProducts().then((products) => {
        setProducts(products);
      });
    }
  }, [service]);

  const shoppingItems: ShoppingItem[] = useMemo(() => {
    return products
      .filter((prod) => !!cartItems.find((item) => prod.Id === item.ProductId))
      .map((prod) => {
        const cartItem = cartItems.find((item) => prod.Id === item.ProductId);
        const category = productCategories.find(
          (productCategory) => productCategory.ProductId === prod.Id
        );
        if (cartItem) {
          return {
            ...prod,
            Count: cartItem.Count,
            categoryLabel: `${category && category.Category}`,
          };
        }
        return {
          ...prod,
          Count: 1,
          categoryLabel: `${category && category.Category}`,
        };
      });
  }, [products, cartItems, productCategories]);

  return shoppingItems;
};

export const useUpdateQuantity = () => {
  const { service } = useService();
  const { cartItems, currentUser } = useContext(StaticDataContext);
  const { updateCartItems } = useContext(StaticDataMethodContext);

  const updateQuantity = useCallback(
    (item: ShoppingItem, quantity: number) => {
      const cartItemPos = cartItems.findIndex(
        (cartItem) => cartItem.ProductId === item.Id
      );
      if (cartItemPos !== -1 && service && currentUser) {
        const {putCartItems} = service
        const cartItem = { ...cartItems[cartItemPos], Count: quantity };
        updateCartItems([
          ...cartItems.slice(0, cartItemPos),
          cartItem,
          ...cartItems.slice(cartItemPos + 1, cartItems.length),
        ]);
        putCartItems(cartItem.ProductId, currentUser.Id, cartItem.Count).then(data => {
          if (data) {
            updateCartItems([
              ...cartItems.slice(0, cartItemPos),
              cartItem,
              ...cartItems.slice(cartItemPos + 1, cartItems.length),
            ]);
          }
        })
        
      }
    },
    [updateCartItems, cartItems, service, currentUser]
  );

  return updateQuantity;
};

export const useRemoveCartItem = () => {
  const { service } = useService();
  const { cartItems, currentUser } = useContext(StaticDataContext);
  const { updateCartItems } = useContext(StaticDataMethodContext);

  const removeCartItem = useCallback(
    (item: ShoppingItem) => {
      const cartItemPos = cartItems.findIndex(
        (cartItem) => cartItem.ProductId === item.Id
      );
      if (cartItemPos !== -1) {
        if (service && currentUser) {
          const {deleteCartItems} = service
          deleteCartItems(item.Id, currentUser.Id).then(data => {
            if (data) {
              updateCartItems([
                ...cartItems.slice(0, cartItemPos),
                ...cartItems.slice(cartItemPos + 1, cartItems.length),
              ]);
            }
          })
        } 
  
      }
    },
    [cartItems, updateCartItems, service, currentUser]
  );
  return removeCartItem;
};
