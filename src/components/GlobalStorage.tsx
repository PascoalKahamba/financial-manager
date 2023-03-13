import { AlertColor, createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useState } from "react";
import usePersistedStorage from "../hooks/usePersistedStorage";

interface ContextProps {
  name: string;
  age: number;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeNameProps>>;
}

type ThemeNameProps = "light" | "dark";
interface FeedBackProps {
  kind: AlertColor;
  message: string;
}
interface GlobalStorageProps {
  children: React.ReactNode;
}
export const GlobalContext = createContext<ContextProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [feedBack, setFeedBack] = useState<FeedBackProps>({
    kind: "error",
    message: "",
  });
  const [themeName, setThemeName] = usePersistedStorage<ThemeNameProps>(
    "theme",
    "light"
  );

  const theme = createTheme({
    palette: {
      mode: themeName,
    },
  });
  return (
    <GlobalContext.Provider value={{ name: "Pascoal", age: 20, setThemeName }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};
