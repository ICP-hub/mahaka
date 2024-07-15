import React from "react";
import useTheme from "./common/hooks/ThemeSwitcher";

function App() {
  const { theme, toggleTheme } = useTheme();

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
