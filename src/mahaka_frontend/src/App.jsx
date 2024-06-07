import { useState, useEffect } from "react";
import { mahaka_backend } from "declarations/mahaka_backend";

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    // Get the saved theme from localStorage || "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme); // Save new theme to localStorage
  };

  return (
    <div className="p-4">
      <div className="bg-foreground p-4 rounded-2xl">I am {theme} theme.</div>
      <button
        onClick={toggleTheme}
        className="bg-primary px-4 py-2 rounded-2xl"
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
