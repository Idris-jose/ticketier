import { createContext, useContext, useState } from "react";

const   DarkModeContext= createContext()



  export function DarkModeProvider({ children }) {
   
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };
  
    return (
      <DarkModeContext.Provider value={{ toggleDarkMode , darkMode }}>
        {children}
      </DarkModeContext.Provider>
    );
  }

  export function useDarkMode() {
    return useContext(DarkModeContext);
  }