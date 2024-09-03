import { Navigate } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/Dashboard";

/* Admin routes */
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // Redirect to dashboard component
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
    ],
  },
];
