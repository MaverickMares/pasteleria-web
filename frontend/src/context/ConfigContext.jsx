import { createContext, useContext } from "react";
import { useApi } from "../hooks/useApi";

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
  const { data, cargando } = useApi("/configuracion/");

  // data es array, tomamos el primer elemento (singleton)
  const config = Array.isArray(data) && data.length > 0 ? data[0] : null;

  return (
    <ConfigContext.Provider value={{ config, cargando }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
