import React, {  useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme'));
    const { setTheme } = useTheme()
  const HandlethemeMode = () => {
    if (themeMode != "dark-mode") {
      setThemeMode("dark-mode");
      setTheme("dark-mode");
    } else {
      setThemeMode("light-mode");
      setTheme(!"light-mode");
    }
  };
  return (
    <a      
      id="theme-toggle"
      data-mode="light"
      onClick={HandlethemeMode}
    >
      {themeMode=='dark-mode' ? <i className="bi bi-sun" ></i> : <i className="bi bi-moon" ></i>}
    </a>
  );
}
