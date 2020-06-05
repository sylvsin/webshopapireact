import React, { useContext, useMemo } from "react";
import { Category } from "../Category";
import { Product } from "./Product";
import "./styles.css";
import { useGetProducts, StaticDataContext } from "../StaticData/StaticData";
import { ShoppingCart } from "../ShoppingCart";

export const ProductContainer: React.FC = () => {
  const products = useGetProducts();
  const { currentView, favourites } = useContext(StaticDataContext);

  const renderProduct = useMemo(() => {
    if (currentView === "FAV" || currentView === undefined) {
      const newProducts =
        currentView === "FAV"
          ? products.filter(
              (prod) => !!favourites.find((fav) => fav === prod.Id)
            )
          : products;
      return (
        <div className="products-wrapper">
          {newProducts.map((product) => {
            return <Product key={product.Id} product={product} />;
          })}
        </div>
      );
    }
    return <ShoppingCart />;
  }, [currentView, products, favourites]);
  return (
    <div className="product-container">
      <Category />
      {renderProduct}
    </div>
  );
};
