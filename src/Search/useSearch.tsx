import { useContext, useState, useEffect, useCallback } from "react";
import {
  StaticDataContext,
  View,
  StaticDataMethodContext,
} from "../StaticData/StaticData";
import { useService } from "../AppContext";
import { Product } from "../data/product";

export const useFavLength = () => {
  const { favourites } = useContext(StaticDataContext);
  return favourites.length;
};

type CartItemType = [number, number];
export const useCartItems = (): CartItemType => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems } = useContext(StaticDataContext);
  const { service } = useService();

  useEffect(() => {
    if (service) {
      const { getProducts } = service;
      getProducts().then((products) => {
        setProducts(products);
      });
    }
  }, [service]);
  const totalPrice = products
    .filter((prod) => {
      const cartItem = cartItems.find(({ ProductId }) => ProductId === prod.Id);
      return !!cartItem;
    })
    .map((prod) => {
      const cartItem = cartItems.find(({ ProductId }) => ProductId === prod.Id);
      if (cartItem) {
        return (prod.Price) * cartItem.Count;
      }
      return 0;
    })
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  return [cartItems.length, totalPrice];
};

export const useUpdateView = () => {
  const { currentView } = useContext(StaticDataContext);
  const { updateView } = useContext(StaticDataMethodContext);

  const setView = useCallback(
    (view: View) => {
      if (view && view !== currentView) {
        updateView(view);
      } else {
        updateView(undefined);
      }
    },
    [currentView, updateView]
  );

  return setView;
};

// TODO define useSearch hooks
