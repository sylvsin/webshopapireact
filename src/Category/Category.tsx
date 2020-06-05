import React from "react";
import { useGetCategory } from "../StaticData/StaticData";
import { useCurrentCategory } from "./useCategory";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLaptop,
  faMobileAlt,
  faHeadphones,
  faVideo,
  faCamera,
  faCameraRetro,
  faClock,
  faImages,
  faCrosshairs,
  faVolumeDown,
  faServer
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Category.css";

library.add(faLaptop, faMobileAlt, faHeadphones, faVideo, faCamera,
   faCameraRetro, faClock, faImages, faCrosshairs, faVolumeDown, faServer);

export const Category: React.FC = () => {
  const categories = useGetCategory();
  const [currentCategory, setCurrentCategory] = useCurrentCategory();

  return (
    <div className="category-wrapper">
      <div
        className={`category-item ${
          currentCategory === undefined && "selected"
        }`}
        onClick={() => setCurrentCategory(undefined)}
      >
        <span className="icon-wrapper"></span>
        <span>All</span>
      </div>
      {categories.map(({ Id, Category, Icon }) => (
        <div
          key={Id}
          className={`category-item ${
            currentCategory && currentCategory.Id === Id && "selected"
          }`}
          onClick={() => {
            setCurrentCategory({ Id, Category, Icon });
          }}
        >
          <span className="icon-wrapper">
            <FontAwesomeIcon icon={Icon} />
          </span>
          <span>{Category}</span>
        </div>
      ))}
    </div>
  );
};
