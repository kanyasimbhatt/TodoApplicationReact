import { useState } from "react";
import { createContext, useContext } from "react";

export type DarkModeType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const DarkModeContext = createContext<DarkModeType>({
  darkMode: true,
  setDarkMode: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export const DarkModeProvider: React.FC<ChildrenType> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
