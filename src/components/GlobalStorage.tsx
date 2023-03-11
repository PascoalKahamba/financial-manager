import CssBaseline from "@mui/material/CssBaseline";
import { createContext } from "react";

interface ContextProps {
  name: string;
  age: number;
}

interface GlobalStorageProps {
  children: React.ReactNode;
}
export const GlobalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  return (
    <GlobalContext.Provider value={{ name: "Pascoal", age: 20 }}>
      <CssBaseline />
      {children}
    </GlobalContext.Provider>
  );
};
