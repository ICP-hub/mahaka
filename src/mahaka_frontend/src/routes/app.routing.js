import { createBrowserRouter } from "react-router-dom";
import { customerRouting } from "./CustomerRoute";

const appRoutes = createBrowserRouter(customerRouting);

export default appRoutes;
