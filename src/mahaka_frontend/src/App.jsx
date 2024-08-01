import React from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";

function App() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="light">
      {/* <div className="p-4">
      <div className="bg-foreground p-4 rounded-2xl">I am {theme} theme.</div>
      <button
        onClick={toggleTheme}
        className="bg-primary px-4 py-2 rounded-2xl"
      >
        Toggle Theme
      </button>
    </div>     */}
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
