import React from "react";
import "./App.css";
import { AppContext } from "./AppContext";
import { Customer } from "./Customer";
import { Product } from "./Product";
import { Search } from "./Search";
import { getService } from "./service";
import { StaticDataProvider } from "./StaticData/StaticData";

// TODO this should be some other url
const baseURL: string =
  // "http://medieinstitutet-wie-products.azurewebsites.net/api/";
  "http://localhost:4000/api/";

const App: React.FC = () => {
  const service = getService(baseURL);

  return (
    <div className="app-container">
      <AppContext.Provider value={{ service }}>
        <StaticDataProvider>
          <Customer />
          <Search />
          <Product />
        </StaticDataProvider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
