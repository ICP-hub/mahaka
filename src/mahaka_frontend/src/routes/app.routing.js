import { createBrowserRouter } from "react-router-dom";
import { customerRoutes } from "./CustomerRoute";
import { adminRoutes } from "./AdminRoute";

// Merge all routes
const combinedRoutes = [...adminRoutes, ...customerRoutes];

const appRoutes = createBrowserRouter(combinedRoutes);

export default appRoutes;
