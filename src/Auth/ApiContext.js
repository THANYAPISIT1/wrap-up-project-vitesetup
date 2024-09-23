// src/ApiContext.js
import { createContext } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <ApiContext.Provider value={{ apiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};
