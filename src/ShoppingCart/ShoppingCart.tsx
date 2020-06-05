import React, { useState } from "react";
import "./ShoppingCart.css";
import { useCartItems } from "../Search/useSearch";
import {
  useGetCartItems,
  ShoppingItem,
  useUpdateQuantity,
  useRemoveCartItem,
} from "./useShoppingCart";

export const ShoppingCart: React.FC = () => {
  const [, totalPrice] = useCartItems();
  const shoppingCartItems = useGetCartItems();
  return (
    <div className="shopping-cart-item-wrapper">
      <span>
        Total: <span>{totalPrice}</span>
      </span>
      <div>
        {shoppingCartItems.map((shoppingItem) => (
          <ShoppingCartItem key={shoppingItem.Id} item={shoppingItem} />
        ))}
      </div>
    </div>
  );
};

interface ShoppingCartItemProps {
  item: ShoppingItem;
}
const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.Count);
  const updateQuantity = useUpdateQuantity();
  const removeCartItem = useRemoveCartItem();
  const total = (item.Price) * item.Count;
  return (
    <div className="shopping-cart-item">
      <div className="cart-item-img">
        <span className="discount">{item.PercentOff}</span>
        <div>Image</div>
      </div>
      <div className="cart-item-body">
        <div>{item.Product}</div>
        <div>{item.categoryLabel}</div>
        <div>{`${item.Price} x ${item.Count}=${total}`}</div>
      </div>
      <div className="cart-item-action">
        <div>
          Quantity:{" "}
          <input
            type="number"
            value={quantity}
            onChange={({ target: { value } }) => {
              setQuantity(Number(value));
            }}
          />
        </div>
        <button onClick={() => updateQuantity(item, quantity)}>Update</button>
        <button onClick={() => removeCartItem(item)}>Remove</button>
      </div>
    </div>
  );
};
