import React, { useContext } from "react";
import { Service } from "./service";

export interface AppConfig {
  service?: Service;
}

export const AppContext = React.createContext<AppConfig>({});

export const useService = () => {
  const service = useContext(AppContext);
  return service;
};
