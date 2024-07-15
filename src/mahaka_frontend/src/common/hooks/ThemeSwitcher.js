import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get saved theme : localStorage or default === 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
