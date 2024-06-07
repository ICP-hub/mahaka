import { useState, useEffect } from "react";
import ConnectionSetup from "./connection/Connect";
import { useSelector } from "react-redux";

function App() {
  const [theme, setTheme] = useState("light");
  const authStates = useSelector((state) => state.auth);
  useEffect(() => {
    // Get the saved theme from localStorage || "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // theme toggle
  const toggleTheme = () => {
    const currTheme = theme === "light" ? "dark" : "light";
    setTheme(currTheme);
    document.body.className = currTheme;
    localStorage.setItem("theme", currTheme); // save current theme to localStorage
  };

  console.log("auth coming from redux : ", authStates);

  return (
    <div className="p-4">
      <div className="bg-foreground p-4 rounded-2xl">I am {theme} theme.</div>
      <button
        onClick={toggleTheme}
        className="bg-primary px-4 py-2 rounded-2xl"
      >
        Toggle Theme
      </button>
      <ConnectionSetup btnStyle={"bg-error rounded-2xl"} />

      <div>Principal ID : {authStates.userPlugPrincipal}</div>
    </div>
  );
}

export default App;
