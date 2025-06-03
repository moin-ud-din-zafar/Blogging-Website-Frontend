// src/contexts/DarkModeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

export const DarkModeProvider = ({ children }) => {
  // Initialize from localStorage (persist across reloads)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Whenever darkMode changes:
  // 1. Persist to localStorage
  // 2. Add/remove <html class="dark"> (in case you want to use any dark: utilities)
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
