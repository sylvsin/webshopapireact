import { useContext, useCallback } from "react";
import { Category } from "../data/category";
import {
  StaticDataContext,
  StaticDataMethodContext,
} from "../StaticData/StaticData";
import { useService } from "../AppContext";
import { Product } from "../data/product";

type CategoryType = [
  Category | undefined,
  (category: Category | undefined) => void
];
export const useCurrentCategory = (): CategoryType => {
  const { currentCategory, productCategories } = useContext(StaticDataContext);
  const { service } = useService();
  const { updateCategory, updateProducts } = useContext(
    StaticDataMethodContext
  );
  const setCurrentCategory = useCallback(
    (category: Category | undefined) => {
      if (category) {
        service &&
          service.getProducts().then((products:Product[]) => {
            const prodCategories = productCategories.filter(prodCat => {
               return prodCat.CategoryId === category.Id
            });
            const newProducts = products.filter(
              (product) => !! prodCategories.find((prodCat) => product.Id === prodCat.ProductId)
            );
            updateProducts(newProducts);
          });
      } else {
        service &&
          service.getProducts().then((products) => updateProducts(products));
      }
      updateCategory(category);
    },
    [service, updateCategory, updateProducts, productCategories]
  );

  return [currentCategory, setCurrentCategory];
};
