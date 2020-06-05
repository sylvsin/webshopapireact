import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faShoppingCart,
  faHeart,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
import { useFavLength, useCartItems, useUpdateView } from "./useSearch";
import { StaticDataContext } from "../StaticData/StaticData";

library.add(faSearch, faShoppingCart, faHeart, faMoneyCheckAlt);

export const Search: React.FC = () => {
  const [searchString, setSearchString] = useState('')
  const favLength = useFavLength();
  const { currentView } = useContext(StaticDataContext);
  const [totalItem, totalPrice] = useCartItems();
  const updateView = useUpdateView();
  const onSearch = () => {
    console.log(searchString)
  }

  return (
    <div className="search-wrapper">
      <div className="search">
        <span>MY STORE</span>
        <div className="search-icon-wrapper">
          <span className="icon-search-wrapper" onClick={onSearch}>
            <FontAwesomeIcon icon="search" />
          </span>
          <input className="search-input" value={searchString} onChange={(e)=>{setSearchString(e.target.value)}} />
        </div>
      </div>
      <div className="numeric-wrapper">
        <div className="numeric-icon-wrapper" onClick={() => updateView("FAV")}>
          <span className="amount">{favLength}</span>
          <span className={`${currentView === "FAV" && "is-selected"}`}>
            <FontAwesomeIcon icon="heart" />
          </span>
          <span>FAVORITES</span>
        </div>
        <div
          className="numeric-icon-wrapper"
          onClick={() => updateView("CART")}
        >
          <span className="user-total">{totalItem}</span>
          <span className={`${currentView === "CART" && "is-selected"}`}>
            <FontAwesomeIcon icon="shopping-cart" />
          </span>
          <span>{totalPrice}</span>
        </div>
        <div className="numeric-icon-wrapper">
          <span className="user-order">5</span>
          <span>
            <FontAwesomeIcon icon="money-check-alt" />
          </span>
          <span>ORDERS</span>
        </div>
      </div>
    </div>
  );
};
