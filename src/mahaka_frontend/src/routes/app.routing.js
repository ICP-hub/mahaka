import { createBrowserRouter } from "react-router-dom";
import { customerRoutes } from "./CustomerRoute";
import { adminRoutes } from "./AdminRoute";
import { managementRoutes } from "./ManagementRoute";

// Merge all routes
const combinedRoutes = [...adminRoutes, ...customerRoutes, ...managementRoutes];

const appRoutes = createBrowserRouter(combinedRoutes);

export default appRoutes;
