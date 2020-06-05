import { useContext, useCallback } from "react";
import {
  StaticDataContext,
  StaticDataMethodContext,
} from "../StaticData/StaticData";
import { Product } from "../data/product";
import { useService } from "../AppContext";

export const useHandleProdWithFav = () => {
  const { service } = useService();
  const { favourites, currentUser } = useContext(StaticDataContext);
  const { updateFavourites } = useContext(StaticDataMethodContext);
  const addProdToFav = useCallback(
    (product: Product) => {
      if (service && currentUser) {
        const {postFavorite, deleteFavorite} = service
          const prodInFavIndex = favourites.findIndex((fav) => product.Id === fav);
        if (prodInFavIndex === -1) {
          postFavorite(product.Id, currentUser.Id).then(data => {
            if (data) {
              updateFavourites([...favourites, product.Id]);
            }
          });
        } else {
          deleteFavorite(product.Id, currentUser.Id).then(data => {
            if (data) {
              const newCartItems = [
                ...favourites.slice(0, prodInFavIndex),
                ...favourites.slice(prodInFavIndex + 1, favourites.length),
              ];
              updateFavourites(newCartItems);
            }
          })
          
        }
      }
      
    },
    [favourites, updateFavourites, service, currentUser]
  );
  return addProdToFav;
};

export const useHandleProdWithCart = () => {
  const { service } = useService();
  const { cartItems, currentUser } = useContext(StaticDataContext);
  const { updateCartItems } = useContext(StaticDataMethodContext);

  const addProdToCart = useCallback(
    (product: Product) => {
      const prodInCartIndex = cartItems.findIndex(
        (item) => item.ProductId === product.Id
      );
      if (service && currentUser) {
        const {postCartItems, deleteCartItems} = service
        if (prodInCartIndex === -1) {
          postCartItems(product.Id, currentUser.Id, 1).then(data => {
            if (data) {
              updateCartItems([...cartItems, { ProductId: product.Id, Count: 1 }]);
            }
          })
        
        } else {
          deleteCartItems(product.Id, currentUser.Id).then(data => {
            if (data) {
              const newCartItems = [
                ...cartItems.slice(0, prodInCartIndex),
                ...cartItems.slice(prodInCartIndex + 1, cartItems.length),
              ];
              updateCartItems(newCartItems);
            }
          })
         
        }
      }
      
    },
    [cartItems, updateCartItems, service, currentUser]
  );
  return addProdToCart;
};
export const useGetImageUrl = (ProductId:number) => {
  const { productImages } = useContext(StaticDataContext);
  return productImages.find(productImage => productImage.ProductId === ProductId)
}