import React, { useContext, useMemo } from "react";
import "./Product.css";
import { Product as ProductType } from "../data/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHandleProdWithFav, useHandleProdWithCart, useGetImageUrl } from "./useProduct";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faStar,
  faNotEqual,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { StaticDataContext } from "../StaticData/StaticData";
library.add(faHeart, faStar, faNotEqual, faCartPlus);

interface Props {
  product: ProductType;
}

export const Product: React.FC<Props> = ({ product }) => {
  const handleProdWithFav = useHandleProdWithFav();
  const handleProdWithCart = useHandleProdWithCart();
  const imageUrl = useGetImageUrl(product.Id)
  const { favourites, cartItems } = useContext(StaticDataContext);
  const isFav = useMemo(() => !!favourites.find((fav) => fav === product.Id), [
    favourites,
    product,
  ]);
  const isInCart = useMemo(
    () => !!cartItems.find((item) => item.ProductId === product.Id),
    [cartItems, product]
  );

  return (
    <div className="product-wrapper">
      <div className="product-img-wrapper"><img src={`${imageUrl && imageUrl.Url}`} alt=''/></div>
      <div className="product-data-wrapper">
        <div className={`product-fav ${isFav && "is-in-fav"}`}>
          <FontAwesomeIcon
            icon="heart"
            onClick={() => {
              handleProdWithFav(product);
            }}
          />
        </div>
        <div>{product.Product}</div>
        <div>{product.Price}</div>
        <div className="product-description">{product.Description}</div>
        <div className="cart-rating-wrapper">
          <div>
            <span
              className={`cart-icon ${isInCart && "is-in-cart"}`}
              onClick={() => handleProdWithCart(product)}
            >
              <FontAwesomeIcon icon="cart-plus" />
            </span>
            <span>
              <FontAwesomeIcon icon="not-equal" />
            </span>
          </div>
          <div>
            <span className="review">{product.Stars}</span>
            <FontAwesomeIcon icon="star" />
          </div>
        </div>
      </div>
    </div>
  );
};
